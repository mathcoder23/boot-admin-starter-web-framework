import {setToken, removeToken} from '@_framework/util/auth'
import {setStore, getStore} from '@_framework/util/store'
import {isURL, validatenull} from '@_framework/util/validate'


import webiste from '@_framework/config/website'
import {loginByUsername, getUserInfo, getMenu, getTopMenu, logout, refeshToken} from '@_framework/api/user'
import {MySecurity} from "../../util/security";
import {TreeUtil} from "../../util/TreeUtil";
import {FrameworkIoc} from "../../ioc/framework_ioc";

const menuFormatConvert = (pTree) => {
    return TreeUtil.eachTree(pTree, "children", (node) => {
        console.log('node', node)
        let cn = {
            label: node.data.name,
            path: node.data.menuPath,
            component: node.data.menuComponent,
            icon: node.data.menuIcon,
            meta: {
                i18n: node.data.name,
            }
        }
        return cn
    })
}


function addPath(ele, first) {
    const menu = webiste.menu;
    const propsConfig = menu.props;
    const propsDefault = {
        label: propsConfig.label || 'label',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children'
    }
    const icon = ele[propsDefault.icon];
    ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
    const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
    if (isURL(ele[propsDefault.path])) {
        ele[propsDefault.path] = ele[propsDefault.path].replace(/&/g, "$")
    }
    if (!isChild && first && !isURL(ele[propsDefault.path])) {
        ele[propsDefault.path] = ele[propsDefault.path] + '/index'
    } else {
        ele[propsDefault.children] && ele[propsDefault.children].forEach(child => {
            if (!isURL(child[propsDefault.path])) {
                child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path] ? child[propsDefault.path] : 'index'}`
            }
            addPath(child);
        })
    }

}

const user = {
    state: {
        userInfo: {},
        permission: {},
        roles: [],
        menuId: getStore({name: 'menuId'}) || [],
        menu: getStore({name: 'menu'}) || [],
        menuAll: getStore({name: 'menuAll'}) || [],
        token: getStore({name: 'token'}) || '',
    },
    actions: {
        //根据用户名登录
        LoginByUsername({commit}, userInfo) {
            const user = {
                username: MySecurity.hash(userInfo.username),
                password: MySecurity.hash(userInfo.password)
            }
            return new Promise((resolve) => {
                loginByUsername(user.username, user.password, userInfo.code, userInfo.redomStr).then(res => {
                    const data = res.data;
                    commit('SET_TOKEN', data.access_token);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    resolve();
                })

                // commit('SET_TOKEN', 'abcbbbbbb');
                // commit('DEL_ALL_TAG');
                // commit('CLEAR_LOCK');
                // resolve();
            })
        },
        //根据手机号登录
        LoginByPhone({commit}, userInfo) {
            return new Promise((resolve) => {
                loginByUsername(userInfo.phone, userInfo.code).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', data);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    resolve();
                })
            })
        },
        GetUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then((res) => {
                    const data = res.data.data;
                    commit('SET_USERIFNO', data.userInfo);
                    commit('SET_ROLES', data.roles);
                    commit('SET_PERMISSION', data.permission)
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        //刷新token
        RefeshToken({state, commit}) {
            return new Promise((resolve, reject) => {
                refeshToken(state.refeshToken).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', data);
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        LogOut({commit}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_MENUID', {})
                    commit('SET_MENUALL', []);
                    commit('SET_MENU', [])
                    commit('SET_ROLES', [])
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //注销session
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_MENUID', {})
                commit('SET_MENUALL', []);
                commit('SET_MENU', [])
                commit('SET_ROLES', [])
                commit('DEL_ALL_TAG');
                commit('CLEAR_LOCK');
                removeToken()
                resolve()
            })
        },
        GetTopMenu() {
            return new Promise(resolve => {
                getTopMenu().then((res) => {
                    const data = res.data.data || []
                    resolve(data)
                })
            })
        },
        //获取系统菜单
        GetMenu({commit}, parentId) {
            return new Promise(resolve => {
                FrameworkIoc.Api().genApi.AccountApi.getPermissionTree().then(rep => {
                    console.log('menu', rep.data)
                    let menu = menuFormatConvert(rep.data)
                    console.log('cm', menu)
                    menu.forEach(ele => {
                        addPath(ele, true);
                    })
                    commit('SET_MENU', menu)
                    resolve(menu)
                })

                // getMenu(parentId).then((res) => {
                //     const data = res.data.data
                //     let menu = deepClone(data);
                //     menu.forEach(ele => {
                //         addPath(ele, true);
                //     })
                //     commit('SET_MENU', menu)
                //     resolve(menu)
                // })
            })
        },
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            setToken(token)
            state.token = token;
            setStore({name: 'token', content: state.token, type: 'session'})
        },
        SET_MENUID(state, menuId) {
            state.menuId = menuId;
            setStore({name: 'menuId', content: state.menuId, type: 'session'})
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_MENUALL: (state, menuAll) => {
            state.menuAll = menuAll
            setStore({name: 'menuAll', content: state.menuAll, type: 'session'})
        },
        SET_MENU: (state, menu) => {
            state.menu = menu
            state.menuAll = menu
            setStore({name: 'menuAll', content: state.menuAll, type: 'session'})
            setStore({name: 'menu', content: state.menu, type: 'session'})
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSION: (state, permission) => {
            state.permission = {};
            permission.forEach(ele => {
                state.permission[ele] = true;
            });
        }
    }

}
export default user
