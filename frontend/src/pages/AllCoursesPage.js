import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/AllCoursesPage.css'; 

const CourseCard = ({ course }) => {
    const backgroundStyle = course.image
        ? { backgroundImage: `url(${course.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : { backgroundColor: '#000000' };

    // Make the whole card clickable and pass the id in the route
    return (
        <Link
            to={`/course/${course.id}`}
            className="course-grid-card"
            style={backgroundStyle}
            aria-label={`View details for course ${course.title}`}
            tabIndex={0}
        >
            {!course.image && (
                <div className="card-placeholder">
                    {course.title}
                </div>
            )}
        </Link>
    );
};

const AllCoursesContent = ({ courses, loading, error }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p className="loading-text">Loading courses...</p>;
    if (error) return <p className="error-text">{error}</p>;

    return (
        <section className="all-courses-content">
            <h2>Choose a course to study</h2>
            
            <div className="search-bar-container">
                <input 
                    type="text" 
                    placeholder="Search for courses..." 
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
            </div>

            <div className="course-grid">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <p className="no-courses-text">No courses found.</p>
                )}
            </div>
        </section>
    );
};

export const AllCoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const response = await fetch('http://localhost:5044/api/courses', { headers });
                if (!response.ok) {
                    const contentType = response.headers.get('content-type');
                    let errMsg = response.statusText;
                    if (contentType && contentType.includes('application/json')) {
                        const errData = await response.json();
                        errMsg = errData.message || JSON.stringify(errData);
                    } else {
                        const text = await response.text();
                        errMsg = text || response.statusText;
                    }
                    throw new Error(`Failed to fetch courses: ${errMsg}`);
                }

                const data = await response.json();
                console.log('[AllCoursesPage] courses from API:', data);
                setCourses(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="start-page-wrapper">
            <div className="content-background"> 
                <main className="main-content-all-courses">
                    <AllCoursesContent courses={courses} loading={loading} error={error} />
                </main>
            </div>
        </div>
    );
};
