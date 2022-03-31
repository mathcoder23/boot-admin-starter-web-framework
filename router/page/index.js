import Layout from '@_framework/page/index/'
export default [{
    path: '/login',
    name: '登录页',
    component: () =>
        import( /* webpackChunkName: "page" */ '@_framework/page/login/index'),
    meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
    }
},
{
    path: '/lock',
    name: '锁屏页',
    component: () =>
        import( /* webpackChunkName: "page" */ '@_framework/page/lock/index'),
    meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
    }
},
{
    path: '/404',
    component: () =>
        import( /* webpackChunkName: "page" */ '@_framework/components/error-page/404'),
    name: '404',
    meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
    }

},
{
    path: '/403',
    component: () =>
        import( /* webpackChunkName: "page" */ '@_framework/components/error-page/403'),
    name: '403',
    meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
    }
},
{
    path: '/500',
    component: () =>
        import( /* webpackChunkName: "page" */ '@_framework/components/error-page/500'),
    name: '500',
    meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
    }
},
{
    path: '/',
    name: '主页',
    redirect: '/wel'
},
{
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    children: [{
        path: ":routerPath",
        name: 'iframe',
        component: () =>
            import( /* webpackChunkName: "page" */ '@_framework/components/iframe/main'),
        props: true
    }]

},
{
    path: '*',
    redirect: '/404'
}
]