const localDictList = {
    local_Enable: [
        {label: '开启', value: true},
        {label: '关闭', value: false}
    ]
}

export const commonConfig = {
    state: {
        publicWebConfig: {},
        dictList: {}
    },
    mutations: {
        SET_PUBLIC_WEB_CONFIG: (state, value) => {
            state.publicWebConfig = value
            console.log('SET_PUBLIC_WEB_CONFIG', value)
        },
        SET_DICT_LIST: (state, dictList) => {
            state.dictList = Object.assign(dictList, localDictList)
            console.log('SET_DICT_LIST', state.dictList)

        }
    }
}