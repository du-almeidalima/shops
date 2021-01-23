import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { AuthComponent } from './modules/auth/pages/auth.component';
import { HeaderComponent } from './components/header/header.component';

const CORE_ROUTES: Routes = [
  { path: 'login', component: AuthComponent }
];

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    AuthModule,
    RouterModule.forChild(CORE_ROUTES)
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
