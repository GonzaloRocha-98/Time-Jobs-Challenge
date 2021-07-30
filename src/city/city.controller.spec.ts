import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityWeatherDTO } from './dto/cityWeather.dto';
import { City } from './shemas/citiy.schema';
import { cityStub } from './stubs/city.stub';

jest.mock('./city.service.ts')

describe('CityController', () => {
  let cityController: CityController;
  let cityService: CityService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [CityService]
    }).compile();

    cityController = module.get<CityController>(CityController);
    cityService = module.get<CityService>(CityService)
    jest.clearAllMocks();
  });

  describe('getAllCity', ()=>{
    describe('When getAllCity is called', ()=>{
      let city: City[];
      beforeEach(async () => {
        city = await cityController.getAllCity()
      })

      test('Then it should call cityService', ()=>{
        expect(cityService.getCities).toHaveBeenCalled();
      })

      test('Then it should return cities', ()=>{
        expect(city).toEqual([cityStub()])
      })
    })
  })

  describe('getCity', () => {
    describe('when getCity is called', () => {
      let city: City;

      beforeEach(async () => {
        city = await cityController.getCityById(cityStub()._id)  
      })

      test('then it should call cityService', () => {
        expect(cityService.getCityById).toBeCalledWith(cityStub()._id);
      })

      test('then is should return a city', () => {
        expect(city).toEqual(cityStub());
      })
    })
  })

  describe('createCity', () => {
    describe('when createCity is called', () => {
      let city: City;
      let createCityDto: CityWeatherDTO

      beforeEach(async () => {
        createCityDto = {
          name: cityStub().name,
          country: cityStub().country,
          temperature: cityStub().temperature,
          temperatureMax: cityStub().temperatureMax,
          temperatureMin: cityStub().temperatureMin,
          updated: cityStub().updated
        }
        city = await cityController.createCity(createCityDto);
      })

      test('then it should call cityService', () => {
        expect(cityService.createCity).toHaveBeenCalledWith(createCityDto);
      })

      test('then it should return a city', () => {
        expect(city).toEqual(cityStub())
      })
    })
  })

  describe('updateCity', () => {
    describe('when updateCity is called', () => {
      let city: City;
      let updateUserDto;

      beforeEach(async () => {
        updateUserDto = {
          name: cityStub().name,
          country: cityStub().country,
          temperature: 23.5,
          temperatureMax: 20,
          temperatureMin: 26,
          updated: Date.now()
        }
        city = await cityController.updateCityById(cityStub()._id, updateUserDto);
      })

      test('then it should call usersService', () => {
        expect(cityService.updateCity).toHaveBeenCalledWith(cityStub()._id, updateUserDto);
      })

      test('then it should return a user', () => {
        expect(city).toEqual(cityStub())
      })
    })
  })

});
