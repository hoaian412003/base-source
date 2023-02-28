import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI
  })

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Pool Wallets Api version1')
    .setVersion('1')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });


  await app.listen(3000);
}
bootstrap();
