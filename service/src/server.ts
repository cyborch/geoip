import * as express from 'express';
import { getIpLocation } from './db';
import { ip2int } from './ip2int';
import { Place } from './model/location';


const app: express.Application = express();

app.get('/json/', async function (req, res) {
  const ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress;
  const ipInt = ip2int(ip);
  if (ipInt === 0) {
    return res.status(400).send({
      error: `'${ip}' is not an ipv4 number`,
      code: 400,
    });
  }
  const ipLocation = await getIpLocation(ipInt);
  if (ipLocation === undefined) {
    return res.status(404).send({
      error: `location cannot be found for '${ip}'`,
      code: 404,
    });
  }
  const location = new Place(ipLocation);
  res.send(location);
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
