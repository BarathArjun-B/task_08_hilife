import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setGeneralError('');
  };

  const validate = () => {
    const newErrors = {};
    
    // Check for empty fields
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    
    // Email basic regex
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password minimum 4 characters
    if (formData.password && formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters long';
    }
    
    // Password match
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      // Get current users from LocalStorage
      const usersStr = localStorage.getItem('quiz_users');
      const users = usersStr ? JSON.parse(usersStr) : [];
      
      const normalizedEmail = formData.email.trim().toLowerCase();
      
      // Check for email uniqueness
      const emailExists = users.some((user) => user.email.toLowerCase() === normalizedEmail);
      if (emailExists) {
        setGeneralError('An account with this email address already exists');
        return;
      }
      
      // Create user object
      const newUser = {
        id: Date.now(),
        name: formData.name.trim(),
        email: normalizedEmail,
        password: formData.password
      };
      
      // Save back to LocalStorage
      users.push(newUser);
      localStorage.setItem('quiz_users', JSON.stringify(users));
      
      // Save temporary success banner message to show on Login screen
      localStorage.setItem('quiz_register_success', 'Account created successfully! Please log in.');
      
      // Redirect to login page
      navigate('/login');
    } catch (err) {
      console.error('Registration Error:', err);
      setGeneralError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join the examination portal to begin assessments</p>
        
        {generalError && (
          <div className="alert alert-danger">
            {generalError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="e.g. Arjun"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="form-error">⚠️ {errors.name}</span>}
          </div>
          
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
              placeholder="Minimum 4 characters"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="form-error">⚠️ {errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="form-error">⚠️ {errors.confirmPassword}</span>}
          </div>
          
          <button type="submit" className="btn btn-primary btn-block" style={{ width: '100%', marginTop: '1rem' }}>
            Register
          </button>
        </form>
        
        <p className="auth-redirect">
          Already have an account? <Link to="/login" className="auth-link">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
