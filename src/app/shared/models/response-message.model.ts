import {MessageStatus} from "../enums/message-status.enum";

/**
 * The status feedback a component receive upon a notification.
 * It uses the {@link MessageStatus} to represent the possibles status.
 * @property {string} title The message title
 * @property {string} message The message body
 * @property {MessageStatus} status Enum to represent the possible status.
 */
export interface ResponseMessage {
  title?: string
  message: string;
  status: MessageStatus;
}
