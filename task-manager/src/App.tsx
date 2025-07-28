import { useState, type ReactNode } from "react"
import type { Task, TaskID, TaskStatus, TaskFilters } from "./types"
import Header from "./components/Header/Header"
import TaskFilter from "./components/TaskFilter/TaskFilter"
import TaskList from "./components/TaskList/TaskList"

import { MOCK_TASKS } from "./data/mockTasks"

function App(): ReactNode {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [filters, setFilters] = useState<TaskFilters>({
    status: "all",
    priority: "all",
  })

  function handleStatusChange(taskId: TaskID, newStatus: TaskStatus): void {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  function handleDelete(taskId: TaskID): void {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId))
  }

  function handleFilters(
    filter: { status: string } | { priority: string }
  ): void {
    let name: string
    let value: string

    if ("status" in filter) {
      name = "status"
      value = filter.status
    } else {
      name = "priority"
      value = filter.priority
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }))
  }

  function applyFilters(): Task[] {
    return tasks.filter((task) => {
      return (
        (filters.status === "all" || task.status === filters.status) &&
        (filters.priority === "all" || task.priority === filters.priority)
      )
    })
  }

  return (
    <div className="container">
      <Header />
      <TaskFilter onFilterChange={handleFilters} />
      <TaskList
        tasks={applyFilters()}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
