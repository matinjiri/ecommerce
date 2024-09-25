import { registerAs } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

export default registerAs("redis", () => ({
  port: +process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  isGlobal: true,
  store: redisStore
}));