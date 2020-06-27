import {ResponseMessage} from "../models/response-message.model";
import {MessageStatus} from "../enums/message-status.enum";

export class RecipeValidator {

  private static errorMessages = {
    required: new ResponseMessage('This field is required.', MessageStatus.ERROR),
    invalidNumber: new ResponseMessage('This field should have only numbers.', MessageStatus.ERROR)
  };

  public static getMessage(messageKey: string): ResponseMessage{
    if (messageKey in RecipeValidator.errorMessages) {
      return RecipeValidator.errorMessages[messageKey];
    }
  }
}
