import { defineStore } from 'pinia'
import { type ITaskState, type ITask } from '@/types/tasks'
import { toast } from 'vue-sonner'

export const useTasks = defineStore('tasks', {
  state: (): ITaskState => ({
    tasks: [
      {
        id: 1,
        title: 'Todo 1',
        description: 'This is the description for todo 1.',
        status: 'todo'
      }
    ],
    filter: 'all',
    nextId: 2
  }),
  getters: {
    todoTasks: (state) => state.tasks.filter((task) => task.status === 'todo'),
    inProgressTasks: (state) => state.tasks.filter((task) => task.status === 'inProgress'),
    doneTasks: (state) => state.tasks.filter((task) => task.status === 'done'),
    completedTasks: (state) => state.tasks.filter((task) => task.status === 'completed')
  },

  actions: {
    // any amount of arguments, return a promise or not
    addTask(
      title: string,
      description: string,
      status: 'todo' | 'inProgress' | 'done' | 'completed'
    ) {
      this.tasks.push({ id: this.nextId++, title, description, status })
      toast.success('Task Created successfuly!!')
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
      toast.success('Task removed successfuly !!')
    },
    updateTask(id: number, updatedTask: Partial<ITask>) {
      const task = this.tasks.find((task) => task.id === id)
      const index = this.tasks.findIndex((task) => task.id === id);
this.tasks[index] = {...this.tasks[index] ,...updatedTask }
      // if (task) {
      //   Object.assign(task, updatedTask)

      // }
      toast.success('Task Updated successfuly !!')
    },
    setTaskStatus(id: number, status: 'todo' | 'inProgress' | 'done' | 'completed') {
      const task = this.tasks.find((task) => task.id === id)
      if (task) {
        task.status = status
      }
    }
  }
})