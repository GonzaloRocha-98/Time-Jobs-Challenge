import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { CityService } from 'src/city/city.service';
import { CityModule } from 'src/city/city.module';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from 'src/city/shemas/citiy.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: City.name, schema: CitySchema}]),CityModule],
  controllers: [WeatherController],
  providers: [WeatherService, CityService]
})
export class WeatherModule {}
