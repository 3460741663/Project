import fetch from './config'
import QS from 'qs';

// 获取活动列表
export function getActivity(params) {
    return fetch({
        url: '/getActivityList',
        method: 'get',
        params
    })
}
// login
export function loginVerify(params){
    console.log('我是登录验证的方法！')
    return fetch({
        url:'/login',
        method:'get',
        params
    })
}

// 获取与我相关的事务
export function Related(params) {
    console.log('获取与我相关！')
    return fetch({
        url:'/Related',
        method: 'GET',
        params
    })
}


// export function apiGetData() {
//     return fetch({
//         url: '/api/data/menu-list',
//         method: 'get'
//     })
// }

// // 登录校验
// export function apiLogin(params) {
//     return fetch({
//         url: '/api/login/validate',
//         method: 'get',
//         params
//     })
// }
