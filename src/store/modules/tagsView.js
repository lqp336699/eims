const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  // 添加访问视图
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  // 添加缓存视图
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  // 移除访问视图
  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  // 移除缓存视图
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  // 移除其他视图
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  // 移除其他缓存视图
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },
  // 移除左侧视图
  DEL_LEFT_VISITED_VIEWS: (state, view) => {
    // 从尾部起找到当前页，然后移除可关闭的页面
    let b = false
    for (let i = state.visitedViews.length - 1; i >= 0; i--) {
      const v = state.visitedViews[i]
      if (v.path === view.path) {
        b = true
      }
      if (!v.meta.affix && b && v.path != view.path) {
        state.visitedViews.splice(i, 1)
      }
    }
    // state.visitedViews = state.visitedViews.filter(v => {
    //   return v.meta.affix || v.path === view.path
    // })
  },
  // 移除左侧缓存视图
  DEL_LEFT_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    for (let i = index - 1; i >= 0; i--) {
      state.cachedViews.splice(i, 1)
    }
    // if (index > -1) {
    //   state.cachedViews = state.cachedViews.slice(index, index + 1)
    // } else {
    //   // if index = -1, there is no cached tags
    //   state.cachedViews = []
    // }
  },
  // 移除右侧视图
  DEL_RIGHT_VISITED_VIEWS: (state, view) => {
    for (let i = state.visitedViews.length - 1; i >= 0; i--) {
      const v = state.visitedViews[i]
      if (v.path === view.path) {
        return
      }
      if (!v.meta.affix) {
        state.visitedViews.splice(i, 1)
      }
    }
  },
  // 移除右侧缓存视图
  DEL_RIGHT_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    for (let i = state.cachedViews.length - 1; i > index; i--) {
      state.cachedViews.splice(i, 1)
    }
  },
  // 移除所有视图（能关闭的）
  DEL_ALL_VISITED_VIEWS: state => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  },
  // 更新访问视图（路径切换）
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

// 事务集
const actions = {
  // 添加页面
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  // 添加访问页面
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  // 添加缓存页面
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  // 移除页面
  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  // 移除访问页面
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  // 移除缓存页面
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
  // 移除其他页面
  delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  // 移除左侧页面
  delLeftViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delLeftVisitedViews', view)
      dispatch('delLeftCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  // 移除右侧页面
  delRightViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delRightVisitedViews', view)
      dispatch('delRightCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  // 移除其他访问页面
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  // 移除其他缓存页面
  delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },
  // 移除左侧访问页面
  delLeftVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_LEFT_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  // 移除左侧缓存页面
  delLeftCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_LEFT_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },
  // 移除右侧访问页面
  delRightVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_RIGHT_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  // 移除右侧缓存页面
  delRightCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_RIGHT_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },
  // 移除所有页面
  delAllViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  // 移除所有访问页面
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  // 移除所有缓存页面
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },
  // 更新访问页面
  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
