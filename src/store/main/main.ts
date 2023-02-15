import { getEntireDepartment, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const departmentResult = await getEntireDepartment()
      const RolesResult = await getEntireRoles()
      this.entireRoles = RolesResult.data.list
      this.entireDepartments = departmentResult.data.list
    }
  }
})
export default useMainStore
