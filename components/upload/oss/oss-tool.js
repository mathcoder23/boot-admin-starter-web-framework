// 获取STS Token
let OSS = require('ali-oss');

let ossClient = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'xx',
    accessKeySecret: 'xx',
    bucket:'xx-xx-version'
});

// 普通上传
async function commonUpload(fileName,file,onProgress,onError) {
    if (!ossClient) {
        // await initOSSClient();
    }
    return ossClient.put(fileName, file, {
        progress: onProgress,
        bucket:'xx-public-lib'
    }).then(result => {
        console.log(`Common upload ${file.name} succeeded, result === `, result)
        onProgress(1,null,result)
    }).catch(err => {
        console.log(`Common upload ${file.name} failed === `, err);
        onError()
    });
}

// 分片上传
async function multipartUpload(file,onProgress,onError) {
    if (!ossClient) {
        // await initOSSClient();
    }
    const fileName = file.name;
    return ossClient.multipartUpload(fileName, file, {
        partSize:1024*100,
        progress: onProgress
    }).then(result => {
        // 生成文件下载地址
       console.log(result)
    }).catch(err => {
        console.log(`Multipart upload ${file.name} failed === `, err);
        onError()
    });
}
export const OSSTool = {
    commonUpload:commonUpload,
    multipartUpload:multipartUpload
}