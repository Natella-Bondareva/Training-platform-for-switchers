import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/AllCoursesPage.css'; 

const CourseCardPlaceholder = ({ courseId }) => (
    <Link to={`/course/${courseId}`} className="course-grid-card">
        <div className="card-placeholder">
            All courses
        </div>
    </Link>
);

const AllCoursesContent = () => (
    <section className="all-courses-content">
        <h2>Choose a course to study</h2>
        
        <div className="search-bar-container">
            <input type="text" placeholder="Search for courses..." className="search-input" />
            <span className="search-icon">🔍</span>
        </div>

        <div className="course-grid">
            <CourseCardPlaceholder courseId="ibm-ai" /> 
            <CourseCardPlaceholder courseId="google-pm" />
            {[...Array(9)].map((_, index) => (
                <CourseCardPlaceholder key={index} courseId={`course-${index + 1}`} />
            ))}
        </div>
    </section>
);

export const AllCoursesPage = () => {
    return (
        <div className="start-page-wrapper">
            <div className="content-background"> 
                <main className="main-content-all-courses">
                    <AllCoursesContent />
                </main>
            </div>
        </div>
    );
};
