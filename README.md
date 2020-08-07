# Self hosted reverse geo location

A simple self-hosted reverse geo location service.

This provides the physical address of the client making a request to it.

### Why?

There are a lot of free or semi-free reverse geo location services out there
already. Why create another one?

This one is self hosted and provides the ability to get reverse geo location
with zero external dependencies.


## Request and response format

A `GET` request to `/json/` or to `/json/xx.xx.xx.xx` yields a response formatted as a [Place](https://schema.org/Place)
with the location matching the client ip or the ip given in place of `xx.xx.xx.xx`.

*Example response:*

```json
{
  "@context": "http://schema.org",
  "@type": "Place",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.34567,
    "longitude": 12.34567
  },
  "address": {
    "@type": "PostalAddress",
    "postalCode": "90210",
    "addressLocality": "Beverly Hills",
    "addressRegion": "California",
    "addressCountry": "US"
  },
  "additionalProperty": {
    "name": "timeZone",
    "value": "-08:00"
  }
}
```

### Where does the data come from?

`This site or product includes IP2Location LITE data available from https://www.ip2location.com.`

This means that the data is provided free of charge by ip2location.com as long
as the above sentence is retained. See license in [schema](schema)
for details.
