import { useTasks } from '../context/TaskContext';

const STATUS_LABELS = { todo: 'To Do', 'in-progress': 'In Progress', completed: 'Completed' };
const STATUS_CLASS = { todo: 'status-todo', 'in-progress': 'status-progress', completed: 'status-done' };

export default function TaskCard({ task, onEdit }) {
  const { updateTask, deleteTask } = useTasks();
  const due = new Date(task.dueDate);
  const isOverdue = due < new Date() && task.status !== 'completed';

  const toggleStatus = async () => {
    const next = task.status === 'todo' ? 'in-progress' : task.status === 'in-progress' ? 'completed' : 'todo';
    await updateTask(task._id, { status: next });
  };

  const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className={`task-card ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-card-header">
        <span className={`status-badge ${STATUS_CLASS[task.status]}`}>{STATUS_LABELS[task.status]}</span>
        <div className="task-actions">
          <button onClick={() => onEdit(task)} className="btn-icon" title="Edit">✏️</button>
          <button onClick={() => deleteTask(task._id)} className="btn-icon danger" title="Delete">🗑️</button>
        </div>
      </div>
      <h3>{task.title}</h3>
      {task.description && <p className="task-desc">{task.description}</p>}
      <div className="task-footer">
        <span className="due-date">{formatDate(due)}</span>
        <button onClick={toggleStatus} className="btn btn-sm">
          {task.status === 'completed' ? 'Mark Incomplete' : task.status === 'in-progress' ? 'Mark Done' : 'Start'}
        </button>
      </div>
    </div>
  );
}
