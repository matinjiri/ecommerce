import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IJwtAccesePayload } from "../../interfaces/jwt-payload.interface";

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-access"
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: IJwtAccesePayload) {
    return { ...payload };
  }
}
