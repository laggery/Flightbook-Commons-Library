import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from './flight.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
  ],
  providers: [
    FlightService
  ]
})
export class FlightModule {
  static forRoot(environment: any): ModuleWithProviders<FlightModule> {
    return {
      ngModule: FlightModule,
      providers: [
        {
          provide: 'env',
          useValue: environment
        }
      ]
    };
  }
}
