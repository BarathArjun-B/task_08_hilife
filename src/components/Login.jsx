import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check if there is a pending registration success message to show
  useEffect(() => {
    const msg = localStorage.getItem('quiz_register_success');
    if (msg) {
      setSuccessMessage(msg);
      localStorage.removeItem('quiz_register_success');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setGeneralError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      // Fetch users list
      const usersStr = localStorage.getItem('quiz_users');
      const users = usersStr ? JSON.parse(usersStr) : [];
      
      const normalizedEmail = formData.email.trim().toLowerCase();
      
      // Look for match
      const matchedUser = users.find(
        (u) => u.email.toLowerCase() === normalizedEmail && u.password === formData.password
      );
      
      if (!matchedUser) {
        setGeneralError('Invalid email address or password.');
        return;
      }
      
      // Save current session
      const sessionUser = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email
      };
      localStorage.setItem('quiz_current_user', JSON.stringify(sessionUser));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login Error:', err);
      setGeneralError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Log in to your exam portal profile</p>
        
        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}
        
        {generalError && (
          <div className="alert alert-danger">
            {generalError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="form-error">⚠️ {errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="form-error">⚠️ {errors.password}</span>}
          </div>
          
          <button type="submit" className="btn btn-primary btn-block" style={{ width: '100%', marginTop: '1rem' }}>
            Log In
          </button>
        </form>
        
        <p className="auth-redirect">
          Don't have an account? <Link to="/register" className="auth-link">Register Here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
