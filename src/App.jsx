import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Result from './components/Result';

// Route Guard for Protected Pages (Dashboard, Quiz, Result)
const ProtectedRoute = ({ children }) => {
  const currentUser = localStorage.getItem('quiz_current_user');
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Route Guard for Guest Pages (Login, Register)
const PublicRoute = ({ children }) => {
  const currentUser = localStorage.getItem('quiz_current_user');
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

// Shared Navigation Header
function NavigationBar() {
  const navigate = useNavigate();
  const currentUserStr = localStorage.getItem('quiz_current_user');
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

  const handleLogout = () => {
    // Note: Logging out must ONLY clear the active user session, NOT their quiz state or answers.
    // This allows resuming progress when they log back in.
    localStorage.removeItem('quiz_current_user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div 
        className="logo-container" 
        onClick={() => navigate('/dashboard')} 
        style={{ cursor: 'pointer' }}
      >
        <div className="logo-icon"></div>
        <span>quiz</span>
      </div>
      {currentUser && (
        <div className="nav-user">
          <span className="user-name-display">Welcome, <strong>{currentUser.name}</strong></span>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <NavigationBar />
        <Routes>
          {/* Guest / Public Routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />

          {/* Protected Portal Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/quiz" 
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/result" 
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            } 
          />

          {/* Default Wildcard Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
