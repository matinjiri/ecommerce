import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import databaseConfig from "./config/database.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./modules/auth/auth.module";
import { CacheModule } from "@nestjs/cache-manager";
import redisConfig from "./config/redis.config";
import { OtpModule } from "./modules/otp/otp.module";
import mailConfig from "./config/mail.config";
import { MailModule } from "./shared/services/mail/mail.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, redisConfig, mailConfig],
      envFilePath: [".env"],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => config.get("database") 
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => config.get("redis"),
    }),
    MailModule,
    AuthModule,
    OtpModule
  ],
  controllers: [AppController],
})
export class AppModule {}
