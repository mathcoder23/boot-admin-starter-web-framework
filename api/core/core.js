import NProgress from "nprogress";
import {PFAuth} from "./auth";
import {Message} from "element-ui";

let request = null
let axios = null
const qsString = (params, init = 0) => {
    let qs = ""
    if ("object" === typeof params) {
        qs = init === 0 ? "?" : ''
        let count = 0
        for (let p in params) {
            if (typeof params[p] === "number" ||
                typeof params[p] === "boolean" ||
                typeof params[p] === "string") {
                if (count === 0) {
                    count++
                    qs += p + "=" + params[p]
                } else {
                    qs += "&" + p + "=" + params[p]
                }
            }
        }
    }
    return qs
}
/**
 * 处理前端空格提交数据的问题,以及删除空字符串的属性
 * @param obj
 * @returns {string|*}
 */
const trimSubmit = (obj) => {
    if (typeof obj === 'string') {
        return obj.trim()
    } else if (typeof obj === 'object') {
        const fields = Object.keys(obj)
        for (const field of fields) {
            if (field.indexOf("_") === 0 || field.indexOf("$") === 0) {
                delete obj[field]
            }
        }
        for (const index in obj) {
            if (typeof obj[index] === 'undefined') {
                delete obj[index]
            } else if (typeof obj[index] === 'string') {
                obj[index] = obj[index].trim()
                if (obj[index].length === 0 || obj[index] === 'undefined') {
                    delete obj[index]
                }
            }
        }
    }
    return obj
}


let init = (url, ax) => {
    PFApi.url = url
    axios = ax
    if (axios == null) {
        console.error('请配置axios')
    }
    // axios.defaults.retry = 4;
    // axios.defaults.retryDelay = 1000;
    request = axios.create({
        baseURL: PFApi.url,
        timeout: 30000,
        // responseType: 'json',
        // validateStatus:()=>{return true}
    });
    PFApi.request = request


    //HTTPrequest拦截
    request.interceptors.request.use(config => {
        console.log('request', config)
        NProgress.start() // start progress bar
        const meta = (config.meta || {});
        let auth = PFAuth.checkUrlAuth(config)
        if (true === auth && (!config.params || !config.params.pfPublic)) {
            let token = PFAuth.getToken(config)
            if (null === token) {
                //login
                localStorage.clear()
                delCookie()
                window.location.reload()
            } else {
                config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
            }
        }

        return config
    }, error => {
        return Promise.reject(error)
    });

    //响应拦截
    request.interceptors.response.use(res => {
        console.log('response', res)
        NProgress.done()

        const status = Number(res.status) || 200;
        const message = res.data.msg || res.data.errmsg || '未知错误';
        //如果是401则跳转到登录页面
        if (status === 401 || res.data.code === 401) {
            //login
            localStorage.clear()
            delCookie()
            window.location.reload()
        }
        // 如果请求为非200否者默认统一处理
        if (status !== 200 || res.data.code !== 0) {
            Message({
                message: message,
                type: 'error'
            })
            return Promise.reject(new Error(message))
        }
        if (res.config.meta && res.config.meta.isLogin === true) {
            if (res.data.code === 0) {
                PFAuth.saveToken(res.data.data)
            }
        }
        return res.data;
    }, error => {
        NProgress.done()

        return Promise.reject(new Error(error));
    })


}

const apiPost = (config, data, params) => {
    return new Promise((resolve, reject) => {
        let conf = {method: "post"}
        if (typeof config === "string") {
            conf.url = config
        } else {
            conf.url = config.uri
        }
        conf.params = params
        conf.data = data
        conf.meta = Object.assign({flag: 'apiPost'}, config.meta)

        request(conf).then(rep => resolve(rep)).catch(err => {
            reject(err)
        })
    })

}
const apiRequest = (config) => {
    if (config.data) {
        config.data = trimSubmit(config.data)
    }
    if (config.params) {
        config.params = trimSubmit(config.params)
    }
    return request(config)
}
const apiFormPost = (config, data, params) => {
    return new Promise((resolve, reject) => {
        let conf = {method: "post"}
        if (typeof config === "string") {
            conf.url = config
        } else {
            conf.url = config.uri
        }
        // if(typeof params !== "undefined" && params !== null){
        //     conf.url = conf.url+qsString(params)
        //     conf.params = params
        // }
        conf.params = params
        conf.data = qsString(data, 1)
        conf.meta = Object.assign({flag: 'apiPost'}, config.meta)
        conf.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        request(conf).then(rep => resolve(rep)).catch(err => {
            reject(err)
        })
    })

}
const apiPut = (config, params, data) => {
    return new Promise((resolve, reject) => {
        let conf = {method: "put"}
        if (typeof config === "string") {
            conf.url = config
        } else {
            conf.url = config.uri
        }
        conf.url = conf.url + qsString(params)
        conf.data = data
        conf.params = params
        request(conf).then(rep => resolve(rep)).catch(err => {
            reject(err)
        })
    })

}
const apiDel = (config, params, data) => {
    return new Promise((resolve, reject) => {
        let conf = {method: "delete"}
        if (typeof config === "string") {
            conf.url = config
        } else {
            conf.url = config.uri
        }
        conf.url = conf.url + qsString(params)
        conf.data = data
        conf.params = params
        request(conf).then(rep => resolve(rep)).catch(err => {
            reject(err)
        })
    })

}
const apiGet = (config, params) => {
    return new Promise((resolve, reject) => {
        let conf = {method: "get"}
        if (typeof config === "string") {
            conf.url = config
        } else {
            conf.url = config.uri
        }
        // conf.url = conf.url+qsString(params)
        conf.params = params
        request(conf).then(rep => resolve(rep)).catch(err => {
            reject(err)
        })
    })

}
const apiList = (config, params) => {
    return new Promise((resolve, reject) => {
        let conf = {method: "get"}
        if (typeof config === "string") {
            conf.url = config
        } else {
            conf.url = config.uri
        }
        // conf.url = conf.url+qsString(params)
        conf.params = params
        request(conf).then(rep => resolve(rep)).catch(err => {
            reject(err)
        })
    })

}

//兼容
const apiUpload = (config, data, params) => {
    return new Promise((resolve, reject) => {
        let conf = {method: "post"}
        if (typeof config === "string") {
            conf.url = config
        } else {
            conf.url = config.uri
        }
        conf.headers = {
            'Content-Type': 'multipart/form-data'
        }
        // conf.data = data
        // conf.params = params
        request.post(conf.url, data, conf).then(rep => resolve(rep)).catch(err => {
            reject(err)
        })
    })
}
/**
 * 目前暂定api接口返回的都是数据，逻辑分离的。即resolve返回数据，当状态码异常在reject中
 * @type {{init: init, request: null, driver: null, intercept: null, notify: null, url: null, apiList: (function(*=, *=): Promise<any>), apiGet: (function(*=, *=): Promise<any>), apiPost: (function(*=, *=, *): Promise<any>), apiPut: (function(*=, *=, *): Promise<any>), apiDel: (function(*=, *=, *): Promise<any>)}}
 */
export const PFApi = {
    init: init,
    request: null,
    driver: null,
    intercept: null,
    notify: null,
    url: null,
    isDev: false,
    apiList: apiList,
    apiGet: apiGet,
    apiUpload: apiUpload,
    apiFormPost: apiFormPost,
    apiPost: apiPost,
    apiRequest: apiRequest,
    apiPut: apiPut,
    apiDel: apiDel
}
