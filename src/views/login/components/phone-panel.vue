<template>
  <div class="phone">
    <el-form label-width="60px">
      <el-form-item label="手机号">
        <el-input v-model="phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input v-model="verifyCode"></el-input>
          <el-button type="primary" class="code"> 验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const phoneNumber = ref('')
const verifyCode = ref('')
</script>
<style lang="less" scoped>
.verify-code {
  display: flex;

  .code {
    margin-left: 30px;
  }
}
</style>
