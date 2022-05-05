import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

// Axios封装
const service = axios.create({
  baseURL: 'http://subot.tpddns.cn:9091/', // http://subot.tpddns.cn:9092/
  timeout: 5000 // request timeout
})

// service.defaults.baseURL = 'http://subot.tpddns.cn:9092/';

service.interceptors.request.use(
  config => {
    const token = sessionStorage.token
    //console.log("token", token)
    if (token) {
      config.headers.common['Authorization'] = token
    }
    return config
  },
  error => {
    return Promise.error(error)
  })

service.interceptors.response.use(
  response => {
    // if (response.data.code == 4) {
    //     sessionStorage.clear();
    //     localStorage.setItem('ms_username', null);
    // }
    if (response.status === 200) {
      return response.data
    } else {
      Message({
        message: response.data || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      Promise.reject()
      console.log(response)
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    console.log(error)
    return Promise.reject()
  }
)

export default service
