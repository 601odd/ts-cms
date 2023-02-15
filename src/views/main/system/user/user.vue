<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick"></user-search>
    <user-contents ref="contentRef" @create-new-click="handleNewClick" @edit-click="handleEditClick"></user-contents>
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>

<script setup lang="ts" name="user">
import userSearch from '@/views/main/system/user/components/user-search.vue'
import { ref } from 'vue';
import userContents from './components/user-contents.vue';
import userModal from '@/views/main/system/user/components/user-modal.vue'
const contentRef = ref<InstanceType<typeof userContents>>()
const modalRef = ref<InstanceType<typeof userModal>>()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)

}
function handleResetClick() {
  // 用默认参数就可以
  contentRef.value?.fetchUserListData()
}

function handleNewClick() {
  modalRef.value?.setModalVisible()
}

function handleEditClick(itemdata: any) {
  modalRef.value?.setModalVisible(false, itemdata)
}
</script>
<style scoped>
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
