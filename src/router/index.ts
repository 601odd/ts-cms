import {
  createRouter,
  createWebHashHistory,
  type RouteRecord,
  type RouteRecordRaw
} from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'
import { firstMenu } from '@/utils/map-menu'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/main.vue'),
      name: 'main'
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ]
})

// const localRouters = [
//   {
//     path: '/main/analysis/dashboard',
//     component: () => import('../views/main/analysis/dashboard/dashboard.vue')
//   },
//   {
//     path: '/main/analysis/overview',
//     component: () => import('../views/main/analysis/overview/overview.vue')
//   }
// ]

// router.addRoute('main', localRouters[0])

//to 跳转到的位置 from 从哪里跳转过来
// return 决定导航的路径

router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) return '/login'

  if (to.path === '/main') {
    return firstMenu.path
  }
})
export default router
