export type TaskStatus = "pending" | "in-progress" | "completed"
export type TaskPriority = "low" | "medium" | "high"

export type TaskID = string

export interface Task {
  id: TaskID
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
}

export interface TaskListProps {
  tasks: Task[]
  onStatusChange: (taskId: TaskID, newStatus: TaskStatus) => void
  onDelete: (taskId: TaskID) => void
}

export interface TaskItemProps {
  task: Task
  onStatusChange: (taskId: TaskID, newStatus: TaskStatus) => void
  onDelete: (taskId: TaskID) => void
}

export type TaskStatusFilter = TaskStatus | "all"
export type TaskPriorityFilter = TaskPriority | "all"

export interface TaskFilters {
  status?: TaskStatusFilter
  priority?: TaskPriorityFilter
}

export interface TaskFilterProps {
  onFilterChange: (filter: { status: string } | { priority: string }) => void
}

export type BootstrapColor = "danger" | "warning" | "info"
