import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutesModule } from './app-routes.module';

import * as fromApp from './store/app.reducer';
import { AuthEffects } from './modules/auth/store/auth.effects';
import { RecipesEffects } from './modules/recipes/store/recipes.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(fromApp.reducers),
    EffectsModule.forRoot([ AuthEffects, RecipesEffects ]),
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
