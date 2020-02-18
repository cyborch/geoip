import { createPool } from 'mysql2/promise';
import { IPLocation } from './model/iplocation.js';

const environment = process.env.NODE_CONFIG || 'development';
const config = require(`../config/db.${environment}.json`)

export const connectionPool = createPool(config);

export async function getIpLocation(ip: number): Promise<IPLocation | undefined> {
  const result = await connectionPool.query(
    `select * from ip2location_db11 ` +
    `where ip_from <= ${ip} ` +
    `and ip_to >= ${ip} ` +
    `limit 1`
  );
  return result[0][0];
}
