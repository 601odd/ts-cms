import axios, { type AxiosResponse } from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestInterceptors, ODDRequestConfig } from './type'

class Request {
  // axios 实例
  instance: AxiosInstance
  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>
  // * 存放取消请求控制器Map
  abortControllerMap: Map<string, AbortController>

  constructor(config: ODDRequestConfig) {
    this.instance = axios.create(config)
    // * 初始化存放取消请求控制器Map
    this.abortControllerMap = new Map()
    this.interceptorsObj = config.interceptors
    // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => res,
      (err: any) => err
    )

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestSuccessFn,
      this.interceptorsObj?.requestFailFn
    )
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseSuccessFn,
      this.interceptorsObj?.responseFailFn
    )
    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        return res.data
      },
      (err: any) => err
    )
  }
  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestSuccessFn) {
        config = config.interceptors.requestSuccessFn(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
      // .finally(() => {})
    })
  }
  get<T = any>(config: RequestConfig) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: RequestConfig) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: RequestConfig) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: RequestConfig) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default Request
export { RequestConfig, RequestInterceptors }
