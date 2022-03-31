import {FrameworkIoc} from "../../ioc/framework_ioc";
import {PFApiConfig} from "../../api/config/config";

export const PfApiPlug = {
    init: (Vue) => {
        PFApiConfig.init()
        Vue.prototype.$api = FrameworkIoc.Api()
    }
}