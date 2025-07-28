import { type ReactNode, type ChangeEvent } from "react"
import type {
  TaskFilterProps,
  TaskPriorityFilter,
  TaskStatusFilter,
} from "../../types"

export default function TaskFilter({
  onFilterChange,
}: TaskFilterProps): ReactNode {
  function handlePrioritySelect(event: ChangeEvent<HTMLSelectElement>): void {
    if (
      event.target.value === "low" ||
      event.target.value === "medium" ||
      event.target.value === "high" ||
      event.target.value === "all"
    ) {
      const newPriority: TaskPriorityFilter = event.target.value
      onFilterChange({ priority: newPriority })
    }
  }

  function handleStatusSelect(event: ChangeEvent<HTMLSelectElement>): void {
    if (
      event.target.value === "pending" ||
      event.target.value === "in-progress" ||
      event.target.value === "completed" ||
      event.target.value === "all"
    ) {
      const newStatus: TaskStatusFilter = event.target.value
      onFilterChange({ status: newStatus })
    }
  }

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1 mb-3">
        <div className="d-flex justify-content-between">
          <div>
            <select id="priority-filter-select" onChange={handlePrioritySelect} className="form-select">
              <option value="all">Filter by Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <select id="status-filter-select" onChange={handleStatusSelect} className="form-select">
              <option value="all">Filter by Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
