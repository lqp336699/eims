import Vue from 'vue'

import Cookies from 'js-cookie'
// a modern alternative to CSS resets
import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.scss'

// import LayoutPanel from '@/plugs/LayoutPanel'
// import '@/plugs/LayoutPanel/panel.css'

import VueAxios from 'vue-axios'
// import axios from 'axios'
import axios from '@/utils/service'

// // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
// import enLang from 'element-ui/lib/locale/lang/en'
// import jaLang from 'element-ui/lib/locale/lang/ja'
// global css
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'
import i18n from './lang/index'
// icon
import './icons'
// permission control
import './permission'
// error log
import './utils/error-log'
// global filters
import * as filters from './filters'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  // set element-ui default size
  size: Cookies.get('size') || 'medium'
  // 如果使用中文，无需设置，请删除
  // locale: enLang
})

// Vue.use(LayoutPanel);

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
// axios全局调用
Vue.prototype.$axios = axios // 全局注册，使用方法为:this.$axios
Vue.use(VueAxios, axios)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
