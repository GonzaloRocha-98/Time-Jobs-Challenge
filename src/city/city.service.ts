import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './interfaces/city.interface';
import { CreateCityDTO } from './dto/city.dto';

@Injectable()
export class CityService {
    constructor(@InjectModel('City') private readonly cityModel: Model<City>){}

    async getCities(): Promise<City[]>{
        return await this.cityModel.find()
    }

    async getCityById(id: string): Promise<City>{
        return await this.cityModel.findById(id)
    }

    async createCity(city: CreateCityDTO): Promise<City>{
        return await this.cityModel.create(city)
    }

    async updateCity(id: string, city:CreateCityDTO): Promise<City>{
        return await this.cityModel.findByIdAndUpdate(id, city, {new: true})
    }

    async deleteCity(id: string): Promise<City>{
        return await this.cityModel.findByIdAndRemove(id)
    }

}
