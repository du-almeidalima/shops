import {MessageStatus} from '../enums/message-status.enum';

/**
 * The status feedback a component receive upon a notification.
 * It uses the {@link MessageStatus} to represent the possibles status.
 */
export interface ResponseMessage {
  /**
   * Title The message title
   */
  title?: string;
  /**
   * message The message body
   */
  message: string;
  /**
   * status Enum to represent the possible status
   */
  status: MessageStatus;
}
