// Import necessary libraries and types
import { mount } from '@vue/test-utils'
import EditTask from '@/components/base/EditDialog.vue'
import { describe, it, expect } from 'vitest'
import TaskCard from '@/components/base/TaskCard.vue'

// Mock sub-components used in TaskCard
const DeleteDialog = { template: '<div></div>' }
const EditDialog = { template: '<div></div>' }

// Define a test suite for TaskCard component
describe('TaskCard', () => {
  // Define a test case for rendering TaskCard
  it('renders TaskCard component correctly', async () => {
    // Mount TaskCard component
    const wrapper = mount(TaskCard, {
      props: {
        id: 1,
        title: 'Sample Task',
        description: 'This is a sample task description.',
        status: 'todo'
      },
      // Provide stubs for sub-components used in TaskCard
      global: {
        stubs: {
          DeleteDialog,
          EditDialog
        }
      }
    })

    // Assert that the TaskCard is rendered correctly
    expect(wrapper.html()).toMatchSnapshot()
  })
})
