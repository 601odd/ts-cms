<template>
  <div class="user-conents">
    <div class="content">
      <div class="header">
        <h3 class="title">表单
        </h3>
        <el-button type="primary" @click="handleCreateNewUserClick">新建表单</el-button>
      </div>
      <div class="table">
        <el-table :data="userList" border style="width: 100%">
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column align="center" type="index" label="序号" width="50" />
          <el-table-column align="center" prop="realname" label="用户名" width="100px" />
          <el-table-column align="center" prop="name" label="真实姓名" width="120px" />
          <el-table-column align="center" prop="cellphone" label="手机号码" width="150px" />
          <el-table-column align="center" prop="enable" label="状态" width="60px">

            <template #default="scope">
              <el-button size="small" type="primary" plain>
                {{ scope.row.enable ? '启用' : '禁用' }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="createAt" label="创建时间" width="220px">
            <template #default="scope">
              {{ formatUtc(scope.row.createAt) }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="updateAt" label="更新时间" width="220px">
            <template #default="scope">
              {{ formatUtc(scope.row.updateAt) }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="180px">
            <template #default="scope">
              <el-button size="small" icon="Edit" type="primary" @click="handleEditBtnClick(scope.row)">编辑</el-button>
              <el-button size="small" icon="Delete" type="danger"
                @click="handleDeleteBtnClick(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>


        </el-table>
      </div>
      <div class="pagenation">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper" :total="userCount" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import useSystemStore from '@/store/main/system/system';
import { storeToRefs } from 'pinia';
import formatUtc from "@/utils/format"
import { ref } from 'vue';
const emit = defineEmits(['createNewClick', 'editClick'])
// 初始化数据
const currentPage = ref(1)
const pageSize = ref(10)

// 发起actions 请求userList的数据
const systemStore = useSystemStore()
fetchUserListData()


// 获取userList数据进行展示
//  对systemStore 包裹storeToRefs 让这个store变成响应式的
const { userList, userCount } = storeToRefs(systemStore)

function handleSizeChange() {
  fetchUserListData()
  console.log('page-size change')
}
function handleCurrentChange() {
  fetchUserListData()
  console.log("currentPage change")
}

// 定义函数 用于发送网络请求
function fetchUserListData(formData: any = []) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...formData, ...pageInfo }
  // console.log(queryInfo)
  systemStore.postUserListAction(queryInfo)
}

// 删除按钮
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserAction(id)
  console.log("点击删除按钮 ", id)
}

// 创建新表单
function handleCreateNewUserClick() {
  emit('createNewClick')
}
//点击编辑按钮
function handleEditBtnClick(data: any) {
  emit('editClick', data)
}

defineExpose({ fetchUserListData })

</script>
<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .title {
      font-size: 25px
    }
  }
}

.el-button--small {
  padding: 0 4px;
}

.pagenation {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.el-table .el-table__cell {
  padding: 12px 0;
}
</style>
