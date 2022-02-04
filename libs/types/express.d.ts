export {};

declare global {
  namespace Express {
    interface Request {
      type?: 'normal' | 'kakao';
      user?: string | number;
    }
  }
}
