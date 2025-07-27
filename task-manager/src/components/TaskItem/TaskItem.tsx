import type { ReactNode, ChangeEvent } from "react"
import type {
  BootstrapColor,
  Task,
  TaskPriority,
  TaskItemProps,
} from "../../types"

const PriorityToBootstrapColor: Record<TaskPriority, BootstrapColor> = {
  low: "info",
  medium: "warning",
  high: "danger",
}

export default function TaskItem({
  task,
  onStatusChange,
  onDelete,
}: TaskItemProps): ReactNode {
  const { id, title, description, status, priority, dueDate }: Task = task

  function handleDeleteButtonClick(): void {
    onDelete(id)
  }

  function handleStatusSelect(event: ChangeEvent<HTMLSelectElement>): void {
    if (
      event.currentTarget.value === "pending" ||
      event.currentTarget.value === "in-progress" ||
      event.currentTarget.value === "completed"
    ) {
      const newStatus = event.currentTarget.value
      onStatusChange(id, newStatus)
    }
  }

  function displayDueDate(): string {
    return new Date(dueDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
  }

  function dueDateAsISO(): string {
    return new Date(dueDate).toISOString().split("T")[0]
  }

  return (
    <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
      <div className={`card mb-3 border-${PriorityToBootstrapColor[priority]}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h2 className="card-title fs-4">{title}</h2>
            <div>
              <span
                className={`badge text-bg-${PriorityToBootstrapColor[priority]}`}>{`${priority.toUpperCase()} PRIORITY`}</span>
            </div>
          </div>

          <div className="card-text">
            <ul className="list-unstyled">
              <li>{description}</li>
              <li>
                Due:{" "}
                <em>
                  <time dateTime={dueDateAsISO()}>{displayDueDate()}</time>
                </em>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between">
            <div>
              <select
                value={status}
                className="form-select"
                onChange={handleStatusSelect}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={handleDeleteButtonClick}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
