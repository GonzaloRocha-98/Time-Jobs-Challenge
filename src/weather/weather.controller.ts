import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CityWeatherDTO } from 'src/city/dto/cityWeather.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('cities') cities: string[]): Promise<CityWeatherDTO[]> {
    const citiesWeather = [];
    await Promise.all(cities.map(async (city) => {
      citiesWeather.push(await this.weatherService.getWeatherByApiOrBD(city))
    }))
    return citiesWeather;
  }
}
