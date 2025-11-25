import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { AllCoursesPage } from './pages/AllCoursesPage';
import { CoursePage } from './pages/CoursePage'; 
import { PaymentPage, TechnicalSupportPageForm } from './pages/TechnicalSupportPage'; 

import { CoursePage } from './pages/CoursePage';

import RegisterPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          {/* Основні сторінки */}
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<AllCoursesPage />} />
          <Route path="/course/:courseId" element={<CoursePage />} />

          {/* Авторизація */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/course/:courseId" element={<CoursePage />} /> 
          <Route path="/payment" element = {<PaymentPage />} />
          <Route path="/tecnicalsupport" element = {<TechnicalSupportPageForm />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;