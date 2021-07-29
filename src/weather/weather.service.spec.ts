import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { WeatherAPI } from './interfaces/weatherAPI.interface';
import { weatherStub } from './stubs/weather.stub';
import { WeatherApiDTO } from './dto/weatherApi.dto';
import Axios from "axios";

describe.skip('WeatherService', () => {
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService],
    }).compile();

    weatherService = module.get<WeatherService>(WeatherService);
  });


  describe('getWeather', ()=> {
    describe('When getWeather is called', ()=> {
      let urlBase = process.env.OPENWEATHER_PATH_BASE;
      let units = process.env.UNITS;
      let apikey = process.env.API_KEY_OPENWEATHER;
      let weather: WeatherApiDTO;
      beforeEach(async () => {
        weather = await weatherService.getWeather(weatherStub().name)
      })

      test('Then it should call axios.get', ()=>{
        expect(Axios.get).toHaveBeenCalled();
      })

      test('Then it should call axios.get with the openweatherApi url', ()=>{
        expect(Axios.get).toHaveBeenCalledWith(`${urlBase}weather?units=${units}&appid=${apikey}&q=${weatherStub().name}`);
      })

      test('Then it should return cities', ()=>{
        expect(weather).toEqual(weatherStub())
      })

    })
  })
});
