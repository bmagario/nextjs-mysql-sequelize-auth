import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api");
	app.useGlobalPipes(
    new ValidationPipe(
    { 
      whitelist: true, 
      transform: true,
      forbidNonWhitelisted: true
    }
  ));

	const config = new DocumentBuilder()
		.setTitle("Nest REST API")
		.setDescription("Nes REST API example")
		.setVersion("1.0")
		.addTag("nest")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	await app.listen(3000);
}
bootstrap();
