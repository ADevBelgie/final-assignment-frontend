export interface User {
  userName: string;
  passwordHash: string;
  token: string |undefined;
  expiration: string |undefined;
}
