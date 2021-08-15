import { NgModule } from '@angular/core';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { IndexComponent } from './pages/index/index.component';
import { CreateComponent } from './pages/create/create.component';
import { FulfillComponent } from './pages/fulfill/fulfill.component';
import { ListHeaderComponent } from './components/list-header/list-header.component';
import { ListContentComponent } from './components/list-content/list-content.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    IndexComponent,
    CreateComponent,
    FulfillComponent,
    ListHeaderComponent,
    ListContentComponent
  ],
  imports: [
    ListRoutingModule,
    SharedModule
  ]
})
export class ListModule { }
