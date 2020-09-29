import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './account.service';
import { AuthGuardService } from './auth-guard.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AccountService,
    AuthGuardService
  ]
})
export class AccountModule {
  static forRoot(environment: any): ModuleWithProviders<AccountModule> {
    return {
      ngModule: AccountModule,
      providers: [
        {
          provide: 'env',
          useValue: environment
        }
      ]
    };
  }
}
