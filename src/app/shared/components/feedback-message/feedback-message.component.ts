import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from "@angular/core";
import {ResponseMessage} from "../../models/response-message.model";
import {MessageStatus} from "../../enums/message-status.enum";

@Component({
  selector: 'app-feedback-message',
  template: `
    <div class="alert alert-dismissible fade show mt-2" [ngClass]="messageClass" role="alert" #alertContainer>
      <strong *ngIf="message.title">{{message.title}}</strong> {{message.message}}
      <button (click)="closeAlert()" type="button" class="close no-outline" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `
})
export class FeedbackMessageComponent implements OnInit{
  public messageClass: string;
  @Input() public message: ResponseMessage;
  @Output() public messageDismiss: EventEmitter<void> = new EventEmitter();

  @ViewChild('alertContainer')
  public alertContainer: ElementRef;

  constructor(private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.messageClass = MessageStatus.mapMessageStatusToCssClass(this.message.status);
  }

  public closeAlert(): void {
    this.renderer2.removeClass(this.alertContainer.nativeElement, 'show');
    setTimeout(() => {
      this.messageDismiss.emit()
    }, 150)
  }
}

