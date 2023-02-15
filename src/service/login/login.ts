import { oddRequest } from '..'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'
export function accountLoginRequest(account: IAccount) {
  return oddRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return oddRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: localCache.getCache(LOGIN_TOKEN)
    // } // 在拦截器那里认证
  })
}

export function getUserMenuById(id: number) {
  return oddRequest.get({
    url: `/role/${id}/menu`
    // headers: {
    //   Authorization: localCache.getCache(LOGIN_TOKEN)
    // } // 在拦截器那里认证
  })
}
