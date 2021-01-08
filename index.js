var debug = require('debug')('dynadot')
var axios = require('axios')
var fs = require('fs')
var baseUrl = 'https://api.dynadot.com/api3.xml'
var parser = require('xml2json');

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
            var endPoint = `&command=list_domain`
            var got = await that.doRequest('get',endPoint)
            var json = parser.toJson(got,{object:true})
            var ret = {}
            // aggregate
           for(var domain of json.ListDomainInfoResponse.ListDomainInfoContent.DomainInfoList.DomainInfo)
            {
                ret[domain.Domain.Name]=domain.Domain
            }
            resolve(ret)
        })
    }
}



module.exports = dynadot