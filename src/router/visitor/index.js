/** 工艺管理 **/

import Layout from '@/layout'

const visitorRouter = {
  path: '/visitor',
  component: Layout,
  redirect: 'noRedirect',
  name: 'visitor',
  meta: {
    title: '访客预约',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/pages/visitor'),
      name: 'visitor',
      meta: { title: '访客预约'}
    }
  ]
}

export default visitorRouter
