import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Auth.module.css';

const LOGIN_API = 'http://localhost:5044/api/accounts/login';

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    code: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
        code: formData.code || undefined
      };

      const response = await fetch(LOGIN_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text };
      }

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Expecting { token: '...', role: 'User' }
      const token = data.token;
      const role = data.role || data.roles || 'User';

      if (!token) {
        throw new Error('No token received from server');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // notify other components about auth change
      window.dispatchEvent(new Event('authChange'));

      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authBox}>
        <h2 className={styles.title}>Login to your account</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />

          <input
            type="text"
            name="code"
            placeholder="Personal code (optional)"
            value={formData.code}
            onChange={handleChange}
            disabled={isLoading}
          />

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className={styles.bottomText} style={{ marginTop: '10px' }}>
          <span onClick={() => !isLoading && navigate('/forgot-password')}>
            I forgot my password
          </span>
        </div>

        <div className={styles.bottomText}>
          Don’t have an account?{' '}
          <span onClick={() => !isLoading && navigate('/register')}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
}
