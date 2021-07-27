import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { ApiBadRequestResponse, ApiProperty } from "@nestjs/swagger";

export class CreateCityDTO{
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
}

export class idParamDTO{
    @IsNotEmpty()
    @ApiProperty({type: String, description:'Id of city'})
    id: string
}