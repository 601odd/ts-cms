<template>
  <div class="bread-crumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>


<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { mapPathToBreadcrumb } from '@/utils/map-menu';
import useLoginStore from '@/store/login/login';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute()
const loginStore = useLoginStore()
const breadcrumb = computed(() => { return mapPathToBreadcrumb(loginStore.userMenu, route.path) })
</script>
<style lang="less" scoped>

</style>
