let BASE_URL = ''
import.meta.env.DEV
import.meta.env.PORD
import.meta.env.SSR // 是否是服务端渲染 server side render

if (import.meta.env.MODE === 'production') {
  BASE_URL = 'http://152.136.185.210:4000'
} else BASE_URL = 'http://152.136.185.210:4000'
export { BASE_URL }
export const TIME_OUT = 1000
