import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- ПОТРІБЕН ДЛЯ НАВІГАЦІЇ
import styles from '../styles/Profile.module.css'; 

// --- Під-компоненти для чистоти коду ---

// Компонент для відображення одного курсу
const CourseItem = ({ courseName, progress, courseId }) => { // courseId тепер обов'язковий
    const navigate = useNavigate(); // <--- АКТИВУЄМО НАВІГАЦІЮ
    
    // Стиль для заповнення прогрес-бару
    const progressStyle = {
        width: `${progress}%`,
    };
    
    const progressFillClass = progress === 100 ? styles.progressFillCompleted : styles.progressFill;

    // Обробник кліку для переходу на сторінку курсу
    const handleCourseClick = () => {
        // Перехід на /course/:courseId (наприклад, /course/101)
        navigate(`/study/${courseId}`); 
    };

    return (
        <div 
            className={styles.courseItem} 
            onClick={handleCourseClick} 
            role="button" 
            tabIndex="0"
        > 
            <div className={styles.courseInfo}>
                <p className={styles.courseCategory}>Course</p>
                <h3 className={styles.courseName}>{courseName}</h3>
            </div>
            
            <div className={styles.courseProgress}>
                <span className={styles.progressText}>{progress}%</span>
                <div className={styles.progressBar}>
                    <div className={progressFillClass} style={progressStyle}></div>
                </div>
                <span className={styles.arrowIcon}>&gt;</span>
            </div>
        </div>
    );
};

const CoursesSection = ({ courses }) => (
    <section className={styles.latestCourses}>
        <div className={styles.coursesHeader}>
            <h2>Latest Courses</h2>
            <button className={styles.allCoursesBtn}>All my courses</button>
        </div>
        <div className={styles.coursesList}>
            {courses.map(course => (
                <CourseItem 
                    key={course.id}
                    courseId={course.id}
                    courseName={course.name}
                    progress={course.progress}
                />
            ))}
        </div>
    </section>
);


const ProfileHeader = ({ userData }) => {
    const AvatarIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor" width="96" height="96">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
    );

    return (
        <header className={styles.profileHeader}>
            <div className={styles.avatarSection}>
                <div className={styles.avatar}>
                    <AvatarIcon />
                </div>
                <h1 className={styles.userName}>{userData.name}</h1>
                <button className={styles.editBtn}>Edit profile</button>
            </div>
            
            <div className={styles.infoSection}>
                <h2>About me:</h2>
                <p className={styles.infoLine}>
                    <span className={styles.infoLabel}>age:</span> {userData.age}
                </p>
                <p className={styles.infoLine}>
                    {userData.location}
                </p>
                <p className={styles.infoLine}>
                    {userData.study}
                </p>
                
                <h3>Contact Information:</h3>
                <p className={styles.infoLine}>
                    <span className={styles.infoLabel}>LinkedIn:</span> 
                    <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                        {userData.linkedin}
                    </a>
                </p>
                <p className={styles.infoLine}>
                    <span className={styles.infoLabel}>Email:</span> {userData.email}
                </p>

                <p className={styles.infoLine}>
                    On the site since {userData.onSiteSince}
                </p>
            </div>
        </header>
    );
};

const UserProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const mockData = {
                name: "Vasyl Pupkin",
                age: 39,
                location: "Cherkasy, Ukraine",
                study: "Student at Bohdan Khmelnytsky National University of Cherkasy",
                linkedin: "https://www.linkedin.com/in/vasylpupkin/",
                email: "vasyl.pupkin@example.com",
                onSiteSince: 2023,
                courses: [
                    { id: 101, name: "Backend Engineer (Java/Kotlin, Web Platform)", progress: 34 },
                    { id: 102, name: "Frontend Development (React)", progress: 0 },
                    { id: 103, name: "Database Essentials (SQL)", progress: 100 },
                ],
            };
            setUserData(mockData);
            setIsLoading(false);
        }, 800); 
    }, []);

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <p className={styles.loadingText}>Loading user profile...</p>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorText}>User profile data is unavailable.</p>
            </div>
        );
    }

    return (
        <div className={styles.profilePageWrapper}>
            <div className={styles.profileContainer}>
                
                <ProfileHeader userData={userData} />

                <hr className={styles.divider} />

                <CoursesSection courses={userData.courses} />
            </div>
        </div>
    );
};

export default UserProfilePage;