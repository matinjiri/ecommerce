import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { UserController } from "./user.controller";
import { UserAddress } from "src/database/entities/user_address.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAddress])],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
  controllers: [UserController]
})
export class UserModule {}
