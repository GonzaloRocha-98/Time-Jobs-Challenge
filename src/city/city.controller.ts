import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { identity } from 'rxjs';
import { CreateCityDTO } from './dto/city.dto';
import { CityService } from './city.service'
import {setResponseWithError, setResponseWithOk} from '../util/common-response.js'

@Controller('city')
export class CityController {
    constructor(private cityService: CityService ){}

    @Get('/')
    async getAllCity(@Res() res){
        const cities = await this.cityService.getCities();
        if(!cities) {
            setResponseWithError(res, HttpStatus.BAD_REQUEST, "Invalid id", 'error', cities)
        }
            return setResponseWithOk(res, HttpStatus.OK, 'List all cities', 'ok', cities)
        /*res.status(HttpStatus.OK).json({
            message: "all cities",
            cities
        })
        */
    }


    @Post('/')
    async createCity(@Res() res, @Body() createCityDTO: CreateCityDTO){
        console.log(createCityDTO)
        const cityCreated = await this.cityService.createCity(createCityDTO);
        if(!cityCreated){
            return setResponseWithError(res, HttpStatus.BAD_REQUEST, 'oCURRIO un error ', 'error', cityCreated)
        }
        return setResponseWithOk(res, HttpStatus.OK, 'City created', 'ok', cityCreated)
        /*
        return res.status(HttpStatus.CREATED).json({
            message: "creado",
            cityCreated
        })
        */
    }

    @Get('/:id')
    async getCityById(@Res() res, @Param('id') id){
        const cityFound = await this.cityService.getCityById(id);;
        if(!cityFound){
            return setResponseWithError(res, HttpStatus.BAD_REQUEST,"Invalid id", 'error', cityFound)
        }
        return setResponseWithOk(res, HttpStatus.OK, `City with id ${id}`, 'ok', cityFound);
        /*
        return res.status(HttpStatus.OK).json({
            message: `Ciudad ${id}`,
            cityFound
        })
        */
    }

    @Delete('/:id')
    async deleteCityById(@Res() res, @Param('id') id){
        const cityDeleted = await this.cityService.deleteCity(id);
        if(!cityDeleted){
            return setResponseWithError(res, HttpStatus.BAD_REQUEST, 'invalid id', 'error', cityDeleted)
        }
        return setResponseWithOk(res, HttpStatus.OK, 'City deleted', 'ok', cityDeleted)
        /*
        return res.status(HttpStatus.OK).json({
            message: `Ciudad ${id}`,
            cityDeleted
        })
        */
    }

    @Patch('/:id')
    async updateCityById(@Res() res, @Param('id') id, @Body() body){
        const cityUpdated = await this.cityService.updateCity(id, body);
        if(!cityUpdated){
            return setResponseWithError(res, HttpStatus.BAD_REQUEST, 'invalid id', 'error', cityUpdated)
        }
        return setResponseWithOk(res, HttpStatus.OK, 'City updated', 'ok', cityUpdated)
        /*
        return res.status(HttpStatus.OK).json({
            message: `Ciudad ${id}`,
            cityUpdated
        })
        */
    }
}
