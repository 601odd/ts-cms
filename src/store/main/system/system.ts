import { defineStore } from 'pinia'
import {
  deleteUserById,
  postUserList,
  newUserData,
  patchUserById
} from '@/service/main/system/system'
import type { ISystemState } from './type'

const useSystemStore = defineStore('ststem', {
  state: (): ISystemState => ({
    userList: [],
    userCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userList = await postUserList(queryInfo)
      const { list, totalCount } = userList.data
      this.userList = list
      this.userCount = totalCount
    },
    async deleteUserAction(id: number) {
      const deleteResult = await deleteUserById(id)
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      this.postUserListAction({ offset: 0, size: 10 }) //重新请求数据
      console.log(newResult)
    },
    async patchUserDataAcion(id: number, userInfo: any) {
      const patchResult = await patchUserById(id, userInfo)
      this.postUserListAction({ offset: 0, size: 10 })
      console.log(patchResult)
    }
  }
})
export default useSystemStore
