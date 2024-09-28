export interface IJwtPayload {
  id: number;
}

export interface IJwtRefreshPayload {
  id: number;
  refreshToken: string;
}