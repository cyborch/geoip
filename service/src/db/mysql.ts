import { createPool } from 'mysql2/promise';
import { IMysqlIPLocation } from '../model/iplocation/mysql';

// The mysql connector expects a configuration with the following fields:
// {
//   "host": "db",
//   "user": "root",
//   "database": "ip2location",
//   "password": "devel",
//   "waitForConnections": true,
//   "connectionLimit": 10,
//   "queueLimit": 0,
//   "provider": "mysql"
// }

const environment = process.env.NODE_CONFIG || 'development';
const configPath = process.env.CONFIG_PATH || '../../config';
const config = require(`${configPath}/db.${environment}.json`);
delete config.provider;

const connectionPool = createPool(config);

export async function getIpLocation(ip: number): Promise<IMysqlIPLocation | undefined> {
  const result = await connectionPool.query(
    `select * from ip2location_db11 ` +
    `where ip_from <= ${ip} ` +
    `and ip_to >= ${ip} ` +
    `limit 1`
  );
  return result[0][0];
}
