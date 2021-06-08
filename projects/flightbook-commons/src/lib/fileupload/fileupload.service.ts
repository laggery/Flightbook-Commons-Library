import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private uploadProgress: number;
  private fileUploadError: boolean;

  constructor(private httpClient: HttpClient, @Inject('env') private environment) {
  }

  uploadFile(formData: FormData): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('env', this.environment.production ? 'prod' : 'dev');
    return this.httpClient
      .post(`${this.environment.baseUrl}/upload/igcfile`, formData, {
        params,
        reportProgress: true,
        observe: 'events',
      }).pipe(
        catchError(error => {
          this.fileUploadError = true;
          return of(error);
        }),
        finalize(() => {
          this.uploadProgress = null;
          this.fileUploadError = false;
        }),
        map(event => {
          if (event.type === HttpEventType.UploadProgress) {
            const { loaded, total } = event;
            this.uploadProgress = Math.round((loaded / total) * 100);
          }
        }));
  }

  getFile(filename: string): Observable<Blob> {
    const params: HttpParams = new HttpParams()
      .set('env', this.environment.production ? 'prod' : 'dev');
    return this.httpClient.get(`${this.environment.baseUrl}/${filename}`, {
      params,
      responseType: 'blob'
    });
  }
}
