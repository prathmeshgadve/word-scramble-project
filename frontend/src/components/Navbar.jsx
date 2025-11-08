import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../features/auth/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#eee'
    }}>
      <Link to="/">
        <h3>Word Scramble</h3>
      </Link>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
        {user ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            {user.isAdmin && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <li>
              <button onClick={logout}>Logout ({user.username})</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;