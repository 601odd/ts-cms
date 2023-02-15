import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'

function LoadLocalRoutes() {
  const localRouters: RouteRecordRaw[] = []
  // 1.1 读取router/main所有文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    localRouters.push(files[key].default)
  }
  return localRouters
}

export let firstMenu: any = ''
export default function mapMenuToRoutes(userMenu: any) {
  //动态添加路由
  // 1. 获取菜单(userMenus)
  // 代码写在位置
  const localRouters = LoadLocalRoutes()
  // 2. 动态获取所有的路由对象，放到数组中 路由对象都在独立的文件中从文件中将所有路由对象先读取数组中
  // 3. 根据菜单去匹配正确的路由 router。addRoute(‘main‘，xxx)
  const routes: RouteRecordRaw[] = []
  for (const menus of userMenu) {
    for (const menu of menus.children) {
      const route = localRouters.find((item) => item.path === menu.url)
      if (route) {
        // 给一级菜单添加一个重定向 但是只加第一个子菜单
        if (!routes.find((item) => item.path === menus.url)) {
          routes.push({ path: menus.url, redirect: route.path })
        }
        routes.push(route)
      }

      if (!firstMenu && route) firstMenu = route
    }
  }
  return routes
}
export function mapPathToMenu(userMenu: any[], path: any) {
  for (const menus of userMenu) {
    for (const menu of menus.children) {
      if (path === menu.url) return menu
    }
  }
  return undefined
}

// 面包屑
interface IBreadcumbs {
  name: string
  path?: string
}
export function mapPathToBreadcrumb(userMenu: any[], path: any) {
  const breadcrumbs: IBreadcumbs[] = []
  for (const menus of userMenu) {
    for (const menu of menus.children) {
      if (path === menu.url) {
        breadcrumbs.push({ name: menus.name, path: menus.url })
        breadcrumbs.push({ name: menu.name, path: menu.url })
      }
    }
  }
  return breadcrumbs
}
// 默认
