<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>

    <el-tabs type="border-card" stretch v-model="activeName">
      <!-- 中间tab切换 -->

      <el-tab-pane label="账号登录" name="account">
        <template #label>
          <div class="label">
            <el-icon>
              <UserFilled />
            </el-icon>
            <span class="text">账号登录</span>
          </div>
        </template>
        <accountPanel ref="accountRef"></accountPanel>
      </el-tab-pane>

      <el-tab-pane label="手机登录" name="phone">
        <template #label>
          <div class="label">
            <el-icon>
              <Iphone />
            </el-icon>
            <span class="text">手机登录</span>
          </div>
        </template>
        <phone-panel></phone-panel>
      </el-tab-pane>
    </el-tabs>

    <div class="control">
      <el-checkbox v-model="isKeepPassword" size="large">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handelLoginBtnClick">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import phonePanel from './phone-panel.vue'
import accountPanel from './account-panel.vue'
import { localCache } from '@/utils/cache';

const activeName = ref('account')
const isKeepPassword = ref<boolean>(Boolean(localCache.getCache('isKeepPassword')) ?? false)
const accountRef = ref<InstanceType<typeof accountPanel>>()
watch(isKeepPassword, (newValue) => {
  localCache.setCache("isKeepPassword", newValue)
})
function handelLoginBtnClick() {
  if (activeName.value == 'account') {
    accountRef.value?.loginAction(isKeepPassword.value)
  } else {
    console.log('在进行手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: cneter;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    margin-left: 5px;
  }

  .control {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
