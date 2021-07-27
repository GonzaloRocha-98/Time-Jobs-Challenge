import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Res, UseFilters } from '@nestjs/common';
import { identity } from 'rxjs';
import { CreateCityDTO } from './dto/city.dto';
import { CityService } from './city.service'
import {setResponseWithError, setResponseWithOk} from '../util/common-response.js'
import { AllExceptionsFilter } from 'src/filters/all-exception.filter';
import { MongoExceptionFilter } from 'src/filters/mongo-exceptiom.filter';

@Controller('city')
@UseFilters(AllExceptionsFilter, MongoExceptionFilter)
export class CityController {
    constructor(private cityService: CityService ){}

    @Get('/')
    async getAllCity(@Res() res){
        const cities = await this.cityService.getCities();
        if(!cities) {
            throw new HttpException("Invaid id", HttpStatus.BAD_REQUEST)
        }
            return setResponseWithOk(res, HttpStatus.OK, 'List all cities', 'ok', cities)
    }


    @Post('/')
    async createCity(@Res() res, @Body() createCityDTO: CreateCityDTO){
        console.log(createCityDTO)
        const cityCreated = await this.cityService.createCity(createCityDTO);
        if(!cityCreated){
            throw new HttpException('No se pudo crear', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return setResponseWithOk(res, HttpStatus.OK, 'City created', 'ok', cityCreated)
    }

    @Get('/:id')
    async getCityById(@Res() res, @Param('id') id){
        const cityFound = await this.cityService.getCityById(id);;
        if(!cityFound){
            throw new HttpException("Invalid id", HttpStatus.BAD_REQUEST)
        }
        return setResponseWithOk(res, HttpStatus.OK, `City with id ${id}`, 'ok', cityFound);
    }

    @Delete('/:id')
    async deleteCityById(@Res() res, @Param('id') id){
        const cityDeleted = await this.cityService.deleteCity(id);
        if(!cityDeleted){
            throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST)
        }
        return setResponseWithOk(res, HttpStatus.OK, 'City deleted', 'ok', cityDeleted)
    }

    @Patch('/:id')
    async updateCityById(@Res() res, @Param('id') id, @Body() body){
        const cityUpdated = await this.cityService.updateCity(id, body);
        if(!cityUpdated){
            throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST)
        }
        return setResponseWithOk(res, HttpStatus.OK, 'City updated', 'ok', cityUpdated)

    }
}
