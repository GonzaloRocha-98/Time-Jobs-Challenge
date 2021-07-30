import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from './city/city.module';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [CityModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DB_URL), WeatherModule],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
