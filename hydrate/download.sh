#!/usr/bin/env bash

set -e

echo "Downloading IP2LOCATION-LITE-DB11.CSV.ZIP..."
curl -L "https://www.ip2location.com/download/?token=$IP2LOCATION_TOKEN&file=DB11LITECSV" > IP2LOCATION-LITE-DB11.CSV.ZIP

unzip -qjd . IP2LOCATION-LITE-DB11.CSV.ZIP

count=`cat IP2LOCATION-LITE-DB11.CSV | wc -l`
if [[ "$count" < 2000000 ]] ; then
  exit -1
fi

mysql \
  --host=$MYSQL_HOST \
  --database=$MYSQL_DATABASE \
  --user=$MYSQL_USERNAME \
  --password=$MYSQL_PASSWORD < import.sql
