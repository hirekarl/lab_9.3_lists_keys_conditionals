import { useState, type ReactNode } from "react"
import type { Task, TaskStatus } from "./types"
import TaskList from "./components/TaskList/TaskList"

import { MOCK_TASKS } from "./data/mockTasks"

function App(): ReactNode {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)

  function handleStatusChange(taskId: string, newStatus: TaskStatus): void {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  function handleDelete(taskId: string): void {
    setTasks(tasks.filter((t) => t.id !== taskId))
  }

  return (
    <>
      <div className="container">
        <TaskList
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </>
  )
}

export default App
