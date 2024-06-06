<script setup lang="ts">
import { ref, computed } from 'vue'
import TheTaskList from '@/components/base/TaskList.vue'
import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useTasks } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import CreateDialog from '@/components/base/CreateDialog.vue'
import type { ITaskStatus } from '@/types/tasks'

interface ITaskCategory {
  value: ITaskStatus
  title: string
  textColor: string
}

const store = useTasks()
const { todoTasks, inProgressTasks, doneTasks, completedTasks } = storeToRefs(store)

const taskCategories: ITaskCategory[] = [
  { value: 'todo', title: 'To Do', textColor: 'dark:text-white' },
  { value: 'inProgress', title: 'In Progress', textColor: 'text-yellow-300' },
  { value: 'done', title: 'Done', textColor: 'text-blue-500' },
  { value: 'completed', title: 'Completed', textColor: 'text-green-600' }
]

const taskListMap = computed(() => ({
  todo: todoTasks.value,
  inProgress: inProgressTasks.value,
  done: doneTasks.value,
  completed: completedTasks.value
}))

const values = ref<ITaskStatus[]>(['todo', 'inProgress', 'done', 'completed'])
</script>
<template>
  <div class="mx-auto mt-5 flex flex-col">
    <Accordion
      v-model="values"
      type="multiple"
      :default-value="values"
      class="bg-[#f8f8f8] dark:bg-[#0f0d0c] rounded-lg px-4 py-4 flex flex-col gap-2.5"
    >
      <div v-for="group in taskCategories" :key="group.value">
        <AccordionItem
          :value="group.value"
          class="bg-white dark:bg-[#3333393b] px-3 rounded-md flex justify-between items-center border-input border dark:border-none"
        >
          <AccordionTrigger :class="group.textColor" class="py-3 px-1">
            <span>{{ group.title }}</span>
            <span>( {{ taskListMap[group.value].length }} )</span>
          </AccordionTrigger>
          <CreateDialog :status="group.value" />
        </AccordionItem>
        <TheTaskList
          :class="values.includes(group.value) ? 'open' : 'closed'"
          :list="taskListMap[group.value]"
        />
      </div>
    </Accordion>
  </div>
</template>

<style scoped>
.closed {
  max-height: 0px;
  overflow: hidden;
}

.open {
  max-height: 1000px;
}
</style>
