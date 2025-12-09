import React, { useState, useEffect } from 'react';
import styles from '../styles/CourseDetail.module.css';
import { useParams, useNavigate } from 'react-router-dom';


const MOCK_COURSE_DATA = {
    101: {
        title: "Learn C#",
        progress: 34,
        sections: [
            {
                id: 1,
                title: "1. Fundamentals of Programming",
                isCompleted: false,
                lessons: [
                    { id: 11, title: "Lection #1 (...)", isCompleted: true },
                    { id: 12, title: "Final test", isCompleted: false, isTest: true },
                    { id: 13, title: "Lection #2 (...)", isCompleted: false },
                    { id: 14, title: "Lection #3 (...)", isCompleted: false },
                    { id: 15, title: "Lection #4 (...)", isCompleted: false },
                    { id: 16, title: "Lection #5 (...)", isCompleted: false },
                ]
            },
            {
                id: 2,
                title: "2. Development Tools & Environment",
                isCompleted: false,
                lessons: [
                    { id: 21, title: "Setup VS Code", isCompleted: false },
                    { id: 22, title: "Basic Debugging", isCompleted: false },
                ]
            }
        ],
        tasks: [
            { id: 1011, title: "Task #1 (...)", isCompleted: false },
            { id: 1012, title: "Task #2 (...)", isCompleted: true },
            { id: 1013, title: "Task #3 (...)", isCompleted: false },
        ],
        roadmap: [
            { id: 2011, title: "Step 1: Fundamentals of Programming" },
            { id: 2012, title: "Step 2: Development Tools & Environment" },
            { id: 2013, title: "Step 3: Core Libraries" },
        ]
    },
};

// Modal for editing lesson
const EditLessonModal = ({ lesson, onClose, onLessonUpdated }) => {
    const [form, setForm] = useState({
        title: lesson?.title || '',
        videoUrl: lesson?.videoUrl || '',
        description: lesson?.description || '',
        testUrl: lesson?.testUrl || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setForm({
            title: lesson?.title || '',
            videoUrl: lesson?.videoUrl || '',
            description: lesson?.description || '',
            testUrl: lesson?.testUrl || '',
        });
    }, [lesson]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) {
            setError('Title is required');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const payload = {
                title: form.title,
                videoUrl: form.videoUrl,
                description: form.description,
                testUrl: form.testUrl,
                courseId: Number(lesson.courseId || lesson.courseId),
            };

            const res = await fetch(`http://localhost:5044/api/lessons/${lesson.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || `Failed to update lesson (${res.status})`);
            }

            const data = await res.json();
            console.log('[EditLessonModal] response:', data);
            alert('Lesson updated successfully!');
            if (onLessonUpdated) onLessonUpdated();
            onClose();
        } catch (err) {
            console.error('[EditLessonModal] error:', err);
            setError(err.message || 'Failed to update lesson');
        } finally {
            setLoading(false);
        }
    };

    if (!lesson) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: '#fff', borderRadius: 8, padding: 20,
                width: '90%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto'
            }}>
                <h2>Edit Lesson</h2>
                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'block', marginBottom: 12 }}>
                        Title <span style={{ color: 'red' }}>*</span>
                        <input
                            name="title" value={form.title} onChange={handleChange}
                            style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
                            required
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: 12 }}>
                        Video URL
                        <input
                            name="videoUrl" value={form.videoUrl} onChange={handleChange}
                            type="url"
                            style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: 12 }}>
                        Description
                        <textarea
                            name="description" value={form.description} onChange={handleChange}
                            rows={4}
                            style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: 12 }}>
                        Test URL
                        <input
                            name="testUrl" value={form.testUrl} onChange={handleChange}
                            type="url"
                            style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
                        />
                    </label>
                    {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button type="submit" disabled={loading} style={{ flex: 1, padding: 10, cursor: 'pointer' }}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button type="button" onClick={onClose} disabled={loading} style={{ flex: 1, padding: 10, cursor: 'pointer', backgroundColor: '#ddd' }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Компоненти для табів
const LessonItem = ({ lesson }) => {
    const itemClass = lesson.isTest 
        ? styles.lessonTest 
        : lesson.isCompleted 
            ? styles.lessonCompleted 
            : styles.lessonNotCompleted;
    const isCompleted = lesson.isCompleted || (lesson.isTest && lesson.isCompleted);

    return (
        <div className={`${styles.lessonItem} ${itemClass}`}>
            <span>{lesson.title}</span>
            <span className={styles.lessonStatus}>
                {isCompleted ? "✔" : "⬇"}
            </span>
        </div>
    );
};

const LessonCard = ({ lesson, courseId, isMentor, onEdit }) => {
    const navigate = useNavigate();

    return (
        <div 
            className={styles.lessonCard}
            onClick={() => navigate(`/study/${courseId}/lesson/${lesson.id}`)}
            style={{
                padding: '15px',
                margin: '10px',
                backgroundColor: '#f5f5f5',
                border: '2px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                minWidth: '150px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e0e0e0';
                e.currentTarget.style.borderColor = '#999';
                e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
                e.currentTarget.style.borderColor = '#ddd';
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'bold' }}>
                    {lesson.title}
                </h4>
                {isMentor && (
                    <button
                        onClick={(e) => { e.stopPropagation(); if (onEdit) onEdit(lesson); }}
                        style={{ marginLeft: 8, padding: '6px 8px', fontSize: 12, cursor: 'pointer' }}
                    >
                        Edit
                    </button>
                )}
            </div>
            <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                {lesson.description ? lesson.description.substring(0, 50) + '...' : 'Click to view'}
            </p>
        </div>
    );
};

const SectionItem = ({ section, courseId, lessons }) => { // отримуємо courseId і lessons пропсом
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    
    const sectionLessons = lessons?.filter(l => l.sectionId === section.id) || section.lessons || [];

    return (
        <div className={styles.sectionItem}>
            <div className={styles.sectionHeader} onClick={() => setIsOpen(!isOpen)}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <span className={styles.sectionArrow}>&#x25BC;</span>
            </div>
            {isOpen && (
                <div className={styles.lessonList}>
                    {sectionLessons?.map(lesson => (
                        <div 
                            key={lesson.id} 
                            onClick={() => navigate(`/study/${courseId}/lesson/${lesson.id}`)}
                        >
                            <LessonItem lesson={lesson} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const TaskItem = ({ task, courseId }) => {
    const navigate = useNavigate();

    return (
        <div 
            className={`${styles.lessonItem} ${task.isCompleted ? styles.lessonCompleted : styles.lessonNotCompleted}`}
            onClick={() => navigate(`/study/${courseId}/task/${task.id}`)}
        >
            <span>{task.title}</span>
            <span className={styles.lessonStatus}>
                {task.isCompleted ? "✔" : "⬇"}
            </span>
        </div>
    );
};

const RoadmapItem = ({ step }) => (
    <div className={styles.lessonItem}>
        <span>{step.title}</span>
    </div>
);

// Modal for creating lesson
const AddLessonModal = ({ courseId, onClose, onLessonAdded }) => {
    const [form, setForm] = useState({
        title: '',
        videoUrl: '',
        description: '',
        testUrl: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) {
            setError('Title is required');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const payload = {
                title: form.title,
                videoUrl: form.videoUrl,
                description: form.description,
                testUrl: form.testUrl,
                courseId: Number(courseId),
            };

            console.log('[AddLessonModal] payload:', payload);

            const res = await fetch('http://localhost:5044/api/lessons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || `Failed to create lesson (${res.status})`);
            }

            const data = await res.json();
            console.log('[AddLessonModal] response:', data);
            alert('Lesson created successfully!');
            onLessonAdded();
            onClose();
        } catch (err) {
            console.error('[AddLessonModal] error:', err);
            setError(err.message || 'Failed to create lesson');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: '#fff', borderRadius: 8, padding: 20,
                width: '90%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto'
            }}>
                <h2>Add Lesson</h2>
                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'block', marginBottom: 12 }}>
                        Title <span style={{ color: 'red' }}>*</span>
                        <input
                            name="title" value={form.title} onChange={handleChange}
                            style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
                            required
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: 12 }}>
                        Video URL
                        <input
                            name="videoUrl" value={form.videoUrl} onChange={handleChange}
                            type="url"
                            style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: 12 }}>
                        Description
                        <textarea
                            name="description" value={form.description} onChange={handleChange}
                            rows={4}
                            style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: 12 }}>
                        Test URL
                        <input
                            name="testUrl" value={form.testUrl} onChange={handleChange}
                            type="url"
                            style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
                        />
                    </label>
                    {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button type="submit" disabled={loading} style={{ flex: 1, padding: 10, cursor: 'pointer' }}>
                            {loading ? 'Creating...' : 'Create Lesson'}
                        </button>
                        <button type="button" onClick={onClose} disabled={loading} style={{ flex: 1, padding: 10, cursor: 'pointer', backgroundColor: '#ddd' }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('lections');
    const [showAddLessonModal, setShowAddLessonModal] = useState(false);
    const [isMentor, setIsMentor] = useState(false);
    const [editLesson, setEditLesson] = useState(null);

    // helper to fetch lessons for the course
    const fetchLessons = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5044/api/lessons/course/${courseId}`, {
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                }
            });
            if (res.ok) {
                const data = await res.json();
                setLessons(data);
                console.log('[CourseDetailPage] lessons fetched:', data);
            } else {
                console.error('[CourseDetailPage] failed to fetch lessons, status:', res.status);
            }
        } catch (err) {
            console.error('[CourseDetailPage] fetchLessons error:', err);
        }
    };

    // Log courseId on mount and when it changes
    useEffect(() => {
        console.log('[CourseDetailPage] courseId from params:', courseId);
        // Check if current user is Mentor role
        const userRole = localStorage.getItem('role');
        const isMentorRole = userRole === 'Mentor';
        console.log('[CourseDetailPage] User role:', userRole, 'Is Mentor:', isMentorRole);
        setIsMentor(isMentorRole);
    }, [courseId]);

    useEffect(() => {
        const fetchCourse = async () => {
            setIsLoading(true);
            try {
                const courseResponse = await fetch(`http://localhost:5044/api/courses/${courseId}`);
                if (!courseResponse.ok) {
                    throw new Error('Failed to fetch course');
                }
                const courseInfoData = await courseResponse.json();
                console.log('[CourseDetailPage] Course info from API:', courseInfoData);

                setCourseData({
                    title: courseInfoData.title || `Course ${courseId}`,
                    progress: 34,
                    sections: [
                        {
                            id: 1,
                            title: "1. Course Lessons",
                            isCompleted: false,
                        }
                    ],
                    tasks: [],
                    roadmap: []
                });

                // fetch lessons after course info
                await fetchLessons();
            } catch (err) {
                console.error('[CourseDetailPage] Fetch error:', err);
                // Fallback до мок-даних
                const data = MOCK_COURSE_DATA[Number(courseId)];
                setCourseData(data || null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    if (isLoading) return <div className={styles.loadingContainer}>Loading course details...</div>;
    if (!courseData) return <div className={styles.errorContainer}>Course not found. ID: {courseId}</div>;

    const progressBarStyle = { width: `${courseData.progress}%` };

    return (
        <div className={styles.courseDetailPageWrapper}>
            <div className={styles.courseDetailContainer}>
                <h1 className={styles.courseTitle}>{courseData.title}</h1>
                <div className={styles.progressBarSection}>
                    <div className={styles.progressBarWrapper}>
                        <div className={styles.progressFill} style={progressBarStyle}></div>
                    </div>
                    <span className={styles.progressText}>{courseData.progress}%</span>
                </div>

                <div className={styles.courseNav}>
                    <button 
                        className={`${styles.navItem} ${activeTab === 'lections' ? styles.navItemActive : ''}`}
                        onClick={() => setActiveTab('lections')}
                    >
                        Lections
                    </button>
                    <button 
                        className={`${styles.navItem} ${activeTab === 'tasks' ? styles.navItemActive : ''}`}
                        onClick={() => setActiveTab('tasks')}
                    >
                        Tasks (site name Plus)
                    </button>
                </div>

                <div className={styles.courseContent}>
                    {activeTab === 'lections' && (
                        <div>
                            {isMentor && (
                                <button
                                    onClick={() => setShowAddLessonModal(true)}
                                    style={{
                                        marginBottom: 16, padding: '10px 16px',
                                        backgroundColor: '#4CAF50', color: '#fff',
                                        border: 'none', borderRadius: 4, cursor: 'pointer'
                                    }}
                                >
                                    + Add Lesson
                                </button>
                            )}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {lessons.length > 0 ? (
                                    lessons.map(lesson => (
                                        <LessonCard key={lesson.id} lesson={lesson} courseId={courseId} isMentor={isMentor} onEdit={(l) => setEditLesson(l)} />
                                    ))
                                ) : (
                                    <p>No lessons available</p>
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === 'tasks' && courseData.tasks?.map(task => (
                        <TaskItem key={task.id} task={task} courseId={courseId} />
                    ))}
                    {activeTab === 'roadmap' && courseData.roadmap?.map(step => (
                        <RoadmapItem key={step.id} step={step} />
                    ))}
                </div>
            </div>
            {showAddLessonModal && (
                <AddLessonModal
                    courseId={courseId}
                    onClose={() => setShowAddLessonModal(false)}
                    onLessonAdded={() => {
                        // use shared fetchLessons helper
                        fetchLessons();
                    }}
                />
            )}

            {editLesson && (
                <EditLessonModal
                    lesson={editLesson}
                    onClose={() => setEditLesson(null)}
                    onLessonUpdated={() => fetchLessons()}
                />
            )}
        </div>
    );
};
export { MOCK_COURSE_DATA }; 
export default CourseDetailPage;
