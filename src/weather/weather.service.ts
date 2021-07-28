import { Injectable } from '@nestjs/common';
import {HttpService} from '@nestjs/axios'
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { WeatherAPI } from './interfaces/weatherAPI.interface';
import { CreateCityDTO } from 'src/city/dto/city.dto';

@Injectable()
export class WeatherService {
  private client: AxiosInstance
  private readonly WEATHER_API_URL = process.env.OPENWEATHER_PATH_BASE;
  
  private readonly UNITS = process.env.UNITS;

  private readonly API_KEY = process.env.API_KEY_OPENWEATHER;

  constructor(private httpService : HttpService){
    this.client = Axios.create({
      baseURL: this.WEATHER_API_URL,
      params:{
        appid: this.API_KEY,
        units: this.UNITS
      }
    })
  }
  async getWeather(city: string): Promise<CreateCityDTO>{
    const weatherCity = await this.client.get('weather', {
      params: {
        q:city
      }
    })
    return this.parseResponse(weatherCity.data)
  }

  private parseResponse(cityResponse: WeatherAPI): CreateCityDTO {
    const response =  {
      name: cityResponse.name,
      country: cityResponse.sys.country,
      temperature: cityResponse.main.temp,
      temperatureMax: cityResponse.main.temp_max,
      temperatureMin: cityResponse.main.temp_min
    }
    return response
  }

  // create(createWeatherDto: CreateWeatherDto) {
  //   return 'This action adds a new weather';
  // }

  // findAll() {
  //   return `This action returns all weather`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} weather`;
  // }

  // update(id: number, updateWeatherDto: UpdateWeatherDto) {
  //   return `This action updates a #${id} weather`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} weather`;
  // }
}
