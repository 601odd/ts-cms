<template>
  <div class="acount">
    <el-form ref="formRef" :model="form" :rules="accountRules" status-icon label-width="60px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type FormRules, type ElForm, ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache';

const LOGIN_NAME = "name"
const LOGIN_PWD = "password"
const form = reactive<IAccount>({
  name: localCache.getCache(LOGIN_NAME) ?? '',
  password: localCache.getCache(LOGIN_PWD) ?? ''
})
const loginStore = useLoginStore()
const formRef = ref<InstanceType<typeof ElForm>>()
// 定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '输入账号信息', trigger: 'blur' },
    { min: 2, max: 11, message: '1-11位数', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码信息', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,}$/, //六位以上
      message: '密码必须是字母或者数字',
      trigger: 'blur'
    }
  ]
}

function loginAction(isKeepPassword: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = form.name
      const password = form.password
      loginStore.loginAccountAction({ name, password }).then((res) => {
        if (isKeepPassword) {
          localCache.setCache(LOGIN_NAME, name)
          localCache.setCache(LOGIN_PWD, password)
        } else {
          localCache.removeCache(LOGIN_NAME)
          localCache.removeCache(LOGIN_PWD)
        }
      })
    } else {
      ElMessage.error('验证失败 请重新输入')
    }
  })
}
defineExpose({ loginAction })
</script>
<style lang="less" scoped>

</style>
