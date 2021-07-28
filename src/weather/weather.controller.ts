import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('cities') cities: string[]) {
    const citiesWeather = [];
    await Promise.all(cities.map(async (city) => {
      citiesWeather.push(await this.weatherService.getWeather(city))
    }))
    return citiesWeather;
  }
/*
  @Post()
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto);
  }

  @Get()
  findAll() {
    return this.weatherService.findAll();
  }
*/

/*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeatherDto: UpdateWeatherDto) {
    return this.weatherService.update(+id, updateWeatherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weatherService.remove(+id);
  }
*/
}
