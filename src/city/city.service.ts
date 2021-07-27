import { Injectable, UseFilters } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './interfaces/city.interface';
import { CreateCityDTO, idParamDTO } from './dto/city.dto';

@Injectable()
export class CityService {
    constructor(@InjectModel('City') private readonly cityModel: Model<City>){}

    async getCities(): Promise<City[]>{
        const cities = await this.cityModel.find();
        return cities
    }

    async getCityById(id: idParamDTO): Promise<City>{
        const cityFound = await this.cityModel.findById(id); 
        return cityFound
    }

    async createCity(city: CreateCityDTO): Promise<City>{
        const cityCreated = await this.cityModel.create(city);
        return cityCreated
    }

    async updateCity(id: idParamDTO, city:CreateCityDTO): Promise<City>{
        const cityUpdated = await this.cityModel.findByIdAndUpdate(id, city, {new: true});
        return cityUpdated
    }

    async deleteCity(id: idParamDTO): Promise<City>{
        const cityDeleted = await this.cityModel.findByIdAndRemove(id);
        return cityDeleted
    }

}
