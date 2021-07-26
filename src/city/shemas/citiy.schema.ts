import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema()
export class City {
  @Prop({required: true})
  name: string;

  @Prop()
  country: string;

  @Prop({required: true})
  temperature: number;
  
  @Prop()
  temperatureMin: number;

  @Prop()
  temperatureMax: number;
}

export const CitySchema = SchemaFactory.createForClass(City);