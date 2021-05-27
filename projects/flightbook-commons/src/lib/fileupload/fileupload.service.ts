import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient, @Inject('env') private environment) {
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.httpClient
      .post(`${this.environment.baseUrl}/upload/igcfile`, formData)
      .pipe(
        map((response: any) => {
        })
      );
  }
}
