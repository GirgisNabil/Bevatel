// Import the necessary libraries and types
import { setActivePinia, createPinia } from 'pinia'
import { useTasks } from '@/stores/tasks'
import { describe, it, expect, beforeEach } from 'vitest'
import type { ITask } from '@/types/tasks'

// Set up the test suite
describe('Tasks Store', () => {
  let store: ReturnType<typeof useTasks>

  // Before each test, set up the Pinia store
  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTasks()
  })

  // Test adding a task
  it('adds a task', () => {
    store.addTask('New Task', 'This is a new task', 'todo')
    expect(store.tasks.length).toBe(2) // Assuming you have 9 initial tasks
    expect(store.tasks[store.tasks.length - 1].title).toBe('New Task')
  })

  // Test removing a task
  it('removes a task', () => {
    store.removeTask(1) // Assuming you want to remove the first task
    expect(store.tasks.length).toBe(0) // Assuming you remove 1 task
    expect(store.tasks.find((task) => task.id === 1)).toBeUndefined() // Task with ID 1 should be removed
  })

  // Test updating a task
  it('updates a task', () => {
    const updatedTask: Partial<ITask> = {
      id: 1,
      title: 'Updated Task',
      description: 'Updated description',
      status: 'completed'
    }
    store.updateTask(1, updatedTask)
    const task = store.tasks.find((task) => task.id === 1)
    expect(task).toBeDefined()
    expect(task!.title).toBe('Updated Task')
    expect(task!.description).toBe('Updated description')
    expect(task!.status).toBe('completed')
  })

  // Test setting task status
  it('sets task status', () => {
    store.setTaskStatus(1, 'inProgress') // Assuming you want to change the status of the first task
    const task = store.tasks.find((task) => task.id === 1)
    expect(task).toBeDefined()
    expect(task!.status).toBe('inProgress')
  })
})
