import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { WeatherAPI } from './interfaces/weatherAPI.interface';
import { WeatherApiDTO } from './dto/weatherApi.dto';
import { CityService } from '../city/city.service'

@Injectable()
export class WeatherService {
  private client: AxiosInstance
  private readonly WEATHER_API_URL = process.env.OPENWEATHER_PATH_BASE;
  
  private readonly UNITS = process.env.UNITS;

  private readonly API_KEY = process.env.API_KEY_OPENWEATHER;

  constructor(private cityService: CityService){
    this.client = Axios.create({
      baseURL: this.WEATHER_API_URL,
      params:{
        appid: this.API_KEY,
        units: this.UNITS
      }
    })
  }
  async getWeather(city: string): Promise<WeatherApiDTO>{
    let attempt = 1;
    let weatherCity;
    while(attempt< 4){  // Tres intentos para simular el 15% de fallo
      let num = Math.round(Math.random() * (100 - 1) + 1); 
      console.log(num);
      if(num > 15){ //El numero random paso el 15% de fallo artificial
        try {
          weatherCity = await this.client.get('weather', {
            params: {
              q:city
            }
          });
        } catch (error) {
          if(error.response.status === 404){
            throw new HttpException('Invalid city name', HttpStatus.NOT_FOUND)
          }
        }
        attempt = 4;
      }else{
        attempt++;
      }
    }
    if(!weatherCity){
      throw new HttpException('An Error ocurred while trying to connect with an OpenWeather api. Try it again', HttpStatus.SERVICE_UNAVAILABLE)
    }

    return this.parseResponse(weatherCity.data)
  }

  private parseResponse(cityResponse: WeatherAPI): WeatherApiDTO {
    const response =  {
      name: cityResponse.name,
      country: cityResponse.sys.country,
      temperature: cityResponse.main.temp,
      temperatureMax: cityResponse.main.temp_max,
      temperatureMin: cityResponse.main.temp_min,
      updated: new Date()
    }
    return response
  }

  async getWeatherByApiOrBD(city: string){
    const cityBD = await this.cityService.getCityByName(city);
    if(cityBD){ //Preguna si existe la ciudad en la bd
      if((cityBD.updated.getTime() + 60000) >= Date.now()){ //damos un lapso de 1 minuto para devolver la data de la bd
        //console.log('mandamos la city de bd');
        return cityBD
      }
      else{   //Sino hacemos el llamado a la api y actualizamos el valor en la bd
        //console.log('Llamamos a la api y traemos la data')
        const cityApi = await this.getWeather(city);
        await this.cityService.updateCity(cityBD._id.valueOf(), cityApi)
        return cityApi
      }
    }
    //Si no existe en la bd, llamamos a la api y persistmos
    //console.log('Llamams a la api mandamos la data y persisitmos en la bd')
    const cityApi = await this.getWeather(city);
    await this.cityService.createCity(cityApi)
    return cityApi
  }

}
