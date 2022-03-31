// 获取STS Token
import {baseUrl} from "../../../config/env";

let OSS = require('ali-oss');
let prefix = ''
if(window.location.host === "10.0.0.166:8080"){
    prefix = 'test1-'
}
if(window.location.host === "10.0.0.166:8081"){
    prefix = 'test1-'
}
if(window.location.host === "10.0.0.166:8082"){
    prefix = 'test1-'
}
let ossClient = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'xxx',
    accessKeySecret: 'xxx',
    bucket:prefix+'bm-recourse-version'
});

let publicOssClient = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'xxx',
    accessKeySecret: 'xxx',
    bucket:prefix+'bm-resource-public'
});
// 普通上传
async function commonUpload(fileName,file,onProgress,onError) {
    if (!ossClient) {
        // await initOSSClient();
    }
    return ossClient.put(fileName, file, {
        progress: onProgress,
        bucket:'xxx-public-lib'
    }).then(result => {
        console.log(`Common upload ${file.name} succeeded, result === `, result)
        onProgress(1,null,result)
    }).catch(err => {
        console.log(`Common upload ${file.name} failed === `, err);
        onError()
    });
}
// 公开资源普通上传
async function publicUpload(fileName,file,onProgress,onError) {
    if (!ossClient) {
        // await initOSSClient();
    }
    return publicOssClient.put(fileName, file, {
        progress: onProgress,
        bucket:'test1-bm-resource-public'
    }).then(result => {
        console.log(`Common upload ${file.name} succeeded, result === `, result)
        onProgress(1,null,result)
    }).catch(err => {
        console.log(`Common upload ${file.name} failed === `, err);
        onError()
    });
}
export const AdOSSTool = {
    commonUpload:commonUpload,
    publicUpload:publicUpload,
}