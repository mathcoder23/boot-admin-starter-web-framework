let _api

const initApi = (api) => {
    console.log('framework init api', api)
    _api = api
}

const getApi = () => {
    console.log('framework ioc get api:', _api)
    return _api
}

export const FrameworkIoc = {
    initApi: initApi,
    Api: getApi
}