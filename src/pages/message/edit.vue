<script setup lang="ts">
import { reactive } from 'vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
// import data from '/data.json'
import { localStorage } from '~/composables'
import MessageTitle from '~/components/message/MessageTitle.vue'

const data: any = localStorage.data
const state = reactive({
  isEditing: false,
  currentEditId: '',
  inputName: '',
  inputMessage: '',
  data,
})

const handleAddOrEdit = () => {
  if (state.isEditing) {
    const temp = state.data.filter((e: any) => e.id === state.currentEditId)
    temp[0].name = state.inputName
    temp[0].message = state.inputMessage
    state.isEditing = false
    state.currentEditId = ''
  }
  else {
    state.data.push({
      id: new Date().toISOString(),
      name: state.inputName,
      message: state.inputMessage,
      visitedTime: 0,
    })
  }
  localStorage.save(state.data)
  state.inputName = ''
  state.inputMessage = ''
}

// TODO: fix any type
const setCurrentEdit = (data: any) => {
  state.inputName = data.name
  state.inputMessage = data.message
  state.currentEditId = data.id
  state.isEditing = true
}

// TODO: fix any type
const handleDelete = (id: any) => {
  Swal.fire({
    title: '確定要刪除？',
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '刪除',
  }).then((result: any) => {
    if (result.isConfirmed) {
      state.data = state.data.filter((e: any) => e.id !== id)
      localStorage.save(state.data)
    }
  })
}

const handleClear = () => {
  Swal.fire({
    title: '確定要清除全部資料？',
    cancelButtonText: '取消',
    showCancelButton: true,
    confirmButtonText: '消除',
  }).then((result: any) => {
    if (result.isConfirmed) {
      window.localStorage.clear()
      state.data = []
    }
  })
}

</script>

<template>
  <MessageTitle />

  <div class="flex flex-col gap-4 items-center">
    <input
      id="input"
      v-model="state.inputName"
      placeholder="Input name or memo"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="handleAddOrEdit"
    >

    <textarea
      id="textarea"
      v-model="state.inputMessage"
      placeholder="Input message content"
      type="textarea"
      rows="5"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="handleAddOrEdit"
    />

    <div class="flex gap-4">
      <GoBack />
      <button
        class="btn bg-red-500 hover:bg-red-400 m-3 text-sm mt-8"
        @click="handleClear"
      >
        Clear
      </button>
      <button
        class="btn m-3 text-sm mt-8"
        :disabled="!state.inputName || !state.inputMessage"
        @click="handleAddOrEdit"
      >
        {{ state.isEditing ? 'Edit' : 'Add' }}
      </button>
    </div>
  </div>

  <div
    class="flex flex-col gap-2 max-w-20rem mx-auto mt-8"
  >
    <div
      v-for="chunk in state.data"
      :key="chunk.id"
      class="flex justify-between bg-zinc-300 p-1 rounded-md"
      dark="bg-zinc-700"
    >
      <div class="px-2">
        {{ chunk.name }}
      </div>
      <div class="flex gap-2">
        <button
          class="bg-blue-400 px-1 rounded-md"
          dark="bg-blue-800"
          @click="setCurrentEdit(chunk)"
        >
          編輯
        </button>
        <button
          v-if="chunk.id !== state.currentEditId"
          class="bg-red-400 px-1 rounded-md"
          dark="bg-red-800"
          @click="handleDelete(chunk.id)"
        >
          刪除
        </button>
        <button
          v-else
          class="bg-gray-400 px-1 rounded-md cursor-not-allowed"
          dark="bg-gray-600"
          :disabled="true"
        >
          編輯中
        </button>
      </div>
    </div>
  </div>
</template>
