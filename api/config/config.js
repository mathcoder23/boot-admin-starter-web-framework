import {PFApi} from "../core/core";
import {baseUrl} from '@_framework/config/env';
import axios from 'axios'
import {PFAuth} from "../core/auth";

/**
 * 初始化PFApi核心配置
 */
PFApi.init(baseUrl, axios)

/**
 * token url white
 * @type {{init: PFApiConfig.init}}
 */
PFAuth.urlList = ['/oauth/*']

export const PFApiConfig = {
    init: () => {
        console.log('PFAPI init ok! baseUrl:' + baseUrl)
    }
}