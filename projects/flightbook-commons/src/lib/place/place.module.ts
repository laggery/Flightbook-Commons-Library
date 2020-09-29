import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceService } from './place.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PlaceService
  ]
})
export class PlaceModule {
  static forRoot(environment: any): ModuleWithProviders<PlaceModule> {
    return {
      ngModule: PlaceModule,
      providers: [
        {
          provide: 'env',
          useValue: environment
        }
      ]
    };
  }
}
