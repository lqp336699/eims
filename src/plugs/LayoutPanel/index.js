// 布局面板组件
import panel from './panel.vue'
import content from './content.vue'
import sider from './side.vue'

const components = {
  panel,
  content,
  sider
}

const install = function (Vue) {
  for (let key in components) {
    Vue.component(components[key].name, components[key])
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(Window.vue)
}

components.install = install

export default components
