import { useState, type ReactNode } from "react"
import type {
  Task,
  TaskID,
  TaskPriorityFilter,
  TaskStatus,
  TaskStatusFilter,
} from "./types"
import Header from "./components/Header/Header"
import TaskFilter from "./components/TaskFilter/TaskFilter"
import TaskList from "./components/TaskList/TaskList"

import { MOCK_TASKS } from "./data/mockTasks"

function App(): ReactNode {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [visibleTaskIds, setVisibleTaskIds] = useState<TaskID[]>(
    tasks.map((t) => t.id)
  )

  function handleStatusChange(taskId: TaskID, newStatus: TaskStatus): void {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  function handleDelete(taskId: TaskID): void {
    setTasks(tasks.filter((t) => t.id !== taskId))
  }

  function handleFilter(filters: {
    status?: TaskStatusFilter
    priority?: TaskPriorityFilter
  }): void {
    if ("status" in filters && filters.status !== "all") {
      setVisibleTaskIds(
        tasks.filter((t) => t.status === filters.status).map((t) => t.id)
      )
    } else if ("priority" in filters && filters.priority !== "all") {
      setVisibleTaskIds(
        tasks.filter((t) => t.priority === filters.priority).map((t) => t.id)
      )
    } else {
      setVisibleTaskIds(tasks.map((t) => t.id))
    }
  }

  return (
    <div className="container">
      <Header />
      <TaskFilter onFilterChange={handleFilter} />
      <TaskList
        tasks={tasks.filter((t) => visibleTaskIds.includes(t.id))}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
