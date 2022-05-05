vscode快捷键：

    按下ctrl+K,再按下ctrl+S,查看快捷键列表。
    按下ctrl+P,弹出搜索栏,直接输入关键字,在所有文件中搜索特定符号: 在所有文件内搜索"employee"关键字 在搜索栏前输入”@“,在当前文件中搜索特定符号: 在当前打开文件中搜索”employee“关键字 在搜...

generate:生成



响应式：layout
    1：判断是否为手机端或桌面端
    mixin/ResizeHandler：
    window.addEventListener('resize', this.$_resizeHandler)
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
        $_isMobile() {
        const rect = body.getBoundingClientRect()
        console.log(rect,"rect")
        // Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
        return rect.width - 1 < WIDTH//返回布尔值，窗口大小是否大于992
        },
    store.dispatch('app/toggleDevice', 'mobile')//切换设备为手机

    2：使用layout布局 el-row el-col xs sm lg

    3:具体样式使用@media


管理员与普通用户权限


    1.dashboard:显示不同的组件

    <component :is="currentRole" />
    currentRole: "adminDashboard",
    this.currentRole = "editorDashboard"; //是否为管理员

    2.配置不同用户可以查看的页面


    mock role:
    const constantRoutes 
    const asyncRoutes
    const roles = [
        {
            key: 'admin',
            name: 'admin',
            description: 'Super Administrator. Have access to view all pages.',
            routes: routes
        },
        {
            key: 'editor',
            name: 'editor',
            description: 'Normal Editor. Can see all pages except permission page',
            routes: routes.filter(i => i.path !== '/permission')// just a mock
        },
        {
            key: 'visitor',
            name: 'visitor',
            description: 'Just a visitor. Can only see the home page and the document page',
            routes: [{
            path: '',
            redirect: 'dashboard',
            children: [
                {
                path: 'dashboard',
                name: 'Dashboard',
                meta: { title: 'dashboard', icon: 'dashboard' }
                }
            ]
            }]
        }
        ]
    permission.vue:
    async getRoutes() {},
    page.vue:
    this.$router.push({ path: '/permission/index?' + +new Date() })
    

    router index.vue:



this.$nextTick()
    当数据被修改后使用这个方法，会回调获取更新后的dom再渲染出来

