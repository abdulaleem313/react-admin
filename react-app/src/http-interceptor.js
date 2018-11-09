
const axios = require('axios');

axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token'); 
        // console.log(token)
        if (token) {
            // config.headers.Authorization = `Bearer ${token}`;
            config.headers.Authorization = token;
        }  
      return config;
    },
    error => Promise.reject(error)
  );

export default axios;