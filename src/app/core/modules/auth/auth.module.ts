import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './pages/auth.component';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './store/auth.reducer';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';

const AUTH_ROUTES: Routes = [
  { path: '', component: AuthComponent }
];

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports:
    [
      SharedModule,
      FormsModule,
      RouterModule.forChild(AUTH_ROUTES),
      StoreModule.forFeature(fromAuth.featureKey, fromAuth.reducer),
      EffectsModule.forFeature([AuthEffects])
    ],
  providers:
    [
      AuthService
    ]
})
export class AuthModule {
}
