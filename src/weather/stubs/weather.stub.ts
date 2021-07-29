import { WeatherApiDTO} from '../dto/weatherApi.dto'

export const weatherStub = (): WeatherApiDTO =>{
    return {
        name: "La Plata",
        country: "AR",
        temperature:13.64,
        temperatureMax: 13.81,
        temperatureMin: 12.68,
        updated: new Date("2021-07-28T20:19:21.577Z")
    }
}