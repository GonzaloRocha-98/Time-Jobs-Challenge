import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DelayInterceptor } from './interceptors/delay.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new DelayInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Weather API')
    .setDescription('This is an api where you can get current weather of a city')
    .setVersion('1.0')
    .addTag('Weather', 'City')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000);
}
bootstrap();
