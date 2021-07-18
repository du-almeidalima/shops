import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { CreateComponent } from './pages/create/create.component';
import { FulfillComponent } from './pages/fulfill/fulfill.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: ':id/create', component: CreateComponent },
  { path: ':id/fulfill', component: FulfillComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {
}
