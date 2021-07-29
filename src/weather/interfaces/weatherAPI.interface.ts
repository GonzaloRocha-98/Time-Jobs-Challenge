export interface WeatherAPI {
    readonly coord: {
              lon: number,
              lat: number
            };
    readonly weather: [
              {
                id: number,
                main: string,
                description: string,
                icon: string
              }
            ];
    readonly base: string;
    readonly main: {
              temp: number,
              feels_like: number,
              temp_min: number,
              temp_max: number,
              pressure: number,
              humidity: number
            };
    readonly visibility: number;
    readonly wind: {
              speed: number,
              deg: number
            };
    readonly clouds: {
              all: number
            };
    readonly dt: number;
    readonly sys: {
              type: number,
              id: number,
              message: number,
              country: string,
              sunrise: number,
              sunset: number
            };
    readonly timezone: number;
    readonly id: number;
    readonly name: string;
    readonly cod: number;
} 