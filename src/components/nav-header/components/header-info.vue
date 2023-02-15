<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <el-icon>
          <Message />
        </el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon>
          <ChatDotRound />
        </el-icon>

      </span>
      <span>
        <el-icon>
          <Search />
        </el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <span class="avatar">
            <el-avatar :size="35"
              src="https://oddpackage-1310090673.cos.ap-chongqing.myqcloud.com/image202302122007138.jpg" />
          </span>
          <span class="name">coderodd</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitLogin">
              <el-icon>
                <CircleClose />
              </el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon>
                <InfoFilled />
              </el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon>
                <Unlock />
              </el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </div>
</template>


<script setup lang="ts">
import { ChatDotRound, CircleClose, InfoFilled, Message } from '@element-plus/icons-vue';
import { localCache } from '@/utils/cache';
import { LOGIN_TOKEN } from '@/global/constant';
import router from '@/router';

function handleExitLogin() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push("/login")
}

</script>
<style lang="less" scoped>
.header-info {
  display: flex;
  justify-content: center;

  .operation {
    display: inline-flex;

    span {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 35px;

      &:hover {
        background: #f2f2f2;
      }

      i {
        font-size: 20px;
      }
    }

    .dot {
      position: absulute;
      top: -10px;
      left: 25px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }

  .info {
    .user-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .avatar {
        padding-left: 40px;
        margin-right: 15px;
      }
    }
  }

  .info {
    :global(.el-dropdown-menu__item) {
      line-height: 32px !important;
      padding: 6px 30px
    }
  }

}
</style>
