<template>
  <div class="home">
    <el-dialog v-model="centerDialogVisible" :title="isNewRef ? '新建用户' : '编辑用户'" width="30%" center>
      <div class="form">
        <el-form :model="formData" size="large" label-width="100px">
          <el-form-item label=" 用户名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label=" 真实姓名" prop="name">
            <el-input v-model="formData.name" palceholder="请输入真实姓名" />
          </el-form-item>

          <el-form-item v-if="isNewRef" label=" 密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" palceholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width:100%;">
              <template v-for=" item in entireRoles" :key="item.name">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>

          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width:100%;">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue';
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia';
import useSystemStore from '@/store/main/system/system';
const centerDialogVisible = ref(false)

const formData = reactive<any>({
  realname: '',
  name: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
// 获取roles department数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)
const isNewRef = ref(false)
const editData = ref()

// 定义model显示的方法 新建表单 编辑
function setModalVisible(isNew: boolean = true, itemData?: any) {
  centerDialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) { //编辑按钮
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData //保存数据
  } else { //新建
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}


function handleConfirmClick() {
  centerDialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    systemStore.patchUserDataAcion(editData.value.id, formData)
  } else {
    systemStore.newUserDataAction(formData)
  }

}
defineExpose({ setModalVisible })
</script>
<style lang="less" scoped>
el-input::placeholder {
  color: red;
  font-size: 22px;
}
</style>
