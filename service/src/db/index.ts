import { IMongoIPLocation } from "../model/iplocation/mongo";
import { IMysqlIPLocation } from "../model/iplocation/mysql";

const environment = process.env.NODE_CONFIG || 'development';
const configPath = process.env.CONFIG_PATH || '../../config';
const config = require(`${configPath}/db.${environment}.json`);

let getter: Function | undefined = undefined;
if (config.provider === 'mongo') {
  getter = require('./mongo').getIpLocation;
} else if (config.provider === 'mysql') {
  getter = require('./mysql').getIpLocation;
}

export type IPLocation = IMongoIPLocation | IMysqlIPLocation;

export async function getIpLocation(ip: number): Promise<IPLocation | undefined> {
  return await getter(ip);
}
