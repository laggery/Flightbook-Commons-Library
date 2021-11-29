import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgcService } from './igc.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
  ],
  providers: [
    IgcService
  ]
})
export class IgcModule {
  static forRoot(environment: any): ModuleWithProviders<IgcModule> {
    return {
      ngModule: IgcModule,
      providers: [
        {
          provide: 'env',
          useValue: environment
        }
      ]
    };
  }
}
