<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import DeleteDialog from './DeleteDialog.vue'
import { Icon } from '@iconify/vue'
import type { ITask } from '@/types/tasks'
import EditDialog from './EditDialog.vue'

defineProps<ITask>()
</script>

<template>
  <Card class="p-4 flex justify-between">
    <CardHeader class="p-0">
      <CardTitle class="text-lg font-normal max-w-56 truncate"> {{ title }}</CardTitle>
      <CardDescription class="max-w-56 truncate">{{ description }}</CardDescription>
    </CardHeader>
    <CardContent class="p-0">
      <div class="flex items-center gap-2">
        <!-- edit dialog goes here -->
        <EditDialog :description="description" :title="title" :status="status" :id="id" />
        <DeleteDialog :id="id" />
      </div>
    </CardContent>
  </Card>
</template>
