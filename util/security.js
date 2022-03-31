import md5 from 'js-md5';
let Base64 = require('js-base64').Base64

let key = 'qTFX98r9Qvabsdfasdf8LV5D4YZ23'

let hash = (text)=>{
    // text = md5(text).toLowerCase()
    // text = md5(text+key).toLowerCase()
    // return Base64.encode('{md5}'+text)
    return text
}
export const MySecurity = {
    hash:hash
}