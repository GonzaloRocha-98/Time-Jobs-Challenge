import { Controller, Get, Query } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiServiceUnavailableResponse, ApiTags } from '@nestjs/swagger';
import { CityWeatherDTO } from '../city/dto/cityWeather.dto';
import { WeatherService } from './weather.service';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOkResponse({description: "Weather list of the cities sent", type: CityWeatherDTO, isArray: true})
  @ApiServiceUnavailableResponse({description: "Fallo con a conexion de la api de OpenWeather"})
  @ApiNotFoundResponse({description: "Invalid city name"})
  @ApiInternalServerErrorResponse({description: 'Internal server error'})
  @ApiOperation({summary:'Returns the weather of the cities sent by Query in the OpenWeather api. If one city sent again in a period of 1 minute, will return to the city in a database'})
  @ApiQuery({ name: 'cities', required: true, isArray: true })
  async getWeather(@Query('cities') cities: string[]): Promise<CityWeatherDTO[]> {
    const citiesWeather = [];
    typeof cities === 'string' ? cities = Array.of(cities) : [];
    await Promise.all(cities.map(async (city) => {
      citiesWeather.push(await this.weatherService.getWeatherByApiOrBD(city))
    }))
    return citiesWeather;
  }
}
