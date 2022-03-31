import {PFApi} from "../core/core";
import {PFAuth} from "../core/auth";

let loginByUsername = (data) => {
    data["grant_type"] = "username"
    data["client_id"] = "username"
    data["client_secret"] = "123456"
    return PFApi.apiPost({
        uri: '/oauth/token',
        meta: {
            isLogin: true
        }
    }, null, data)
}
let refreshToken = () => {
    let refreshToken = PFAuth.getRefreshToken()
    if (null === refreshToken) {
        return
    }
    data["grant_type"] = "refresh_token"
    data["refresh_token"] = refreshToken
    return PFApi.apiPost({
        uri: '/oauth/token'
    }, data)
}
let logout = () => {

}
export const UserApi = {
    loginByUsername: loginByUsername
}