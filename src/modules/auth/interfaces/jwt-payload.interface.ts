import { UserRole } from "src/common/enums/user/user-role.enum";

export interface IJwtAccesePayload {
  id: number;
  roles: UserRole[];
}

export interface IJwtRefreshPayload {
  id: number;
  refreshToken: string;
}