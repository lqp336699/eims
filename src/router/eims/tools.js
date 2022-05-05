/** 办公管理 **/

import Layout from '@/layout'

const toolsRouter = {
  path: '/tools',
  component: Layout,
  name: 'tools',
  meta: {
    title: '开发工具',
    icon: 'chart'
  },
  children: [
    {
      path: 'APItest',
      component: () => import('@/pages/tools/test'),
      name: 'APItest',
      meta: { title: 'API测试', noCache: true,  }
    },
    {
        path: 'APIdictionaries',
        component: () => import('@/pages/tools/dictionaries'),
        name: 'APIdictionaries',
        meta: { title: 'API字典', noCache: true,  }
      },
      {
        path: 'guanLi',
        component: () => import('@/pages/tools/guanLi'),
        name: 'APIguanLi',
        meta: { title: '项目接口管理', noCache: true,  },
      },
      {
        path: 'guanLi/edit',
        component: () => import('@/pages/tools/guanLi/components/edit.vue'),
        name: 'edit',
        meta: { title: '编辑'},
      },
      
  
  ]
}

export default toolsRouter
