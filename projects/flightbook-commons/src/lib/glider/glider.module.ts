import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GliderService } from './glider.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    GliderService
  ]
})
export class GliderModule {
  static forRoot(environment: any): ModuleWithProviders<GliderModule> {
    return {
      ngModule: GliderModule,
      providers: [
        {
          provide: 'env',
          useValue: environment
        }
      ]
    };
  }
}
