import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { XlsxExportService } from './services/xlsx-export.service';
import { PdfExportService } from './services/pdf-export.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
  providers: [
    DatePipe,
    XlsxExportService,
    PdfExportService
  ]
})
export class ExportModule { }
