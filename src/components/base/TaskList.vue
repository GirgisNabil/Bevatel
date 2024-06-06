<script setup lang="ts">
import type { ITask } from '@/types/tasks'
import TaskCard from './TaskCard.vue'
interface IProps {
  list: ITask[]
}
defineProps<IProps>()
</script>
<template>
  <div class="grid tasksGrid transition-all duration-300">
    <div v-for="listItem in list">
      <TaskCard
        :title="listItem.title"
        :description="listItem.description"
        :id="listItem.id"
        :status="listItem.status"
      />
    </div>
  </div>
</template>
<style scoped>
.tasksGrid {
  margin-top: 15px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 15px;
}

@media (max-width: 768px) {
  .tasksGrid {
    margin-top: 10px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
  }
}
</style>
