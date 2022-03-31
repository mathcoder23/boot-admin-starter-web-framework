import {
    iconfontUrl,
    iconfontVersion
} from '@_framework/config/env';
import {loadStyle} from "../../util/util";

export const IconfontPlug = {
    init:(Vue)=>{
        // 加载相关url地址
        Object.keys(iconfontUrl).forEach(key => {
            Vue.prototype[key] = iconfontUrl[key];
        })

// 动态加载阿里云字体库
        iconfontVersion.forEach(ele => {
            loadStyle(iconfontUrl.replace('$key', ele));
        })
    }
}