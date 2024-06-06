<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Icon } from '@iconify/vue'
import { useTasks } from '@/stores/tasks'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import type { ITaskStatus } from '@/types/tasks'
// Define the validation schema
const schema = yup.object({
  title: yup.string().required().max(30).min(5),
  description: yup.string().required().max(60).min(10)
})

// Set up form with validation schema
const { defineField, errors, values, handleSubmit, resetForm } = useForm({
  validationSchema: schema
})
const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')

// Store reference
const store = useTasks()

// Extract addTask method from the store
const { addTask } = store

// Define props for status
const { status } = defineProps<{ status: ITaskStatus }>()

// Manage dialog state
const isOpen = ref<boolean>(false)
const handleClose = () => {
  isOpen.value = false
  resetForm()
}

// Handle add task, only proceed if validation passes
const handleAdd = handleSubmit(() => {
  addTask(values.title, values.description, status)
  handleClose()
})
</script>
<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button class="rounded-full size-7 p-0"> <Icon icon="tabler:plus" /></Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Task</DialogTitle>
        <DialogDescription> Enter all the fields to be able to add new task </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="handleAdd">
        <div class="grid gap-4 py-4">
          <div>
            <div class="flex flex-col gap-3">
              <Label for="title"> title </Label>
              <Input id="title" class="col-span-3" v-model="title" v-bind="titleAttrs" />
            </div>
            <span v-if="errors?.title" class="text-red-400 mt-1 block"> {{ errors.title }} </span>
          </div>
          <div>
            <div class="flex flex-col gap-3">
              <Label for="description"> description </Label>
              <Input
                id="description"
                class="col-span-3"
                v-model="description"
                v-bind="descriptionAttrs"
              />
            </div>
            <span v-if="errors?.description" class="text-red-400 mt-1 block">
              {{ errors.description }}
            </span>
          </div>
        </div>

        <DialogFooter class="mt-5 flex gap-2 ml-auto">
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
