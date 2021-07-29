import { cityStub } from "../stubs/city.stub";

export const CityService = jest.fn().mockReturnValue({
    getCities: jest.fn().mockResolvedValue([cityStub()]),

    getCityById: jest.fn().mockResolvedValue(cityStub()),

    createCity: jest.fn().mockResolvedValue(cityStub()),

    updateCity: jest.fn().mockResolvedValue(cityStub()),

    deleteCity: jest.fn().mockResolvedValue(cityStub()),

    getCityByName: jest.fn().mockResolvedValue(cityStub())
})