var debug = require('debug')('dynadot')
var axios = require('axios')
var fs = require('fs')
var baseUrl = 'https://api.dynadot.com/api3.xml'
var parser = require('@7c/xml2json');

class dynadot {
    constructor(apikey) {
        this.apikey = apikey
        this.baseUrl=baseUrl+'?key='+apikey
    }

    doRequest(method,endpoint,data={},AdditionalAxiosOptions={}){
        var that = this
        return new Promise(async function (resolve,reject) {
            var { headers } = AdditionalAxiosOptions
            axios({
                method,
                url: that.baseUrl+endpoint,
                data,
                headers
            }).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    //https://api.dynadot.com/api3.xml?key=mykey&command=set_ns&domain=domain1.com,domain2.com&ns0=ns1.hostns.com&ns1=ns2.hostns.com
    setNameserver(domain,nameservers) {
        var that = this
        return new Promise(async function (resolve,reject) {
            var endPoint = `&command=set_ns&domain=${domain}&`+nameservers.map(function(n, idx) { return "ns"+(idx)+"="+n }).join('&')
            var got = await that.doRequest('get',endPoint)
            var json = parser.toJson(got,{object:true})
            resolve(json)
        })
    }

    listDomains() {
        var that = this
        return new Promise(async function (resolve,reject) {
            const endPoint = `&command=list_domain`
            const got = await that.doRequest('get',endPoint)
            const json = parser.toJson(got,{object:true})
            let ret = {}
            // aggregate
           for(const domain of json.ListDomainInfoResponse.ListDomainInfoContent.DomainInfoList.DomainInfo.Domain)
            {
                ret[domain.Name]={...domain}
            }
            resolve(ret)
        })
    }

    // https://api.dynadot.com/api3.xml?key=mykey&command=register&domain=domain1.net&duration=3&currency=USD
    registerDomain(domainName,durationYears, currency='USD',allowPremium=false) {
        return new Promise(async (resolve,reject) => {
            if (durationYears<1) return ('durationYears must be at least 1')
            let endPoint = `&command=register&domain=${domainName}&duration=${durationYears}&currency=${currency}`
            if (allowPremium===true) endPoint+='&allow_premium=1'
            const got = await this.doRequest('get',endPoint)
            const json = parser.toJson(got,{object:true})
            resolve(json.RegisterResponse)
        })
    }

    //https://api.dynadot.com/api3.xml?key=0&command=tld_price&currency=USD
    tldPrices(currency='USD') {
        return new Promise(async (resolve,reject) => {
            const endPoint = `&command=tld_price&currency=${currency}`
            const got = await this.doRequest('get',endPoint)
            const json = parser.toJson(got,{object:true})
            if (json.TldPriceResponse.TldPriceResponseHeader.SuccessCode!=="0") return reject(json)
            let ret = {}
            for(const tld of json.TldPriceResponse.TldPriceContent)
            {
                ret[tld.TldContent.Tld]=tld.TldContent
            }
            resolve(ret)
        })
    }

    //https://api.dynadot.com/api3.xml?key=mykey&command=delete&domain=domain1.com
    deleteDomain(domainName) {
        return new Promise(async (resolve,reject) => {
            const endPoint = `&command=delete&domain=${domainName}`
            const got = await this.doRequest('get',endPoint)
            const json = parser.toJson(got,{object:true})
            resolve(json.DeleteResponse)
        })
    }

    //https://api.dynadot.com/api3.xml?key=mykey&command=get_transfer_auth_code&domain=domian1.com&new_code=1&unlock_domain_for_transfer=1
    getTransferAuthCode(domainName,new_code=false,unlock_domain_for_transfer=true) {
        return new Promise(async (resolve,reject) => {
            let endPoint = `&command=get_transfer_auth_code&domain=${domainName}`
            if (new_code===true) endPoint+='&new_code=1'
            if (unlock_domain_for_transfer===true) endPoint+='&unlock_domain_for_transfer=1'

            const got = await this.doRequest('get',endPoint)
            const json = parser.toJson(got,{object:true})
            resolve(json)
        })
    }
}



module.exports = dynadot