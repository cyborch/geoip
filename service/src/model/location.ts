import { IMysqlIPLocation } from './iplocation/mysql';
import { IMongoIPLocation } from './iplocation/mongo';
import { IPLocation } from '../db';

export interface Geo {
  '@type': string; // GeoCoordinates
  latitude: number;
  longitude: number;
}

export interface Address {
  '@type': string; // PostalAddress
  postalCode: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
}

export interface AdditionalProperty {
  name: string;
  value: string;
}

export class Place {
  '@context': string; // http://schema.org
  '@type': string; // Place
  geo: Geo;
  address: Address;
  /*
  name: timeZone
  value: +/-hh:mm
  */
  additionalProperty: AdditionalProperty;

  constructor(location: IPLocation) {
    this['@context'] = 'http://schema.org';
    this['@type'] = 'Place';
    this.geo = {
      '@type': 'GeoCoordinates',
      latitude: location.latitude,
      longitude: location.longitude,
    };
    this.address = {
      '@type': 'PostalAddress',
      postalCode: (location as IMongoIPLocation).zipCode || (location as IMysqlIPLocation).zip_code,
      addressLocality: (location as IMongoIPLocation).cityName || (location as IMysqlIPLocation).city_name,
      addressRegion: (location as IMongoIPLocation).regionName || (location as IMysqlIPLocation).region_name,
      addressCountry: (location as IMongoIPLocation).countryCode || (location as IMysqlIPLocation).country_code,
    };
    this.additionalProperty = {
      name: 'timeZone',
      value: (location as IMongoIPLocation).timeZone || (location as IMysqlIPLocation).time_zone,
    };
  }
}
