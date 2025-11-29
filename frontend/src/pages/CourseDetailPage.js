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

const SectionItem = ({ section, courseId }) => { // отримуємо courseId пропсом
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    return (
        <div className={styles.sectionItem}>
            <div className={styles.sectionHeader} onClick={() => setIsOpen(!isOpen)}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <span className={styles.sectionArrow}>&#x25BC;</span>
            </div>
            {isOpen && (
                <div className={styles.lessonList}>
                    {section.lessons?.map(lesson => (
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

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('lections');

    useEffect(() => {
        setTimeout(() => {
            const data = MOCK_COURSE_DATA[Number(courseId)]; // приводимо до числа
            setCourseData(data || null);
            setIsLoading(false);
        }, 500);
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
                    <button 
                        className={`${styles.navItem} ${activeTab === 'roadmap' ? styles.navItemActive : ''}`}
                        onClick={() => setActiveTab('roadmap')}
                    >
                        Roadmap
                    </button>
                </div>

                <div className={styles.courseContent}>
                    {activeTab === 'lections' && courseData.sections?.map(section => (
    <SectionItem key={section.id} section={section} courseId={courseId} />
))}
                    {activeTab === 'tasks' && courseData.tasks?.map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                    {activeTab === 'roadmap' && courseData.roadmap?.map(step => (
                        <RoadmapItem key={step.id} step={step} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export { MOCK_COURSE_DATA }; 
export default CourseDetailPage;
