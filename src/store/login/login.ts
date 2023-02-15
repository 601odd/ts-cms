import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenuById } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constant'
import mapMenuToRoutes, { firstMenu } from '@/utils/map-menu'
import useMainStore from '../main/main'
interface ILogin {
  token: string
  userInfo: any
  userMenu: any
}
const USER_INFO = 'userInfo'
const USER_MENU = 'userMenu'
const useLoginStore = defineStore('login', {
  state: (): ILogin => ({
    userInfo: {},
    token: '',
    userMenu: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginRes = await accountLoginRequest(account)
      const id = loginRes.data.id
      this.token = loginRes.data.token
      // const name = loginRes.data.name
      localCache.setCache(LOGIN_TOKEN, this.token)

      //获取个人用户信息
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data

      //获取用户菜单
      const UserMenuResult = await getUserMenuById(this.userInfo.role.id)
      this.userMenu = UserMenuResult.data

      // 持久化储存
      localCache.setCache(USER_INFO, this.userInfo)
      localCache.setCache(USER_MENU, this.userMenu)

      // 请求roles department数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      //跳转到main
      router.push(firstMenu)
    },

    async loadLocalCacheAction() {
      const userInfo = localCache.getCache(USER_INFO)
      const token = localCache.getCache(LOGIN_TOKEN)
      const userMenu = localCache.getCache(USER_MENU)
      if (userInfo && token && userMenu) {
        this.userInfo = userInfo
        this.token = token
        this.userMenu = userMenu
      }
      // 1. 请求roles department数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      //2. 动态添加路由
      const routes = mapMenuToRoutes(this.userMenu)
      routes.forEach((route) => router.addRoute('main', route))
    }
  }
})

export default useLoginStore
