import { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import ReminderToast from '../components/ReminderToast';

export default function Dashboard() {
  const { tasks, pagination, loading, fetchTasks } = useTasks();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [dismissedReminderIds, setDismissedReminderIds] = useState(() => new Set());

  useEffect(() => {
    fetchTasks(1, search, status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status]);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const dueSoon = tasks.filter(t => {
        if (dismissedReminderIds.has(t._id)) return false;
        const due = new Date(t.dueDate);
        const diff = (due - now) / (1000 * 60 * 60);
        return diff > 0 && diff <= 24 && t.status !== 'completed';
      });
      setReminders(prev => {
        const existing = new Set(prev.map(r => r._id));
        const newOnes = dueSoon.filter(t => !existing.has(t._id));
        const stillRelevant = prev.filter(r => dueSoon.some(d => d._id === r._id));
        return [...stillRelevant, ...newOnes];
      });
    };
    checkReminders();
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [tasks, dismissedReminderIds]);

  const openAdd = () => { setEditingTask(null); setModalOpen(true); };
  const openEdit = (task) => { setEditingTask(task); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditingTask(null); };

  const dismissReminder = (id) => {
    setDismissedReminderIds(prev => new Set(prev).add(id));
    setReminders((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="dashboard">
      <ReminderToast reminders={reminders} onDismiss={dismissReminder} />
      <div className="dashboard-header">
        <h1>My Tasks</h1>
        <button onClick={openAdd} className="btn btn-primary">+ Add Task</button>
      </div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {loading ? (
        <div className="loader">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">No tasks yet. Add one to get started!</div>
      ) : (
        <>
          <div className="task-grid">
            {tasks.map(task => (
              <TaskCard key={task._id} task={task} onEdit={openEdit} />
            ))}
          </div>
          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={pagination.page <= 1}
                onClick={() => fetchTasks(pagination.page - 1, search, status)}
              >Prev</button>
              <span>Page {pagination.page} of {pagination.totalPages}</span>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchTasks(pagination.page + 1, search, status)}
              >Next</button>
            </div>
          )}
        </>
      )}
      {modalOpen && (
        <TaskModal
          task={editingTask}
          onClose={closeModal}
          onSuccess={closeModal}
        />
      )}
    </div>
  );
}
