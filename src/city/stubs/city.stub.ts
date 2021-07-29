import { City } from '../interfaces/city.interface'

export const cityStub = (): City =>{
    return {
        _id: "6101bbc9e805a031a4106fb3",
        updated: new Date("2021-07-28T20:19:21.577Z"),
        name: "Brazil",
        country: "BR",
        temperature:35.07,
        temperatureMax: 35.07,
        temperatureMin: 35.07,
        __v: 0
    }
}