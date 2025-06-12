import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const email = e.target.email.value;
    const password = e.target.password.value;
    const rememberMe = e.target.remember?.checked;

    try {
      // Simulate a small delay for "loading" effect
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create mock user data
      const userData = {
        email,
        name: email.split('@')[0], // Use the part before @ as name
        token: 'mock-token-' + Math.random().toString(36).substring(2),
      };
      
      // Set authentication state
      setIsLoggedIn(true);
      
      // Store user data and remember me preference
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        sessionStorage.setItem('user', JSON.stringify(userData));
      }
      
      navigate('/joblisting'); // Redirect to job listings after login
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100" style={{ background: '#f8f9fa' }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-3">JobDekho</h2>
                <p className="text-muted">Sign in to access your account</p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email"
                    placeholder="name@example.com"
                    required
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    name="password"
                    placeholder="••••••••"
                    required
                    minLength="1" // Changed from 6 to 1 to make it easier for testing
                  />
                </div>

                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="remember" 
                      name="remember"
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <a href="/forgot-password" className="text-decoration-none">
                    Forgot password?
                  </a>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing in...
                    </>
                  ) : 'Sign In'}
                </button>

                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;