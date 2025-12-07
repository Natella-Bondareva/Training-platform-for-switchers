import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import '../styles/CoursePage.css';

const parseSkills = (skillsStr) => {
    if (!skillsStr) return [];
    return skillsStr.split(',').map(s => s.trim()).filter(Boolean);
};

const parseProgramIncludes = (programStr) => {
    if (!programStr) return [];
    return programStr.split('\n').map(line => line.trim()).filter(Boolean);
};

const CourseDetailsContent = ({ course, loading, error }) => {
    if (loading) return <div className="course-details-section"><p>Loading course...</p></div>;
    if (error) return <div className="course-details-section"><p className="error-text">{error}</p></div>;
    if (!course) return null;

    const skills = parseSkills(course.details?.skillsRequired);
    const programIncludes = parseProgramIncludes(course.details?.programIncludes);

    return (
        <section className="course-details-section">
            <div className="course-main-content">
                <div className="course-header">
                    <h1>{course.title}</h1>
                    <h2>{course.details?.description?.split('\n')[0]}</h2>
                </div>

                <div className="course-info-grid">
                    <div className="info-box skills-box">
                        <h4>Skills required</h4>
                        <div className="skill-tags-list">
                            {skills.length > 0 ? skills.map(skill => (
                                <span key={skill} className="skill-tag">{skill}</span>
                            )) : <span className="skill-tag">No skills listed</span>}
                        </div>
                    </div>

                    <div className="info-box included-box">
                        <h4>What is included in the program?</h4>
                        <ul className="included-list">
                            {programIncludes.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                        <div className="time-details">
                            <p><strong>Total time:</strong> {course.details?.totalHours || course.details?.programIncludes?.match(/Total time: (\d+)/)?.[1] || 'N/A'} hours</p>
                            <p><strong>Language:</strong> {course.details?.language || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                <div className="learn-section">
                    <h3>What you will learn</h3>
                    <ul>
                        {course.details?.description?.split('\n').slice(1, 6).map((line, idx) => (
                            <li key={idx}>{line}</li>
                        ))}
                    </ul>
                </div>

                <div className="review-section">
                    <h3>Review</h3>
                    <p>{course.details?.description}</p>
                </div>
            </div>

            <aside className="course-sidebar">
                <div className="join-card">
                    <button className="btn btn-join">JOIN THE COURSE</button>
                    <div className="course-status">
                        <span className="status-text">Participants: {course.participantsCount}</span>
                        <span className="status-number">Course ID: {course.id}</span>
                    </div>
                </div>
            </aside>
        </section>
    );
};

export const CoursePage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('[CoursePage] courseId from params:', courseId);
        if (!courseId || courseId === 'undefined') {
            setError('Invalid course ID. Please check the link.');
            setLoading(false);
            return;
        }
        const fetchCourse = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetch(`http://localhost:5044/api/courses/${courseId}`);
                const contentType = response.headers.get('content-type');
                let data;
                if (contentType && contentType.includes('application/json')) {
                    data = await response.json();
                    console.log('[CoursePage] API response:', data);
                } else {
                    const text = await response.text();
                    console.log('[CoursePage] API non-JSON response:', text);
                    throw new Error(text || 'Unexpected response from server');
                }
                if (!response.ok) {
                    console.log('[CoursePage] API error:', data);
                    throw new Error(data.message || `Failed to load course: ${response.status}`);
                }
                setCourse(data);
            } catch (err) {
                console.error('[CoursePage] Fetch error:', err);
                setError(err.message || 'Failed to load course');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [courseId]);

    return (
        <div className="start-page-wrapper">
            <div className="content-background"> 
                <main className="main-content">
                    <CourseDetailsContent course={course} loading={loading} error={error} />
                </main>
            </div>
        </div>
    );
};