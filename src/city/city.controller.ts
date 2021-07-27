import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Res, UseFilters, UseInterceptors } from '@nestjs/common';
import { CreateCityDTO } from './dto/createCity.dto';
import { CityService } from './city.service'
import { AllExceptionsFilter } from 'src/filters/all-exception.filter';
import { MongoExceptionFilter } from 'src/filters/mongo-exceptiom.filter';
import { City } from './shemas/citiy.schema';

@Controller('city')
@UseFilters(AllExceptionsFilter, MongoExceptionFilter)
export class CityController {
    constructor(private cityService: CityService ){}

    @Get('/')
    async getAllCity(): Promise<City[]>{
        const cities = await this.cityService.getCities();
        if(!cities) {
            throw new HttpException("Invaid id", HttpStatus.BAD_REQUEST)
        }
            //return setResponseWithOk(res, HttpStatus.OK, 'List all cities', 'ok', cities)
        return cities
    }


    @Post('/')
    async createCity(@Body() createCityDTO: CreateCityDTO): Promise<City>{
        const cityCreated = await this.cityService.createCity(createCityDTO);
        if(!cityCreated){
            throw new HttpException('No se pudo crear', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return cityCreated
    }

    @Get('/:id')
    async getCityById(@Param('id') id): Promise<City>{
        const cityFound = await this.cityService.getCityById(id);;
        if(!cityFound){
            throw new HttpException("Invalid id", HttpStatus.BAD_REQUEST)
        }
        return cityFound
    }

    @Delete('/:id')
    async deleteCityById(@Param('id') id): Promise<City>{
        const cityDeleted = await this.cityService.deleteCity(id);
        if(!cityDeleted){
            throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST)
        }
        return cityDeleted
    }

    @Patch('/:id')
    async updateCityById(@Param('id') id, @Body() body): Promise<City>{
        const cityUpdated = await this.cityService.updateCity(id, body);
        if(!cityUpdated){
            throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST)
        }
        return cityUpdated

    }
}
