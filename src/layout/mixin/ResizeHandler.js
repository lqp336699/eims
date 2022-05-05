import store from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)//添加窗口监听事件
    console.log('处理窗口缩放时要处理的逻辑操作！');
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)//移除监听事件
  },
  mounted() {
    const isMobile = this.$_isMobile()
    console.log(isMobile,"isMobile")
    if (isMobile) {//是的话
      store.dispatch('app/toggleDevice', 'mobile')//切换设备为手机
      store.dispatch('app/closeSideBar', { withoutAnimation: true })//关闭侧边栏
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      console.log(rect,"rect")
      // Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
      return rect.width - 1 < WIDTH//返回布尔值，窗口大小是否大于992
    },
    $_resizeHandler() {
      console.log('处理窗口缩放时要处理的逻辑操作！');
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
