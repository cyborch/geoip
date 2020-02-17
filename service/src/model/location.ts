import { IPLocation } from './iplocation';

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
      postalCode: location.zip_code,
      addressLocality: location.city_name,
      addressRegion: location.region_name,
      addressCountry: location.country_code,
    };
    this.additionalProperty = {
      name: 'timeZone',
      value: location.time_zone,
    };
  }
}
