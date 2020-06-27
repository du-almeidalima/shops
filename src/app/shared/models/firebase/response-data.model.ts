/**
 * @description Interface encapsulate the data response from FireBase API Authorization
 */
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToke: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
