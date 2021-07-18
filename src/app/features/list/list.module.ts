import { NgModule } from '@angular/core';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { IndexComponent } from './pages/index/index.component';
import { CreateComponent } from './pages/create/create.component';
import { FulfillComponent } from './pages/fulfill/fulfill.component';


@NgModule({
  declarations: [
    ListComponent,
    IndexComponent,
    CreateComponent,
    FulfillComponent
  ],
  imports: [
    ListRoutingModule
  ]
})
export class ListModule { }
