import { weatherStub } from "../stubs/weather.stub";

export const WeatherService = jest.fn().mockReturnValue({
    getWeather: jest.fn().mockResolvedValue(weatherStub()),
    parseResponse: jest.fn().mockReturnValue(weatherStub()),
    getWeatherByApiOrBD: jest.fn().mockResolvedValue(weatherStub())
})