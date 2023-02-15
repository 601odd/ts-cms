import { oddRequest } from '@/service'

interface IQueryInfo {
  offset: number
  size: number
  name?: ''
}
export function postUserList(queryInfo: IQueryInfo) {
  return oddRequest.post({
    url: '/users/list',
    data: queryInfo
    // {
    //   offset: queryInfo.offset,
    //   size: queryInfo.size
    // }
  })
}

export function deleteUserById(id: number) {
  return oddRequest.delete({
    url: `/users/${id}`
  })
}
export function newUserData(userInfo: any) {
  return oddRequest.post({
    url: '/users',
    data: userInfo
  })
}
export function patchUserById(id: number, userInfo: any) {
  console.log(id, userInfo)
  return oddRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
