import { oddRequest } from '..'

export function getEntireRoles() {
  return oddRequest.post({
    url: '/role/list'
  })
}
export function getEntireDepartment() {
  return oddRequest.post({
    url: '/department/list'
  })
}
