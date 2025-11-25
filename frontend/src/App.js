import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AllCoursesPage } from './pages/AllCoursesPage';
import { CoursePage } from './pages/CoursePage'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<AllCoursesPage />} />
          <Route path="/course/:courseId" element={<CoursePage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;