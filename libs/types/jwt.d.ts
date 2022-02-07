import * as jwt from 'jsonwebtoken';
export {};

declare module 'jsonwebtoken' {
  export interface GoogleUserDataPayload extends jwt.JwtPayload {
    sub: string;
    email: string;
  }
}
