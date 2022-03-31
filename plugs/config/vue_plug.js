import router from "../../router/router";
import Element from "element-ui";
import i18n from "../../lang/index";
import VueAxios from "vue-axios";
import Avue from "@smallwei/avue/lib/avue.min";
import axios from "../../router/axios";
import '@smallwei/avue/lib/index.css';


import '../../permission'; // 权限
import '../../error'; // 日志
import '../../cache';//页面缓冲

export const VuePlug = {
    init: (Vue)=>{
        Vue.use(router)
        Vue.use(VueAxios, axios)
        Vue.use(Element, {
            i18n: (key, value) => i18n.t(key, value),
            size: 'small', zIndex: 19950
        })
        Vue.use(Avue, {
            i18n: (key, value) => i18n.t(key, value)
        })
        Vue.config.productionTip = false;
    }
}