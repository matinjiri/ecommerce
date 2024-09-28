import { User } from "src/database/entities/user.entity";

export interface ISendOtp {
  send(code: string, to: User, expiration: number): Promise<any>;
}