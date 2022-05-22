export {};

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
  }

  interface Error {
    status: number;
  }
}
