import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAccessTokenGuard } from "../auth/guards/jwt-access.guard";
import { UserService } from "./user.service";
import { UserId } from "src/common/decorators/user/user-id.decorator";

@ApiTags("user")
@ApiBearerAuth("Authorization")
@UseGuards(JwtAccessTokenGuard)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get("me")
  public async getProfile(@UserId() userId: number) {
    return await this.userService.getProfile(userId);
  }
}
