import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema()
export class City {
  @ApiProperty()
  @Prop({required: true})
  name: string;

  @ApiProperty()
  @Prop()
  country: string;

  @ApiProperty()
  @Prop({required: true})
  temperature: number;
  
  @ApiProperty()
  @Prop()
  temperatureMin: number;

  @ApiProperty()
  @Prop()
  temperatureMax: number;

  @ApiProperty()
  @Prop({required: false})
  updated: Date
}

export const CitySchema = SchemaFactory.createForClass(City);