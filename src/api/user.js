import axios from '@/utils/service'
import request from '@/utils/request'

export function login(data) {

  // return request({
  //   url: 'vue-element-admin/user/login',
  //   method: 'post',
  //   data
  // })

  return axios({
    url: 'api/auth/login',
    method: 'post',
    data: {
      name: data.username,
      pswd: data.password
    }
  })
}

export function getInfo(token) {
  // return request({
  //   url: '/vue-element-admin/user/info',
  //   method: 'get',
  //   params: { token }
  // })
  const result = {
    code: 20000,
    data: {
      roles: ['admin'],
      introduction: 'I am a super administrator',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    }
  }
  return result
}

export function logout() {
  // return request({
  //   url: '/vue-element-admin/user/logout',
  //   method: 'post'
  // })
  //console.log('调用logout')
  return axios({
    url: '/api/auth/logout/' + sessionStorage.sid,
    method: 'get'
  })
}
