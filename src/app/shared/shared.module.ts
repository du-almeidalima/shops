import {NgModule} from "@angular/core";
import {FeedbackMessageComponent} from "./components/feedback-message/feedback-message.component";
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import {DropdownDirective} from "./directives/dropdown.directive";
import {PlaceholderDirective} from "./directives/placeholder.directive";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    FeedbackMessageComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    PlaceholderDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FeedbackMessageComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    PlaceholderDirective,
  ]
})
export class SharedModule {

}
