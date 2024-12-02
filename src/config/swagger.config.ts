import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle("E-Commerce API")
    .setDescription("API documentation for the eCommerce platform")
    .setVersion("1.0")
    .addBearerAuth(
      {
        scheme: "bearer",
        bearerFormat: "JWT",
        type: "http",
      },
      "Authorization"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
}
