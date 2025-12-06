import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // <--- ПОТРІБЕН ДЛЯ НАВІГАЦІЇ
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


const ProfileHeader = ({ userData, onEdit }) => {
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
                <button className={styles.editBtn} onClick={onEdit}>Edit profile</button>
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

const EditForm = ({ initial, onCancel, onSave }) => {
    const [form, setForm] = useState({
        fullName: initial.name || '',
        birthDate: initial.raw && initial.raw.birthDate ? initial.raw.birthDate.split('T')[0] : '',
        city: initial.location || '',
        university: initial.study || '',
        linkedInUrl: initial.linkedin || '',
    });
    const [saving, setSaving] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (localError) setLocalError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        // basic validation
        if (!form.fullName.trim() || !form.birthDate.trim() || !form.city.trim() || !form.university.trim()) {
            setLocalError('Please fill required fields');
            return;
        }

        setSaving(true);
        try {
            await onSave({
                fullName: form.fullName.trim(),
                birthDate: form.birthDate.trim(),
                city: form.city.trim(),
                university: form.university.trim(),
                linkedInUrl: form.linkedInUrl.trim() || undefined,
            });
        } catch (err) {
            setLocalError(err.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form className={styles.editForm} onSubmit={handleSubmit}>
            <label>
                Full name
                <input name="fullName" value={form.fullName} onChange={handleChange} required />
            </label>
            <label>
                Birth date
                <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} required />
            </label>
            <label>
                City
                <input name="city" value={form.city} onChange={handleChange} required />
            </label>
            <label>
                University
                <input name="university" value={form.university} onChange={handleChange} required />
            </label>
            <label>
                LinkedIn URL
                <input name="linkedInUrl" type="url" value={form.linkedInUrl} onChange={handleChange} />
            </label>

            {localError && <div className={styles.error}>{localError}</div>}

            <div className={styles.formActions}>
                <button type="button" onClick={onCancel} disabled={saving}>Cancel</button>
                <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
        </form>
    );
};

const UserProfilePage = () => {
    const { id } = useParams();
    const userId = id || '1';
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    const computeAge = (birthDateString) => {
        if (!birthDateString) return null;
        const bd = new Date(birthDateString);
        if (Number.isNaN(bd.getTime())) return null;
        const diff = Date.now() - bd.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    };

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            setError('');
            try {
                const token = localStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const url = `http://localhost:5044/api/accounts/profile/${userId}`;
                const response = await fetch(url, { headers });

                let data;
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    data = await response.json();
                } else {
                    const text = await response.text();
                    throw new Error(text || 'Unexpected response from server');
                }

                if (!response.ok) {
                    throw new Error(data.message || `Failed to load profile: ${response.status}`);
                }

                // Map API response to component shape
                const mapped = {
                    name: data.fullName || (data.user && data.user.email) || 'User',
                    age: computeAge(data.birthDate),
                    location: data.city || '',
                    study: (data.university || '').trim(),
                    linkedin: data.linkedInUrl || '',
                    email: (data.user && data.user.email) || '',
                    onSiteSince: data.user && data.user.createdAt ? new Date(data.user.createdAt).getFullYear() : null,
                    courses: data.courses || [],
                    raw: data,
                };

                setUserData(mapped);
            } catch (err) {
                setError(err.message || 'Failed to load profile');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    // Save updated profile via PUT
    const handleSaveProfile = async (updated) => {
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;

        const url = `http://localhost:5044/api/accounts/profile/${userId}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(updated),
        });

        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            data = { message: text };
        }

        if (!response.ok) {
            throw new Error(data.message || `Failed to save profile: ${response.status}`);
        }

        // Update UI by refetching or applying changes locally
        const newMapped = {
            name: data.fullName || updated.fullName,
            age: computeAge(data.birthDate || updated.birthDate),
            location: data.city || updated.city,
            study: (data.university || updated.university || '').trim(),
            linkedin: data.linkedInUrl || updated.linkedInUrl || '',
            email: (data.user && data.user.email) || (userData && userData.email) || '',
            onSiteSince: data.user && data.user.createdAt ? new Date(data.user.createdAt).getFullYear() : (userData && userData.onSiteSince) || null,
            courses: data.courses || (userData && userData.courses) || [],
            raw: data,
        };

        // if API returns empty courses, provide pseudo sample courses as fallback
        if (!newMapped.courses || newMapped.courses.length === 0) {
            newMapped.courses = [
                { id: 201, name: 'Backend Engineer (sample)', progress: 34 },
                { id: 202, name: 'Frontend Development (sample)', progress: 0 },
                { id: 203, name: 'Database Essentials (sample)', progress: 100 },
            ];
        }

        setUserData(newMapped);
        setIsEditing(false);
        alert(data.message || 'Profile saved');
    };

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <p className={styles.loadingText}>Loading user profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorText}>{error}</p>
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
                {isEditing ? (
                    <div>
                        <h2>Edit profile</h2>
                        <EditForm
                            initial={userData}
                            onCancel={() => setIsEditing(false)}
                            onSave={handleSaveProfile}
                        />
                    </div>
                ) : (
                    <>
                        <ProfileHeader userData={userData} onEdit={() => setIsEditing(true)} />

                        <hr className={styles.divider} />

                        <CoursesSection courses={userData.courses} />
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;