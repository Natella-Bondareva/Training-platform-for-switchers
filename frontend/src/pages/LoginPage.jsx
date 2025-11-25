import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Auth.module.css';

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    code: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // ТУТ БУДЕ ЛОГІКА ЛОГІНУ ПІЗНІШЕ
    console.log("Login attempt:", formData);
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
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="code"
            placeholder="Personal code (optional)"
            value={formData.code}
            onChange={handleChange}
          />

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
        </form>

        <div
          className={styles.bottomText}
          style={{ marginTop: "10px" }}
        >
          <span onClick={() => navigate('/forgot-password')}>
            I forgot my password
          </span>
        </div>

        <div className={styles.bottomText}>
          Don’t have an account?{" "}
          <span onClick={() => navigate('/register')}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
}
