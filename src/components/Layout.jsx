import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  return (
    <div className="layout">
      <header className="header">
        <Link to="/dashboard" className="logo">Task Manager</Link>
        <nav>
          <span className="user-name">{user?.name}</span>
          <button onClick={logout} className="btn btn-ghost">Logout</button>
        </nav>
      </header>
      <main className="main">
        {children || <Outlet />}
      </main>
    </div>
  );
}
