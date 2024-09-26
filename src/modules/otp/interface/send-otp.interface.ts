import { User } from "src/database/entities/user.entity";

export interface ISendOtp {
  send(code: string, to: User): Promise<string>;
}