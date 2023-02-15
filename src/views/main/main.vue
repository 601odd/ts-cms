<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '220px'">
        <nav-menu :is-fold="isFold" />
      </el-aside>
      <el-container>

        <el-header height="50px">
          <nav-header @change-fold="handleChangeFold" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>


<script setup lang="ts">
import NavMenu from '@/components/nav-menu/nav-menu.vue'
import NavHeader from '@/components/nav-header/nav-header.vue';
import NavMain from '@/components/nav-main/nav-main.vue'
import { ref } from 'vue';

let isFold = ref(false)
function handleChangeFold(flag: boolean) {
  isFold.value = flag ? true : false
}
</script>
<style lang="less" scoped>
.main {
  height: 100%;

  .main-content {
    height: 100%;

    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      text-align: left;
      line-height: 200px;
      cursor: pointer;
      background-color: #001529;
      transition: width 0.3s linear; //折叠效果
      scrollbar-width: none; // firefox
      -ms-overflow-style: none; //LE 10+

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .el-main {
      background-color: #f0f2f5
    }


  }
}
</style>
