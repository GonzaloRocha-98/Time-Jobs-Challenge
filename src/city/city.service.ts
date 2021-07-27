import { Injectable, UseFilters } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './interfaces/city.interface';
import { CreateCityDTO } from './dto/createCity.dto';

@Injectable()
export class CityService {
    constructor(@InjectModel('City') private readonly cityModel: Model<City>){}

    async getCities(): Promise<City[]>{
        const cities = await this.cityModel.find();
        return cities
    }

    async getCityById(id: string): Promise<City>{
        const cityFound = await this.cityModel.findById(id); 
        return cityFound
    }

    async createCity(city: CreateCityDTO): Promise<City>{
        const cityCreated = await this.cityModel.create(city);
        return cityCreated
    }

    async updateCity(id: string, city:CreateCityDTO): Promise<City>{
        const cityUpdated = await this.cityModel.findByIdAndUpdate(id, city, {new: true});
        return cityUpdated
    }

    async deleteCity(id: string): Promise<City>{
        const cityDeleted = await this.cityModel.findByIdAndRemove(id);
        return cityDeleted
    }

}
