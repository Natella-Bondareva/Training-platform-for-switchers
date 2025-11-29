import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AllCoursesPage } from './pages/AllCoursesPage';
import { CoursePage } from './pages/CoursePage'; 
import PaymentPage from './pages/PaymentPage';
import TechnicalSupportPageForm from './pages/TechnicalSupportPage';
import RegisterPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('home');

  const goToPage = (page) => {
    if (page === 'login') setIsLoggedIn(true);
    if (page === 'logout') setIsLoggedIn(false);
    setActiveView(page);
    console.log('Перехід на:', page);
  };

  return (
    <Router>
      <Header 
        isLoggedIn={isLoggedIn} 
        activeView={activeView} 
        goToPage={goToPage} 
      />

      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<AllCoursesPage />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/tecnicalsupport" element={<TechnicalSupportPageForm />} />
        </Routes>
      </div>

      {/* Footer один на всі сторінки */}
      <Footer />
    </Router>
  );
}

export default App;
