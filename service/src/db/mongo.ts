import * as mongoose from 'mongoose';
import { IPLocation, IMongoIPLocation } from '../model/iplocation/mongo';

// The mongo connector expects a configuration with the following fields:
// {
//   "url": "mongodb://db:27017/ip2location",
//   "provider": "mongo"
// }

const environment = process.env.NODE_CONFIG || 'development';
const configPath = process.env.CONFIG_PATH || '../../config';
const config = require(`${configPath}/db.${environment}.json`);

mongoose.connect(
  config.url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

export async function getIpLocation(ip: number): Promise<IMongoIPLocation | undefined> {
  return await IPLocation.findOne({
    $and: [
      { ipFrom: { $lte: ip} },
      { ipTo: { $gte: ip} }
    ]
  });
}
