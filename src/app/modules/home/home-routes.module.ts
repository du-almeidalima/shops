import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { NgModule } from '@angular/core';

export const HOME_ROUTES: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(HOME_ROUTES)],
  exports: [RouterModule]
})
export class HomeRoutesModule { }
