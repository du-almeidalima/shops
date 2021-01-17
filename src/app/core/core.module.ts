import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from '../modules/home/pages/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { AuthInterceptor } from './services/auth.interceptor';

const CORE_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'login',
    loadChildren: () => import('../modules/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CORE_ROUTES),
    HttpClientModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
