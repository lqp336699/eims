/** 工艺管理 **/

import Layout from '@/layout'

const techRouter = {
  path: '/tech',
  component: Layout,
  redirect: 'noRedirect',
  name: 'tech',
  meta: {
    title: '工艺管理',
    icon: 'chart'
  },
  children: [
    {
      path: 'center',
      component: () => import('@/pages/mytech/center'),
      name: 'ProdCenter',
      meta: { title: '工作中心', noCache: true, roles: ['manage'] }
    },
    {
      path: 'process',
      component: () => import('@/pages/mytech/process'),
      name: 'process',
      meta: { title: '生产工序', noCache: true }
    },
    {
      path: 'model',
      component: () => import('@/pages/mytech/model'),
      name: 'model',
      meta: { title: '加工机型', noCache: true }
    },
    {
      path: 'color',
      component: () => import('@/pages/mytech/color'),
      name: 'model',
      meta: { title: '色号管理', noCache: true }
    }
  ]
}

export default techRouter
