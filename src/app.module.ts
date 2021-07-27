import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from './city/city.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CityModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DB_URL)],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
