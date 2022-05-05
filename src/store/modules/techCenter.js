import { get_kinds,get_proc_kinds } from '@/api/mytech'
const centerState = () => {
  return {
    kinds: [],
    proc_kinds:[],
    searchData:{}
  }
}

const state = centerState()

const actions = {
  getKinds({ commit }) {
    get_kinds().then(res => {
      commit('GET_KINDS', res)
    })
  },
  getProcKinds({ commit }) {
    get_proc_kinds().then(res => {
      commit('GET_PROC_KINDS', res)
    })
  },
  searchData({ commit },data){
    commit('SET_SEARCH_DATA', data)
  }
}

const mutations = {
  // 获取kinds
  GET_KINDS: (state, data) => {
    state.kinds = data
    console.log(state.kinds)
  },
  GET_PROC_KINDS: (state, data) => {
    state.kinds = data
    console.log(state.proc_kinds, '89894')
  },
  SET_SEARCH_DATA:(state,data)=>{
    state.searchData = data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
