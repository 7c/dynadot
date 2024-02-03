# Dynadot API
api version 3 wrapper which converts their XML response to JSON. Docs at https://www.dynadot.com/domain/api-commands


# Install
```
npm install --save dynadot
```

# Embed
```
const Dynadot = require('dynadot')
const dynadot = new Dynadot('<APIKEY>')
```

# Methods

## listDomains() <Promise>
retrieves all domains from Dynadot and returns them (if success) as an object with domain as key, this way you can lookup very fast. Dynadot returns all the information for all domains, all you need to do is to find the domain by its index as domainname.
```
var allDomains = await dynadot.listDomains()
```

## setNameserver(domain,['ns1','ns2'...]) <Promise>
```
await dynadot.setNameserver('temp.com',['ns1.com','ns2.com'])
```

## registerDomain(domainName,durationYears, currency='USD',allowPremium=false)
```
await dynadot.registerDomain('yourdomain.com',1)
```