import { weatherResponseApiStub } from "../stubs/weatherResponse.stub";

export default {
    get: jest.fn().mockResolvedValue(weatherResponseApiStub())
  };