import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient, @Inject('env') private environment) {
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.httpClient
      .post(`${this.environment.baseUrl}/upload/igcfile`, formData, {
        reportProgress: true,
        observe: 'events',
      })
  }

  getFile(filename: string): Observable<Blob> {
    return this.httpClient.get(`${this.environment.baseUrl}/${filename}`, {
      responseType: 'blob'
    });
  }
}
