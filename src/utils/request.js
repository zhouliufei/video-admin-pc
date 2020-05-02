import axios from 'axios';
import route from '../router/index'

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    changeOrigin: true,
    baseURL: 'http://127.0.0.1:8080/api',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export function get (url, params = {}) {
    let userInfo = localStorage.getItem('userInfo');
    if(userInfo != undefined && userInfo != null && userInfo != '') {
        userInfo = JSON.parse(userInfo);
    }
    return new Promise((resolve, reject) => {
        service({
            url: url,
            method: 'get',
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'userKey': userInfo?userInfo.username:userInfo,
                'token':userInfo?userInfo.token:userInfo
            },
            params: params
        }).then(response => {
            if(403 == response) {
                var userInfo = localStorage.getItem("userInfo");
                if(userInfo == undefined || userInfo == null || userInfo == '') {
                    route.push('/login');
                } else {
                    route.push('/403');
                }
                return;
            }
            else {
                resolve(response)
            }
        }).catch(error => {
            reject(error)
        })
    })
}

/*
 *  post请求
 *  url:请求地址
 *  params:参数
 * */
export function post (url, params = {}) {
    let userInfo = localStorage.getItem('userInfo');
    if(userInfo != undefined && userInfo != null && userInfo != '') {
        userInfo = JSON.parse(userInfo);
    }
    return new Promise((resolve, reject) => {
        service({
            url: url,
            method: 'post',
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'userKey': userInfo?userInfo.username:userInfo,
                'token':userInfo?userInfo.token:userInfo
            },
            data: params
        }).then(response => {
            if(403 == response) {
                var userInfo = localStorage.getItem("userInfo");
                if(userInfo == undefined || userInfo == null || userInfo == '') {
                    route.push('/login');
                } else {
                    route.push('/403');
                }
                return;
            }
            else {
                resolve(response)
            }
        }).catch(error => {
            reject(error)
        })
    })
}

/*
 *  文件上传
 *  url:请求地址
 *  params:参数
 * */
export function fileUpload (url, params = {}) {
    let userInfo = localStorage.getItem('userInfo');
    if(userInfo != undefined && userInfo != null && userInfo != '') {
        userInfo = JSON.parse(userInfo);
    }
    return new Promise((resolve, reject) => {
        service({
            url: url,
            method: 'post',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data',
                'userKey': userInfo?userInfo.username:userInfo,
                'token':userInfo?userInfo.token:userInfo
            }
        }).then(response => {
            if(403 == response) {
                var userInfo = localStorage.getItem("userInfo");
                if(userInfo == undefined || userInfo == null || userInfo == '') {
                    route.push('/login');
                } else {
                    route.push('/403');
                }
                return;
            }
            else {
                resolve(response)
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export default {
    get,
    post,
    fileUpload,
}


