import axios from 'axios'
import qs from 'qs'
    // 对axios的封装
    let fetch = axios.create({
        baseURL: 'http://127.0.0.1:8090', // 这里是后端服务器地址
        credentials: 'include',// 即便是跨域，也携带cookie
        timeout: 5000 // request timeout
    })
    // 添加请求拦截器
    fetch.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
            if (typeof (config.data) !== 'string' && config.headers['Content-Type'] !== 'multipart/form-data') {
                config.data = qs.stringify(config.data)
            }
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
    // 添加响应拦截器
    fetch.interceptors.response.use(response => {
        // 对响应数据做点什么
        // 把响应字符串转换成JSON数据格式（后端数据请求造的孽）
        var reg = /([\w-.]+)/g;
        var temp = response.data.replace(reg, '"$1"')
        var result = temp.replace(/=/g, ":")
        response.data = JSON.parse(result);
        return response;
    }, error => {
        // 错误响应应该
        if (error.response) {
            if (error.response.status === 500) {
                console.log('服务器错误，请联系管理员处理')
            }
            return Promise.reject(error.response.data)
        } else {
            return Promise.reject(error)
        }
    })
export default fetch;
