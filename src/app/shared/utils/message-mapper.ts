import {ResponseMessage} from "../models/response-message.model";
import {MessageStatus} from "../enums/message-status.enum";
// @ts-ignore
import jsonMessages from '../status-messages.json';

/**
 * Class for mapping messages stored in a JSON into {@link ResponseMessage}.
 * The json messages follows this structure:
 * ```json
 *  "messageCode": "..."
 *  "message": "..."
 *  "severity": "..."
 * ```
 */
export abstract class MessageMapper{

  /**
   * @description Map the "messageCode" property of "./src/app/shared/status-messages.json"
   * into a object into a object of {@link ResponseMessage}
   *
   * @param {string} messageCode The message code a API provides.
   * @example EMAIL_NOT_FOUND
   * Returns "There is no user with this email and password, did you type the right email and password?"
   * @example INVALID_PASSWORD
   * Returns "There is no user with this email and password, did you type the right email and password?"
   */
  public static mapMessage(messageCode: string): ResponseMessage {
    const jsonMessage = jsonMessages.find(m => m.messageCode === messageCode);

    if (jsonMessage !== undefined) {
      return {
        message: jsonMessage.message,
        status: MessageStatus[jsonMessage.severity.toString()]
      }
    }
    return {
      message: 'Something wrong happened',
      status: MessageStatus.WARNING
    }
  }
}
