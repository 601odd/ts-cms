<template>
  <div class="user-search">
    <el-form :model="searchForm" label-width="80px" ref="formRef" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="realname">
            <el-input v-model="searchForm.name" placeholder="请输入查询的用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="searchForm.realname" placeholder="请输入查询的真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="searchForm.phone" placeholder="请输入查询的手机号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="searchForm.enable" placeholder="请选择查询的状态" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker v-model="searchForm.createAt" type="daterange" range-separator="--" start-placeholder="开始时间"
              end-placeholder="结束时间" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button icon="Refresh" size="large" @click=handleRefrehClick>重置</el-button>
      <el-button icon='Search' size="large" type="primary" @click=handleSearchClick>查询</el-button>

    </div>

  </div>
</template>


<script setup lang="ts">
import { reactive, ref, } from "vue"
import { ElForm } from "element-plus";


const emit = defineEmits(['queryClick', 'resetClick'])
const searchForm = reactive({
  name: '',
  realname: '',
  enable: '',
  phone: '',
  createAt: '',
})
const formRef = ref<InstanceType<typeof ElForm>>()

function handleRefrehClick() {
  formRef.value?.resetFields()
}
function handleSearchClick() {
  emit('queryClick', searchForm)
}

//


</script>
<style lang="less" scoped>
.user-search {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 0px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0px;

  }

  .btn {
    text-align: right;
    padding: 0 50px 10px 0;
  }

  .el-button {
    height: 36px;
  }
}
</style>
