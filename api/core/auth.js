
let checkUrlAuth = (config)=>{
    let isAuth = true
    for(let rule of PFAuth.urlList){
        let reg = new RegExp(rule)
        isAuth = !reg.test(config.url)
        if(!isAuth){
            break;
        }
    }
    return isAuth
}

let getToken = (config)=>{
    let auth = localStorage.getItem('auth')
    if("string" === typeof auth){
        try{
            auth = JSON.parse(auth)
        }catch{
            localStorage.removeItem("auth")
            return null
        }
        let expiresTime = auth.expires_time || 0
        if(expiresTime>new Date().getTime()){
            return auth.access_token || null
        }
    }
    return null
}
let getRefreshToken = (config)=>{
    let auth = localStorage.getItem('auth')
    if("string" === typeof auth){
        try{
            auth = JSON.parse(auth)
        }catch{
            localStorage.removeItem("auth")
            return null
        }
        let expiresTime = auth.expires_time || 0
        if(expiresTime>new Date().getTime()){
            return auth.refresh_token || null
        }
    }
    return null
}
let saveToken = (data)=>{
    if("object" !== typeof data){
        return
    }
    console.log('save token',data)
    data.expires_time = data.expires_in*1000+new Date().getTime()
    localStorage.setItem("auth",JSON.stringify(data))
}
let removeToken = ()=>{
    localStorage.removeItem("auth")
}
export const PFAuth = {
    urlList:[],//正则，匹配的url不需要token
    // 檢查url是否需要權限
    checkUrlAuth:checkUrlAuth,
    getToken:getToken,
    removeToken:removeToken,
    getRefreshToken:getRefreshToken,
    saveToken:saveToken
}
