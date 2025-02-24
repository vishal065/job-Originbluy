import { type IUser } from "../model/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
export {};
