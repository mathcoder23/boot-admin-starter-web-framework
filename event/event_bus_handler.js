import {LoadRemoteConfig} from "./load_remote_config";

const onPage = (vue) => {
    console.log('event bus handler : on page')

    // 加载配置
    LoadRemoteConfig.loadSiteConfig(vue)
}

const onAuth = (vue) => {
    console.log('event bus handler : on auth')
    LoadRemoteConfig.loadDictConfig(vue)
}

export const EventBusHandler = {
    onPage: onPage,
    onAuth: onAuth,
}