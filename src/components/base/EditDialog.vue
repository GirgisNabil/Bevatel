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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { useForm } from 'vee-validate'
import * as yup from 'yup'
import type { ITask, ITaskStatus } from '@/types/tasks'
// Define the validation schema
const schema = yup.object({
  title: yup.string().required().max(30).min(5),
  description: yup.string().required().max(60).min(10)
})
// Define props for Task
const props = defineProps<ITask>()

// Set up form with validation schema
const { defineField, errors, values, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { title: props.title, description: props.description }
})
const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')

// Store reference
const store = useTasks()

// Extract addTask method from the store
const { updateTask } = store

// Manage dialog state
const isOpen = ref<boolean>(false)
const handleClose = () => (isOpen.value = false)

const status = ref<ITaskStatus>(props.status)
// Handle add task, only proceed if validation passes
const handleAdd = handleSubmit(() => {
  updateTask(props.id, { ...values, status: status.value })
  handleClose()
})
</script>
<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Icon
        class="text-lg text-muted-foreground cursor-pointer"
        icon="solar:pen-new-square-broken"
      />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription> Edit any field you want from below to update task </DialogDescription>
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
          <div class="flex flex-col gap-3">
            <Label for="description"> status </Label>
            <Select v-model="status">
              <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="todo"> Todo </SelectItem>
                  <SelectItem value="inProgress"> in progress </SelectItem>
                  <SelectItem value="done"> Done </SelectItem>
                  <SelectItem value="completed"> Completed </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter class="mt-5 flex gap-2 ml-auto">
          <Button variant="outline" @click="isOpen = false">Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
