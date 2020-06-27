import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {ActionReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NgModule} from '@angular/core';
import {storeLogger} from 'ngrx-store-logger';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {AppRoutesModule} from './app-routes.module';
import {environment as env} from '../environments/environment';

import * as fromApp from './store/app.reducer';
import {AuthEffects} from './core/auth/store/auth.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RecipesEffects} from './modules/recipes/store/recipes.effects';

function logger(reducer: ActionReducer<fromApp.AppState>): any {
  return storeLogger({
    timestamp: false,
    duration: false
  })(reducer);
}

const metaReducers = env.production ? [] : [logger];

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
    StoreModule.forRoot(fromApp.reducers, { metaReducers }),
    EffectsModule.forRoot([ AuthEffects,  RecipesEffects ]),
    StoreDevtoolsModule.instrument(
      {logOnly: env.production}
    )
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
