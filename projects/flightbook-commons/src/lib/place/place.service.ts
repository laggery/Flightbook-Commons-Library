import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Place } from './place';
import { Store } from '../store.class';

@Injectable({
  providedIn: 'root'
})
export class PlaceService extends Store<Place[]> {

  constructor(private http: HttpClient, @Inject('env') private environment) {
    super([]);
  }

  getPlaces({ limit = null, offset = null, store = true, clearStore = false }: { limit?: number, offset?: number, store?: boolean, clearStore?: boolean } = {}): Observable<Place[]> {
    let params = new HttpParams();
    if (limit) {
      params = params.append('limit', limit.toString());
    }
    if (offset) {
      params = params.append('offset', offset.toString());
    }

    return this.http.get<Place[]>(`${this.environment.baseUrl}/places`, { params }).pipe(
      map((response: Place[]) => {
        let newState
        if (store) {
          if (clearStore) {
            newState = [...response];
          } else {
            newState = [...this.getValue(), ...response];
          }
          this.setState(newState);
        }
        return response;
      })
    );
  }

  getPlacesByName(name: string, { limit = null, offset = null }: { limit?: number, offset?: number } = {}): Observable<Place[]> {
    let params = new HttpParams();
    if (limit) {
      params = params.append('limit', limit.toString());
    }
    if (offset) {
      params = params.append('offset', offset.toString());
    }
    return this.http.get<Place[]>(`${this.environment.baseUrl}/places/${name}`, { params });
  }

  postPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(`${this.environment.baseUrl}/places`, place).pipe(
      map((response: Place) => {
        this.setState([]);
        return response;
      })
    );
  }

  putPlace(place: Place): Observable<Place> {
    return this.http.put<Place>(`${this.environment.baseUrl}/places/${place.id}`, place).pipe(
      map((response: Place) => {
        const list = this.getValue();
        const index = list.findIndex((listPlace: Place) => listPlace.id === response.id);
        list[index] = response;
        list.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);

        this.setState(list);

        return response;
      })
    );
  }

  deletePlace(place: Place): Observable<Place> {
    return this.http.delete<Place>(`${this.environment.baseUrl}/places/${place.id}`).pipe(
      map((response: any) => {
        const list = this.getValue();
        const index = list.findIndex((listPlaces: Place) => listPlaces.id === place.id);
        list.splice(index, 1);
        return response;
      })
    );
  }
}
