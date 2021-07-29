import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { ApiBadRequestResponse, ApiProperty } from "@nestjs/swagger";

export class CityWeatherDTO{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'city name'})
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description:"country"})
    country: string;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({type: String, description: "Temperature"})
    temperature: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({type: String, description: "TemperatureMax"})
    temperatureMax: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({type: String, description: "TemperatureMin"})
    temperatureMin: number;
    
    updated: Date;
}
