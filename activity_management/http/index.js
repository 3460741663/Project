import fetch from './config'
import QS from 'qs';

// 获取活动列表
export function getActivity(params) {
    return fetch({
        url: 'http://127.0.0.1:8090/activity_management/getActivityList',
        method: 'get',
        params
    })
}
// login
export function loginVerify(params){
    console.log('我是登录验证的方法！')
    return fetch({
        url:'http://127.0.0.1:8090/activity_management/login',
        method:'get',
        params
    })
}

// 获取与我相关的事务
export function Related(params) {
    console.log('获取与我相关！')
    return fetch({
        url:'http://127.0.0.1:8090/activity_management/Related',
        method: 'GET',
        params
    })
}

// 获取新闻数据
export function GetNews(){
    console.log('获取新闻数据！');
    return fetch({
        url:'http://localhost:3003/mapi/comment',
        method: 'GET'
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
