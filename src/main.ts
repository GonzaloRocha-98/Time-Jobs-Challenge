import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DelayInterceptor } from './interceptors/delay.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new DelayInterceptor());
  await app.listen(3000);
}
bootstrap();
