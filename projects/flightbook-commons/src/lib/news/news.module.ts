import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from './news.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    NewsService
  ]
})
export class NewsModule {
  static forRoot(environment: any): ModuleWithProviders<NewsModule> {
    return {
      ngModule: NewsModule,
      providers: [
        {
          provide: 'env',
          useValue: environment
        }
      ]
    };
  }
}
