import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './interfaces/city.interface';
import { CityWeatherDTO  } from './dto/cityWeather.dto';

@Injectable()
export class CityService {
    constructor(@InjectModel('City') private readonly cityModel: Model<City>){}

    async getCities(): Promise<City[]>{
        const cities = await this.cityModel.find();
        return cities
    }

    async getCityById(id): Promise<City>{
        const cityFound = await this.cityModel.findById(id); 
        return cityFound
    }

    async createCity(city: CityWeatherDTO ): Promise<City>{
        const cityCreated = await this.cityModel.create(city);
        return cityCreated
    }

    async updateCity(id, city:CityWeatherDTO | City ): Promise<City>{
        const cityUpdated = await this.cityModel.findByIdAndUpdate(id, city, {new: true});
        return cityUpdated
    }

    async deleteCity(id): Promise<City>{
        const cityDeleted = await this.cityModel.findByIdAndRemove(id);
        return cityDeleted
    }

    async getCityByName(name: string): Promise<City>{
        name = name.charAt(0).toUpperCase() + name.slice(1);
        const cityFound = await this.cityModel.findOne({name})
        return cityFound
    }

}
