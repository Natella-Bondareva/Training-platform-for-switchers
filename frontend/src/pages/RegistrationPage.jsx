import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Auth.module.css';

const API_ENDPOINT = 'http://localhost:5044/api/accounts/register';
const DEFAULT_ROLE_ID = 1;

const INITIAL_FORM_STATE = {
  name: '',
  surname: '',
  email: '',
  password: '',
  city: '',
  university: '',
  birthDate: '',
  linkedInUrl: '',
};

const VALIDATION_ERRORS = {
  INVALID_EMAIL: 'Некоректний email',
  PASSWORD_TOO_SHORT: 'Пароль повинен містити мінімум 6 символів',
  REQUIRED_FIELD: 'Усі поля обов\'язкові',
  REGISTRATION_FAILED: 'Помилка реєстрації. Спробуйте ще раз',
};

function RegistrationPage() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateFormData = () => {
    if (!formData.name.trim() || !formData.surname.trim() || 
        !formData.email.trim() || !formData.password.trim() ||
        !formData.city.trim() || !formData.university.trim() ||
        !formData.birthDate.trim()) {
      setError(VALIDATION_ERRORS.REQUIRED_FIELD);
      return false;
    }

    if (!validateEmail(formData.email)) {
      setError(VALIDATION_ERRORS.INVALID_EMAIL);
      return false;
    }

    if (!validatePassword(formData.password)) {
      setError(VALIDATION_ERRORS.PASSWORD_TOO_SHORT);
      return false;
    }

    return true;
  };

  const buildRegistrationPayload = () => {
    const payload = {
      email: formData.email.trim(),
      password: formData.password.trim(),
      fullName: `${formData.name.trim()} ${formData.surname.trim()}`,
      city: formData.city.trim(),
      university: formData.university.trim(),
      birthDate: formData.birthDate.trim(),
      roleId: DEFAULT_ROLE_ID,
    };

    if (formData.linkedInUrl.trim()) {
      payload.linkedInUrl = formData.linkedInUrl.trim();
    }

    return payload;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateFormData()) {
      return;
    }

    setIsLoading(true);

    try {
      const payload = buildRegistrationPayload();
      console.log('Registration payload:', payload);
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Try to parse response as JSON, but handle non-JSON responses
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text };
      }

      if (!response.ok) {
        throw new Error(data.message || VALIDATION_ERRORS.REGISTRATION_FAILED);
      }

      // Success handling
      const successMessage = data.message || 'Реєстрація успішна!';
      console.log('[RegistrationPage] Registration successful:', successMessage);
      alert(successMessage);
      navigate('/login');
    } catch (err) {
      setError(err.message || VALIDATION_ERRORS.REGISTRATION_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.main}>
        <div className={styles.authWrapper}>
          <div className={styles.authBox}>
            <h2 className={styles.title}>Get started for free</h2>

            <form onSubmit={handleRegister} className={styles.form}>
              <div className={styles.row}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  value={formData.surname}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Create password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                disabled={isLoading}
                required
              />

              <input
                type="text"
                name="university"
                placeholder="University"
                value={formData.university}
                onChange={handleChange}
                disabled={isLoading}
                required
              />

              <input
                type="date"
                name="birthDate"
                placeholder="Birth Date"
                value={formData.birthDate}
                onChange={handleChange}
                disabled={isLoading}
                required
              />

              <input
                type="url"
                name="linkedInUrl"
                placeholder="LinkedIn URL (optional)"
                value={formData.linkedInUrl}
                onChange={handleChange}
                disabled={isLoading}
              />

              {error && <div className={styles.error}>{error}</div>}

              <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>

            <div className={styles.bottomText}>
              Already have an account?{" "}
              <span onClick={() => !isLoading && navigate('/login')}>Log in</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegistrationPage;
