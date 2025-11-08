import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../features/auth/useAuth';

const AdminRoute = () => {
  const { user } = useAuth();

  // Check if there is a user AND if that user is an admin
  return user && user.isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;