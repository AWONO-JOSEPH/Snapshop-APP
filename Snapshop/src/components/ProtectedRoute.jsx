import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function isAuthenticated() {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return false;
    const data = JSON.parse(raw);
    return Boolean(data?.token?.access);
  } catch (_) {
    return false;
  }
}

const ProtectedRoute = ({ children }) => {
  const authed = isAuthenticated();
  const location = useLocation();
  if (!authed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;

