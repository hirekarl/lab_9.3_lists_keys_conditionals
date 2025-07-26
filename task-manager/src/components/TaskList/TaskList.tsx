import type { ReactNode } from "react"
import type { TaskListProps, TaskPriority } from "../../types"
import TaskItem from "../TaskItem/TaskItem"

const TaskPrioritySortRank: Record<TaskPriority, number> = {
  high: 1,
  medium: 2,
  low: 3,
} as const

export default function TaskList({
  tasks,
  onStatusChange,
  onDelete,
}: TaskListProps): ReactNode {
  const taskItems = tasks
    .sort((a, b) => {
      const dateA = new Date(a.dueDate)
      const dateB = new Date(b.dueDate)
      return dateA.getTime() - dateB.getTime()
    })
    .sort(
      (a, b) =>
        TaskPrioritySortRank[a.priority] - TaskPrioritySortRank[b.priority]
    )
    .map((task) => {
      return (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      )
    })

  return (
    <>
      <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
        {taskItems}
      </div>
    </>
  )
}
