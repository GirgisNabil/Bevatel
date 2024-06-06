export type ITaskStatus = 'done' | 'inProgress' | 'todo' | 'completed'
export interface ITaskCategory {
  value: ITaskStatus
  title: string
  textColor: string
  list: any
}
export interface ITask {
  id: number
  title: string
  description: string
  status: ITaskStatus
}
export interface ITaskState {
  tasks: ITask[]
  filter: 'all' | 'finished' | 'unfinished'
  nextId: number
}
