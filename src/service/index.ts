import ODDRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'
export const oddRequest = new ODDRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = token
      }
      return config
    },
    requestFailFn: (err) => {
      console.log('请求失败拦截')
      return err
    }
  }
})
// export const oddRequest1 = new ODDRequest({
//   baseURL: 'http://codercba.com:1888/airbnb/api',
//   timeout: 800,
//   interceptors: {
//     requestSuccessFn: (config) => {
//       console.log('abd 请求成功拦截')
//       return config
//     },
//     requestFailFn: (err) => {
//       console.log('abd 请求失败拦截')
//       return err
//     },
//     responseSuccessFn: (res) => {
//       console.log('abd 响应成功拦截')
//       return res
//     },
//     responseFailFn: (err) => {
//       console.log('abd 响应失败拦截')
//       return err
//     }
//   }
// })
