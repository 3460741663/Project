import fetch from './config'

// 获取活动列表
export function getActivity() {
    return fetch({
        url: '/activity_management/getActivityList?page=1',
        method: 'get'
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
