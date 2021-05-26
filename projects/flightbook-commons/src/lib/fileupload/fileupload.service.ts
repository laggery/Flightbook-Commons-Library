import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient, @Inject('env') private environment) {
  }

  uploadFile(formData: FormData, userId: string): Observable<any> {
    return this.httpClient
      .post(`${this.environment.baseUrl}/upload/igcfile/staging/${userId}`, formData);
  }
}
