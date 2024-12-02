import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAccessTokenGuard } from "../auth/guards/jwt-access.guard";
import { UserService } from "./user.service";
import { UserId } from "src/common/decorators/user/user-id.decorator";
import { CreateAddressDto } from "src/common/dtos/user/create-address.dto";
import { UpdateAddressDto } from "src/common/dtos/user/update-address.dto";

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
  @Post("address")
  async createAddress(
    @UserId() userId: number,
    @Body() createAddressDto: CreateAddressDto
  ) {
    return this.userService.createAddress(userId, createAddressDto);
  }
  @Get("address")
  async getAddresses(@UserId() userId: number) {
    return this.userService.getAddresses(userId);
  }
  @Patch(':addressId')
  async updateAddress(
    @UserId() userId: number,
    @Param('addressId') addressId: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.userService.updateAddress(userId, addressId, updateAddressDto);
  }
  @Delete(':addressId')
  async deleteAddress(@UserId() userId: number, @Param('addressId') addressId: number) {
    return this.userService.softDeleteAddress(userId, addressId); // Use soft delete here
  }
}
