import {PfApiPlug} from "./config/pf_api_plug";
import {VuePlug} from "./config/vue_plug";
import {StylePlug} from "./config/style_plug";
import {IconfontPlug} from "./config/iconfont_plug";

const init = (Vue) => {

    VuePlug.init(Vue)

    PfApiPlug.init(Vue)

    StylePlug.init(Vue)

    IconfontPlug.init(Vue)

}
export const Plugs = {
    init: init

}