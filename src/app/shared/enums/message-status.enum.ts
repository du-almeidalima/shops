export enum MessageStatus {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  INFO = "INFO"
}

export namespace MessageStatus {
  /**
   * Maps the {@link MessageStatus} to a corresponding CSS class of Bootstrap 4.X framework
   * @param {MessageStatus} messageStatus Enum representing the feedback status
   * @example
   * PRIMARY = 'alert-primary'
   */
  export function mapMessageStatusToCssClass(messageStatus: MessageStatus): string {
    switch (messageStatus) {
      case MessageStatus.ERROR:
        return 'alert-danger'
      case MessageStatus.WARNING:
        return 'alert-warning';
      case MessageStatus.SUCCESS:
        return 'alert-success';
      case MessageStatus.INFO:
        return 'alert-info';
    }
  }
}
