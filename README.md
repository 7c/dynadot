# Dynadot API
api version 3 wrapper which converts their XML response to JSON. Docs at https://www.dynadot.com/domain/api-commands


# Install
```
npm install --save https://github.com/7c/dynadot
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

## registerDomain(domainName,durationYears, currency='USD',allowPremium=false, coupon=false) 
```
await dynadot.registerDomain('yourdomain.com',1)
// success
{"RegisterHeader":{"SuccessCode":"0","Status":"success"},"RegisterContent":{"Expiration":"1738627199000"}}
// errors
{"RegisterHeader":{"SuccessCode":"1","Status":"not_available"}}
{"RegisterHeader":{"SuccessCode":"-1","Status":"error","Error":"this domain is a premium domain, please use premium option"}}
{"RegisterHeader":{"SuccessCode":"5","Status":"system_busy"}}
```

## tldPrices(currency='USD') 
```
await dynadot.tldPrices()
```


## deleteDomain(domainName)
important: only grace-period domains can be deleted at dynadot. other domains or transfered domains cannot be deleted with this method.(check dynadot statement)
```
await dynadot.deleteDomain('yourdomain.com')

// success
{ DeleteHeader: { SuccessCode: '0', Status: 'success' } }
{"DeleteHeader":{"SuccessCode":"1","Status":"grace_expired"}}

// errors
{"DeleteHeader":{"SuccessCode":"-1","Status":"error","Error":"could not find domain in your account"}}
{"DeleteHeader":{"SuccessCode":"-1","Status":"error","Error":"Please unlock your domain firstly."}}
{"DeleteHeader":{"SuccessCode":"-1","Status":"error","Error":"problem with connection to main server"}}
{"DeleteHeader":{"SuccessCode":"-1","Status":"error","Error":"connection to main server is busy"}}
{"DeleteHeader":{"SuccessCode":"-1","Status":"error","Error":"connection to main server is offline"}}

``` 

## getTransferAuthCode(domainName,new_code=false,unlock_domain_for_transfer=true)
```
await dynadot.getTransferAuthCode('yourdomain.com')
// success
{"GetTransferAuthCodeResponse":{"GetTransferAuthCodeHeader":{"SuccessCode":"0","Status":"success","AuthCode":"e478582Zu663762"}}}
//errors
{"GetTransferAuthCodeResponse":{"GetTransferAuthCodeHeader":{"SuccessCode":"-1","Status":"error","Error":"need api skip lock agreement for using unlock_domain_for_transfer tag."}}}
```

## renewDomain(domainName,durationYears=1)
```
await dynadot.renewDomain('yourdomain.com')
// success
{"RenewResponse":{"RenewHeader":{"SuccessCode":"0","Status":"success"},"RenewContent":{"Expiration":"1738627199000"}}}
// errors
{"RenewResponse":{"RenewHeader":{"SuccessCode":"-1","Status":"error","Error":"could not find domain in your account"}}}

```


