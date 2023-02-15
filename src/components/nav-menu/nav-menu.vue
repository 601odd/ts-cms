<template>
  <div class="nav-menu">
    <!-- logo -->
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="">
      <div v-show="!isFold" class="title">odd-cms</div>
    </div>
    <div class="menu">
      <el-menu :default-active="defaultValue" :collapse="isFold" text-color="#b7bdc3" active-text-color="#fff"
        background-color="#001529">
        <template v-for="item in userMenu" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('el-icon')[1]" />
              </el-icon>
              <span class="name">{{ item.name }}</span>
            </template>

            <template v-for="child in item.children" :key="child.id">
              <el-menu-item :index="child.id + ''" @click="handleItemClick(child)">
                <span>{{ child.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
      <!-- <el-sub-menu :index="">
            <template #title>
              <el-icon>
                <Platform />
              </el-icon>
              <span></span>
            </template>
            <el-menu-item index="">核心技术</el-menu-item>
            <el-menu-item index="">商品统揽</el-menu-item>

          </el-sub-menu>

          <el-sub-menu index="">
            <template #title>
              <el-icon>
                <Setting />
              </el-icon>
              <span>系统管理</span>
            </template>
            <el-menu-item index="">用户管理</el-menu-item>
            <el-menu-item index="">部门管理</el-menu-item>
            <el-menu-item index="">菜单管理</el-menu-item>
            <el-menu-item index="">角色管理</el-menu-item>

          </el-sub-menu>

          <el-sub-menu index="">
            <template #title>
              <el-icon>
                <ShoppingBag />
              </el-icon>
              <span>商品中心</span>
            </template>
            <el-menu-item index="">商品类别</el-menu-item>
            <el-menu-item index="">商品信息</el-menu-item>

          </el-sub-menu>

          <el-sub-menu index="">
            <template #title>
              <el-icon>
                <Comment />
              </el-icon>
              <span>随便聊聊</span>
            </template>
            <el-menu-item index="">你的故事</el-menu-item>
            <el-menu-item index="">故事列表</el-menu-item>
            <el-sub-menu index="">
              <template #title>
                <el-icon>
                  <Sugar />
                </el-icon>
                <span>谁知道呢</span>
              </template>
              <el-menu-item index="">你的音乐</el-menu-item>
              <el-menu-item index="">你的爱好</el-menu-item>
            </el-sub-menu>
          </el-sub-menu> -->

    </div>
  </div>
</template>
<script setup lang="ts">

import { ref, computed } from 'vue';
import useLoginStore from '@/store/login/login';
import { mapPathToMenu } from '@/utils/map-menu'
import { useRouter, useRoute } from 'vue-router';
import router from '@/router';

defineProps({
  isFold: {
    type: Boolean,
    defaults: false
  }
})
// 获取动态菜单
const loginStore = useLoginStore()
const userMenu = loginStore.userMenu


function handleItemClick(item: any) {
  router.push(item.url)
}

// menu 默认菜单
const route = useRoute()

// 当userMenu 或者route.path发生改变会自动更新defaultValue
const defaultValue = computed(() => {
  const path = mapPathToMenu(userMenu, route.path)
  return path.id + ''
})

</script>
<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
}

.name {
  margin-left: 30px;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 28px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }


}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 80px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff
  }

  .el-menu-item.is-active {
    background-color: #165fad;
  }
}
</style>
