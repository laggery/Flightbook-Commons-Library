import { NgModule, ModuleWithProviders } from '@angular/core';
import { FileUploadService } from './fileupload.service';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FileUploadService
  ]
})
export class FileUploadModule {
  static forRoot(environment: any): ModuleWithProviders<FileUploadModule> {
    return {
      ngModule: FileUploadModule,
      providers: [
        {
          provide: 'env',
          useValue: environment
        }
      ]
    };
  }
}
