import {PFAuth} from "../api/core/auth";

/**
 * null 表示无token，token存在并不代表token一定可用，但是一般是可用的，因为和服务端的过期时间是一致的。
 * @returns {*}
 */
export function getToken() {
    return PFAuth.getToken()
}

/**
 * 标准的oauth2响应格式，在保存时会根据过期时间计算过期
 * @param data
 */
export function setToken(data) {
    return PFAuth.saveToken(data)
}

export function removeToken() {
    return PFAuth.removeToken()
}