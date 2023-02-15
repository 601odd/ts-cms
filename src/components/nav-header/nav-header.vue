<template>
  <div class="nav-header">
    <div class="menu-icon" @click="handleMenuIconChange">
      <el-icon size="28px">
        <component :is="isFold ? 'expand' : 'fold'" />

      </el-icon>
    </div>
    <div class="content">
      <breadCrumb></breadCrumb>
      <div class="info">
        <header-info></header-info>
        <!-- 个人信息 -->
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import headerInfo from './components/header-info.vue';
import breadCrumb from './components/bread-crumb.vue';
let isFold = ref(true)
const emit = defineEmits(['changeFold'])

function handleMenuIconChange() {
  isFold.value = !isFold.value
  emit('changeFold', isFold.value)

}
</script>
<style lang="less" scoped>
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 10px;
  }
}
</style>
