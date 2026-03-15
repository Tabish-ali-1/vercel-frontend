import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (page = 1, search = '', status = '') => {
    setLoading(true);
    try {
      const { data } = await api.get('/tasks', {
        params: { page, limit: 10, search, status }
      });
      setTasks(data.tasks);
      setPagination(data.pagination);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    const { data } = await api.post('/tasks', task);
    await fetchTasks(pagination.page);
    return data;
  };

  const updateTask = async (id, updates) => {
    const { data } = await api.put(`/tasks/${id}`, updates);
    await fetchTasks(pagination.page);
    return data;
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    await fetchTasks(pagination.page);
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      pagination,
      loading,
      fetchTasks,
      addTask,
      updateTask,
      deleteTask
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
}
