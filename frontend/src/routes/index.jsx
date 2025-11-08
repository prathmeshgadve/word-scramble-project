import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// --- Import Pages ---
import Landing from '../pages/Landing';
import Login from '../features/auth/Login';
import Signup from '../features/auth/Signup';
import Dashboard from '../pages/Dashboard';
import GameSolo from '../features/game/GameSolo';
import Profile from '../features/profile/Profile'; // <-- IMPORT REAL
import AdminDashboard from '../features/admin/AdminDashboard'; // <-- IMPORT REAL
// import Leaderboard from '../pages/Leaderboard'; // From your plan

// --- Placeholders ---
// We didn't build this, but you can add it later
const PlaceholderLeaderboard = () => <h2>Leaderboard (Coming Soon)</h2>;

const AppRoutes = () => {
  return (
    <Routes>
      {/* === Public Routes === */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/leaderboard" element={<PlaceholderLeaderboard />} />

      {/* === Protected Routes (Must be logged in) === */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game/solo" element={<GameSolo />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* === Admin Routes (Must be admin) === */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        {/* You could add more routes here like /admin/words, /admin/users */}
      </Route>

      {/* === Catch-all 404 Route === */}
      <Route path="*" element={<h2>404: Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;