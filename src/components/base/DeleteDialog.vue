<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Icon } from '@iconify/vue'
import { useTasks } from '@/stores/tasks'
const store = useTasks()

const { removeTask } = store
defineProps<{ id: number }>()
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Icon
        class="text-xl text-[#ff6764] cursor-pointer"
        icon="solar:trash-bin-minimalistic-linear"
      />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogDescription> Are u sure you want to delete this Task ... </DialogDescription>
      </DialogHeader>

      <DialogClose class="mt-5 flex gap-2 ml-auto">
        <Button variant="outline">Cancel</Button>
        <Button @click="removeTask(id)">delete</Button>
      </DialogClose>
    </DialogContent>
  </Dialog>
</template>
