export interface IJwtAccesePayload {
  id: number;
}

export interface IJwtRefreshPayload {
  id: number;
  refreshToken: string;
}