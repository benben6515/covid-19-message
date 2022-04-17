<script setup lang="ts">
import { reactive } from 'vue'
// import data from '/data.json'
import { localStorage } from '~/composables'
import MessageTitle from '~/components/message/MessageTitle.vue'

const data: any = localStorage.data
const state = reactive({
  newName: '',
  newContent: '',
  data,
})

const handleAddOrEdit = () => {
  console.log(state.newName)
  console.log(state.newContent)
  state.data.push({
    id: new Date().toISOString(),
    name: state.newName,
    content: state.newContent,
  })
  console.log(state.data)
  localStorage.save(state.data)
}

// TODO: fix any type
const handleDelete = (id: any) => {
  state.data = state.data.filter((e: any) => e.id !== id)
  localStorage.save(state.data)
}

</script>

<template>
  <MessageTitle />

  <div class="flex flex-col gap-4 items-center">
    <input
      id="input"
      v-model="state.newName"
      placeholder="Input memo"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="handleAddOrEdit"
    >

    <input
      id="input"
      v-model="state.newContent"
      placeholder="Input message content"
      type="textarea"
      row="5"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="handleAddOrEdit"
    >

    <div class="flex gap-4">
      <GoBack />
      <button
        class="btn m-3 text-sm mt-8"
        :disabled="!state.newName || !state.newContent"
        @click="handleAddOrEdit"
      >
        Add
      </button>
    </div>
  </div>

  <div
    class="flex flex-col gap-2 max-w-20rem mx-auto mt-8"
  >
    <div
      v-for="chunk in state.data"
      :key="chunk.id"
      class="flex justify-between bg-zinc-300"
      dark="bg-zinc-700"
    >
      <div class="px-2">
        {{ chunk.name }}
      </div>
      <button
        class="bg-red-500 px-1 rounded-md"
        dark="bg-red-800"
        @click="handleDelete(chunk.id)"
      >
        刪除
      </button>
    </div>
  </div>
</template>
