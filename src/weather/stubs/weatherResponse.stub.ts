import { WeatherAPI } from '../interfaces/weatherAPI.interface'

export const weatherResponseApiStub = (): WeatherAPI =>{
    return {
        coord: { lon: -57.9545, lat: -34.9215 },
        weather: [               {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          } ],
        base: 'stations',
        main: {
          temp: 13.71,
          feels_like: 12.29,
          temp_min: 11.9,
          temp_max: 13.95,
          pressure: 1025,
          humidity: 44,
          sea_level: 1025,
          grnd_level: 1022
        },
        visibility: 10000,
        wind: { speed: 4.73, deg: 290, gust: 6.19 },
        clouds: { all: 0 },
        dt: 1627586257,
        sys: {
          type: 2,
          id: 2035390,
          country: 'AR',
          sunrise: 1627555701,
          sunset: 1627592880
        },
        timezone: -10800,
        id: 3432043,
        name: 'La Plata',
        cod: 200
      }
}