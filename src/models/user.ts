export interface User {
  userName: string;
  passwordHash: string;
  token: string |undefined;
  expiration: string |undefined;
  email:string |undefined;
  phoneNumber:string |undefined;
  shoppingBagId:number|undefined;
}
