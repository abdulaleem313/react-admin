import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR } from 'react-admin';

const axios = require('axios');

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        localStorage.setItem('username', username); 
        // http://52.52.236.205:4000/documentation#/
        return axios.post(`http://52.52.236.205:4000/api/users/login`, {
            "email": username,
            "password": password
        })
        .then( (response) => { 
            console.log('response', response);
            if (response.data.success)  {
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('zf_name', response.data.data.zf_name);
                return Promise.resolve()
            }else {
                return Promise.reject();
            }
        })
        .catch( (error) => { 
            console.log('error', error);
            return Promise.reject();
        })
        .then(function () {
            console.log('response1212'); 
        });
        
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        console.log(params)
        // return params.role == 'admin'
        // ? Promise.resolve()
        // : Promise.reject();
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unkown method');
};
