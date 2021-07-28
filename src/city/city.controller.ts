import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Res, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CityWeatherDTO } from './dto/cityWeather.dto';
import { CityService } from './city.service'
import { AllExceptionsFilter } from 'src/filters/all-exception.filter';
import { MongoExceptionFilter } from 'src/filters/mongo-exceptiom.filter';
import { City } from './shemas/citiy.schema';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('city')
@ApiTags('City')
@UseFilters(AllExceptionsFilter, MongoExceptionFilter)
export class CityController {
    constructor(private cityService: CityService ){}

    @ApiOkResponse({description: "Lst of all cities"})
    @Get('/')
    async getAllCity(): Promise<City[]>{
        const cities = await this.cityService.getCities();
        if(!cities) {
            throw new HttpException("Invaid id", HttpStatus.BAD_REQUEST)
        }
        return cities
    }

    @ApiCreatedResponse({description: "City Created"})
    @ApiBody({type: CityWeatherDTO})
    @Post('/')
    async createCity(@Body(ValidationPipe) CityWeatherDTO: CityWeatherDTO): Promise<City>{
        const cityCreated = await this.cityService.createCity(CityWeatherDTO);
        if(!cityCreated){
            throw new HttpException('No se pudo crear', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return cityCreated
    }

    @ApiOkResponse({description: "Get a city"})
    @ApiBadRequestResponse({description: "Invalid id"})
    @Get('/:id')
    async getCityById(@Param('id', ValidationPipe) id): Promise<City>{
        const cityFound = await this.cityService.getCityById(id);;
        if(!cityFound){
            throw new HttpException("Invalid id", HttpStatus.BAD_REQUEST)
        }
        return cityFound
    }

    @ApiOkResponse({description: "Delete a city"})
    @ApiBadRequestResponse({description: "Invalid id"})
    @Delete('/:id')
    async deleteCityById(@Param('id', ValidationPipe) id): Promise<City>{
        const cityDeleted = await this.cityService.deleteCity(id);
        if(!cityDeleted){
            throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST)
        }
        return cityDeleted
    }

    @ApiOkResponse({description: "Update a city"})
    @ApiBadRequestResponse({description: "Invalid id"})
    @Patch('/:id')
    async updateCityById(@Param('id', ValidationPipe) id, @Body() body): Promise<City>{
        const cityUpdated = await this.cityService.updateCity(id, body);
        if(!cityUpdated){
            throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST)
        }
        return cityUpdated

    }
}
