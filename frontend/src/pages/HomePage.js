import React from 'react';
import { Footer } from '../components/Footer';
import '../styles/HomePage.css';
import HeroImage from '../images/hero-home-page.jpg';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="site-header">
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="site-name-link">Site name</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/support">Technical support</Link></li>
                <li><Link to="/courses">All courses</Link></li> 
                <li><Link to="/payments">Payments</Link></li>
            </ul>
            <div className="nav-actions">
                <button className="btn btn-login">Login</button>
                <button className="btn btn-signup">Sign-Up</button>
            </div>
        </nav>
    </header>
);

const HeroSection = () => (
    <section className="hero-section">
        <div className="hero-content">
            <div className="hero-image-container">
                <img 
                    src={HeroImage} 
                    alt="People climbing success stairs" 
                    className="full-width-image" 
                />
            </div>
            <div className="hero-popup">
                <p>
                    Enroll today! Discover new skills and big teachings. Start your career path right now with free courses. Get 
                    free access to 100+ professional courses.
                </p>
                <div className="hero-buttons">
                    <button className="btn btn-popup-login">Login</button>
                    <button className="btn btn-popup-signup">Sign-Up Now!</button>
                </div>
            </div>
        </div>
    </section>
);

const RoleCard = ({ title, description, imagePlaceholder }) => (
    <div className="role-card">
        <div className="card-header">
            <div className="card-image-placeholder">{imagePlaceholder}</div>
        </div>
        <div className="card-body">
            <h3>{title}</h3>
            <p>{description}</p>
            <button className="btn btn-view-path">View Path</button>
        </div>
    </div>
);

const RoleSelectionSection = () => (
    <section className="role-selection-section">
        <div className="section-header">
            <h2>Select a role</h2>
            <p>Get started with professional courses and find your career path.</p>
            <button className="btn btn-all-roles">View All</button>
        </div>
        
        <div className="role-cards-grid">
            <RoleCard 
                title="Data Analyst" 
                description="A data analyst collects, processes, and analyzes large datasets to identify trends and patterns that help organizations make informed business decisions. " 
                imagePlaceholder="[Image of a Data Analyst]"
            />
            <RoleCard 
                title="Data Scientist" 
                description="A data scientist is a professional who uses skills in statistics, mathematics, computer science, and business to analyze complex data, build predictive models, and extract actionable insights. " 
                imagePlaceholder="[Image of a Data Scientist]"
            />
            <RoleCard 
                title="Machine Learning Engineer" 
                description="A machine learning (ML) engineer is a professional who develops, builds, and deploys systems that allow computers to learn from data and make predictions. " 
                imagePlaceholder="[Image of a Machine Learning Engineer]"
            />
        </div>
    </section>
);

const CourseCard = ({ title, imagePlaceholder }) => (
    <div className="course-card">
        <div className="course-image-placeholder">{imagePlaceholder}</div>
        <div className="course-title">{title}</div>
    </div>
);

const GetStartedSection = () => (
    <section className="get-started-section">
        <div className="section-header">
            <h2>Get Started with Free Courses</h2>
            <button className="btn btn-view-all">View All</button>
        </div>
        <div className="course-categories">
            {['Beginning', 'Popular', 'Trending'].map(cat => (
                <span key={cat} className="category-tag">{cat}</span>
            ))}
        </div>
        <div className="course-cards-scroll">
            <CourseCard 
                title="Building and Deployment for Google Cloud" 
                imagePlaceholder=""
            />
            <CourseCard 
                title="Frontend Software Engineering & App Development" 
                imagePlaceholder=""
            />
            <CourseCard 
                title="Data visualization with Tableau" 
                imagePlaceholder=""
            />
        </div>
    </section>
);

const CertificateItem = ({ title, instructorPlaceholder }) => (
    <div className="certificate-item">
        <p className="cert-title">{title}</p>
        <div className="cert-instructor">{instructorPlaceholder}</div>
    </div>
);

const CertificatesSection = () => (
    <section className="certificates-section">
        <h2>The most popular certificates</h2>
        <p className="section-description">
            Explore our most popular certificates and jump-start your future career.
        </p>
        <div className="certificate-grid">
            <CertificateItem 
                title="Data Analyst by Google"
                instructorPlaceholder=""
            />
            <CertificateItem 
                title="Google Project Management"
                instructorPlaceholder=""
            />
            <CertificateItem 
                title="IT Support"
                instructorPlaceholder=""
            />
            <CertificateItem 
                title="UI/UX Design by Google"
                instructorPlaceholder=""
            />
        </div>
    </section>
);


export const HomePage = () => {
    return (
        <div className="start-page-wrapper">
            <div className="content-background"> 

                <Header />
                
                <main className="main-content">
                    
                    <HeroSection />
                    
                    <RoleSelectionSection />
                    
                    <GetStartedSection />
                    
                    <CertificatesSection />
                
                </main>
            </div>
            
            <Footer />
        </div>
    );
};