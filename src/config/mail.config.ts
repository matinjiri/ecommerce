import { MailerOptions } from "@nestjs-modules/mailer";
import { registerAs } from "@nestjs/config";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"; // Import the Handlebars adapter
import * as path from "path"; // You may need this for setting the path correctly

export default registerAs(
  "mail",
  (): MailerOptions => ({
    transport: {
      host: process.env.EMAIL_HOST,
      port: +process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure: process.env.SECURE === "true",
    },
    defaults: {
      from: process.env.EMAIL_FROM,
    },
    template: {
      dir: path.join(process.cwd(), "/src/common/templates"),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true, 
      },
    },
  })
);
