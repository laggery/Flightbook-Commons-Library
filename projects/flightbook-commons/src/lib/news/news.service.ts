import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { News } from './news';
import { Store } from '../store.class';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService extends Store<News[]> {

  constructor(private http: HttpClient, @Inject('env') private environment) {
    super([]);
  }

  getNews(language: string): Observable<any> {
    return this.http.get<News[]>(`${this.environment.baseUrl}/news/${language}`).pipe(
      map((response: News[]) => {
        const newState = [...this.getValue(), ...response];
        this.setState(newState);
        return response;
      })
    );
  }
}
