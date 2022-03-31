import Vue from 'vue';
import App from './App';
import router from './router/router';

import {Plugs} from "./plugs/plugs";
import store from './store/index';
import i18n from "./lang/index";


export const Framework = {
    run:()=>{
        // 统一插件初始化
        Plugs.init(Vue)

        window.MyVue = new Vue({
            router,
            store,
            i18n,
            render: h => h(App)
        }).$mount('#app')
    }
}