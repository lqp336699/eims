import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  userId: 0,
  sessionId: 0,
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  // SET_USERID: (state, userId) => {
  //   //console.log('存储用户ID', userId)
  //   state.userId = userId
  // },
  // SET_SESSIONID: (state, sessionId) => {
  //   state.sessionId = sessionId
  // },

  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(rsp => {
        console.log(rsp)
        const { success, result } = rsp
        //console.log('返回登录结果', rsp)
        if (success) {
          //console.log('返回result.Token', result.Token)
          // commit('SET_USERID', result.UserId)
          // commit('SET_SESSIONID', result.SessionId)
          sessionStorage.setItem('userId', result.UserId)
          sessionStorage.setItem('sessionId', result.SessionId)
          sessionStorage.setItem('token', result.Token)
          //TODO: 真实的Role由后台提供，当前为暧昧角色
          const data = { token: 'admin-token' }
          //console.log('token', data.token)
          commit('SET_TOKEN', data.token)
          setToken(data.token)
        }
        resolve(rsp)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      }
      const { roles, name, avatar, introduction } = data
      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      resolve(data)

      //       getInfo(state.token).then(response => {
      //         console.log("getInfo等到response", response);
      //         const { data } = response
      //         console.log("getInfo等到data", data);
      //         if (!data) {
      //           reject('Verification failed, please Login again.')
      //         }

      //         const { roles, name, avatar, introduction } = data
      // console.log("getInfo等到roles", roles);
      //         // roles must be a non-empty array
      //         if (!roles || roles.length <= 0) {
      //           reject('getInfo: roles must be a non-null array!')
      //         }

      //         commit('SET_ROLES', roles)
      //         commit('SET_NAME', name)
      //         commit('SET_AVATAR', avatar)
      //         commit('SET_INTRODUCTION', introduction)
      //         resolve(data)
      //       }).catch(error => {
      //         reject(error)
      //       })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    logout(state.token).then(() => {
      console.log('logout')
    })
    return new Promise(resolve => {
      console.log('退出登录')
      commit('SET_USERID', 0)
      commit('SET_SESSIONID', 0)
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      console.log('退出登录2')
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })
      console.log('退出登录3')
      resolve()
    })

    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     commit('SET_TOKEN', '')
    //     commit('SET_ROLES', [])
    //     removeToken()
    //     resetRouter()

    //     // reset visited views and cached views
    //     // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
    //     dispatch('tagsView/delAllViews', null, { root: true })

    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
