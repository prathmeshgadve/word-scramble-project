import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../features/auth/useAuth';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // If there is a user, show the child route (using <Outlet />)
  // Otherwise, redirect them to the /login page
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;