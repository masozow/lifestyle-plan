// src/types/express/index.d.ts
import { UserTokenPayload } from "../utils/generateToken.js";

declare global {
  namespace Express {
    interface Request {
      user?: UserTokenPayload;
    }
  }
}
