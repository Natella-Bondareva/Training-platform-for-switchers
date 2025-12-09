import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/CourseDetail.module.css';

const LessonDetailPage = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [allLessons, setAllLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const fetchLessons = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:5044/api/lessons/course/${courseId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch lessons');
                }
                const lessonsData = await response.json();
                console.log('[LessonDetailPage] All lessons:', lessonsData);
                setAllLessons(lessonsData);
                
                // Find current lesson
                const currentLesson = lessonsData.find(l => l.id === Number(lessonId));
                if (currentLesson) {
                    setLesson(currentLesson);
                    console.log('[LessonDetailPage] Current lesson:', currentLesson);
                } else {
                    setError('Lesson not found');
                }
            } catch (err) {
                console.error('[LessonDetailPage] Fetch error:', err);
                setError(err.message || 'Failed to load lesson');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLessons();
    }, [courseId, lessonId]);

    if (isLoading) return <div className={styles.courseDetailPageWrapper}><p>Loading lesson...</p></div>;
    if (error) return <div className={styles.courseDetailPageWrapper}><p style={{ color: 'red' }}>{error}</p></div>;
    if (!lesson) return <div className={styles.courseDetailPageWrapper}><p>Lesson not found</p></div>;

    // Get current lesson index
    const currentIndex = allLessons.findIndex(l => l.id === Number(lessonId));
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < allLessons.length - 1;
    const previousLesson = hasPrevious ? allLessons[currentIndex - 1] : null;
    const nextLesson = hasNext ? allLessons[currentIndex + 1] : null;

    const handlePrevious = () => {
        if (previousLesson) {
            navigate(`/study/${courseId}/lesson/${previousLesson.id}`);
        }
    };

    const handleNext = () => {
        if (nextLesson) {
            navigate(`/study/${courseId}/lesson/${nextLesson.id}`);
        }
    };

    const handleMarkAsCompleted = () => {
        setIsCompleted(!isCompleted);
        console.log(`Lesson ${lesson.id} marked as ${!isCompleted ? 'completed' : 'not completed'}`);
    };

    const handleTakeTest = () => {
        if (lesson.testUrl) {
            window.open(lesson.testUrl, '_blank');
        }
    };

    // Extract YouTube video ID from URL
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return '';
        const videoId = url.includes('youtube.com')
            ? url.split('v=')[1]?.split('&')[0]
            : url.includes('youtu.be')
            ? url.split('youtu.be/')[1]?.split('?')[0]
            : '';
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    };

    const embedUrl = getYouTubeEmbedUrl(lesson.videoUrl);

    return (
        <div className={styles.courseDetailPageWrapper}>
            <div className={styles.courseDetailContainer}>
                <h1 className={styles.courseTitle}>{lesson.title}</h1>

                {/* Video Player */}
                <div style={{ marginBottom: '30px' }}>
                    {embedUrl ? (
                        <iframe
                            width="100%"
                            height="500"
                            src={embedUrl}
                            title={lesson.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ borderRadius: '8px' }}
                        ></iframe>
                    ) : (
                        <div style={{ 
                            backgroundColor: '#f0f0f0', 
                            height: '500px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            borderRadius: '8px'
                        }}>
                            <p>Video not available</p>
                        </div>
                    )}
                </div>

                {/* Description */}
                <div style={{ marginBottom: '30px' }}>
                    <h3>Про цей урок</h3>
                    <p>{lesson.description}</p>
                </div>

                {/* Action Buttons */}
                <div style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    marginBottom: '30px',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={handleMarkAsCompleted}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: isCompleted ? '#4CAF50' : '#ddd',
                            color: isCompleted ? 'white' : '#333',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        {isCompleted ? '✔ Переглянуто' : 'Відмітити як переглянуте'}
                    </button>
                    {lesson.testUrl && (
                        <button
                            onClick={handleTakeTest}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#2196F3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Пройти тест
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    gap: '10px',
                    marginBottom: '20px'
                }}>
                    <button
                        onClick={handlePrevious}
                        disabled={!hasPrevious}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: hasPrevious ? '#FF9800' : '#ccc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: hasPrevious ? 'pointer' : 'not-allowed',
                            fontSize: '14px'
                        }}
                    >
                        ← Назад
                    </button>
                    <span style={{ alignSelf: 'center', fontSize: '14px' }}>
                        Урок {currentIndex + 1} з {allLessons.length}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={!hasNext}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: hasNext ? '#4CAF50' : '#ccc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: hasNext ? 'pointer' : 'not-allowed',
                            fontSize: '14px'
                        }}
                    >
                        Вперед →
                    </button>
                </div>

                {/* Back to Course */}
                <button
                    onClick={() => navigate(`/study/${courseId}`)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    ← Повернутися до курсу
                </button>
            </div>
        </div>
    );
};

export default LessonDetailPage;
