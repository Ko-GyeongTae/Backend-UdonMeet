export {};

export interface globalUser {
  id: string;
  email: string;
  name: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: globalUser;
    }
  }

  interface Error {
    status: number;
  }
}
