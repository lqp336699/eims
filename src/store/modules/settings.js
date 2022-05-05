import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import storage from '@/utils/storage'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

// console.log("variables.theme的类型", typeof(variables.theme));

const state = {
  theme: storage.get('theme', variables.theme),
  showSettings: storage.get('showSettings', showSettings),
  tagsView: storage.get('tagsView', tagsView),
  fixedHeader: storage.get('fixedHeader', fixedHeader),
  sidebarLogo: storage.get('sidebarLogo', sidebarLogo)
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
      storage.set(key, value)
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

