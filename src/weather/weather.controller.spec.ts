import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from '../city/__mocks__/city.service';
import { WeatherApiDTO } from './dto/weatherApi.dto';
import { weatherStub } from './stubs/weather.stub';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

jest.mock('./weather.service.ts')

describe('WeatherController', () => {
  let weatherController: WeatherController;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService, CityService],
    }).compile();

    weatherController = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
    jest.clearAllMocks()
  });

  describe('getWeather', () =>{
    describe('When getWeather is called', ()=> {
      let weather;

      beforeEach(async () => {
        weather = await weatherController.getWeather([weatherStub().name])
      })

      test('Then it should call weatherService', ()=>{
        expect(weatherService.getWeatherByApiOrBD).toHaveBeenCalled();
      })

      test('Then it should return cities', ()=>{
        expect(weather).toEqual([weatherStub()])
      })

    })
  })

});
