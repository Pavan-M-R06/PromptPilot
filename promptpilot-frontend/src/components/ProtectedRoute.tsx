// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If a token is found, render the child route (our Dashboard)
  return <Outlet />;
}