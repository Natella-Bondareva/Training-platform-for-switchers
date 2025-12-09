import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AllCoursesPage } from './pages/AllCoursesPage';
import { CoursePage } from './pages/CoursePage';
import CourseDetailPage from './pages/CourseDetailPage'; 
import CreateCoursePage from './pages/CreateCoursePage';
import MentorCoursesPage from './pages/MentorCoursesPage';
import PaymentPage from './pages/PaymentPage';
import TechnicalSupportPageForm from './pages/TechnicalSupportPage';
import RegisterPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import LessonDetailPage from './pages/LessonDetailPage';
import TaskDetailPage from './pages/TaskDetailPage';
import PaymentPage2 from "./pages/PaymentPage2";


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
          <Route path="/study/:courseId" element={<CourseDetailPage />} />
          <Route path="/create-course" element={<CreateCoursePage />} />
          <Route path="/my-courses" element={<MentorCoursesPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment2" element={<PaymentPage2 />} />
          <Route path="/tecnicalsupport" element={<TechnicalSupportPageForm />} />
          <Route path="/profile/:userId" element={<UserProfilePage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/study/:courseId/lesson/:lessonId" element={<LessonDetailPage />} />
          <Route path="/study/:courseId/task/:taskId" element={<TaskDetailPage />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
