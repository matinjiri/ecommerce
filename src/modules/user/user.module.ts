import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { UserController } from "./auth.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
  controllers: [UserController]
})
export class UserModule {}
