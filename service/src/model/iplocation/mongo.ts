import * as mongoose from 'mongoose';

export interface IMongoIPLocation {
  ipFrom: number;
  ipTo: number;
  countryCode: string;
  countryName: string;
  regionName: string;
  cityName: string;
  latitude: number;
  longitude: number;
  zipCode: string;
  timeZone: string;
}

const schema = new mongoose.Schema({
  ipFrom: Number,
  ipTo: Number,
  countryCode: String,
  countryName: String,
  regionName: String,
  cityName: String,
  latitude: Number,
  longitude: Number,
  zipCode: String,
  timeZone: String,
});

export const IPLocation = mongoose.model<IMongoIPLocation>(
  'IPLocation',
  schema,
  'iplocation'
);
