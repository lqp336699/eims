/** 办公管理 **/

import Layout from '@/layout'

const officeRouter = {
  path: '/office',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Office',
  meta: {
    title: '办公管理(OA)',
    icon: 'chart'
  },
  children: [
    {
      path: 'TodoList',
      component: () => import('@/pages/office/TodoList'),
      name: 'TodoList',
      meta: { title: '任务列表', noCache: true, roles: ['manage'] }
    },
    {
      path: 'mail',
      component: () => import('@/pages/office/mail'),
      name: 'mail',
      meta: { title: '我的邮箱', noCache: true }
    },
    {
      path: 'memo',
      component: () => import('@/pages/office/memo'),
      name: 'memo',
      meta: { title: '备忘录', noCache: true }
    },
    {
      path: 'ContactBook',
      component: () => import('@/pages/office/ContactBook'),
      name: 'ContactBook',
      meta: { title: '通讯簿', noCache: true }
    },
  ]
}

export default officeRouter
