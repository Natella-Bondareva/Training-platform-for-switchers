import React from 'react';
import { Footer } from '../components/Footer'; 
import { Link } from 'react-router-dom'; 
import '../styles/AllCoursesPage.css'; 

const Header = () => (
    <header className="site-header">
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="site-name-link">Site name</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/support">Technical support</Link></li>
                <li><Link to="/courses" className="active-nav-link">All courses</Link></li> 
                <li><Link to="/payments">Payments</Link></li>
            </ul>
            <div className="nav-actions">
                <button className="btn btn-login">Login</button>
                <button className="btn btn-signup">Sign-Up</button>
            </div>
        </nav>
    </header>
);

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
                <Header />
                <main className="main-content">
                    <AllCoursesContent />
                </main>
            </div>
            <Footer />
        </div>
    );
};