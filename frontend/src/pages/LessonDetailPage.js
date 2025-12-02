import React from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_COURSE_DATA } from './CourseDetailPage';
import styles from '../styles/CourseDetail.module.css';

const LessonDetailPage = () => {
    const { courseId, lessonId } = useParams();
    const course = MOCK_COURSE_DATA[Number(courseId)];
    if (!course) return <div>Course not found</div>;

    let lesson = null;
    for (const section of course.sections) {
        lesson = section.lessons.find(l => l.id === Number(lessonId));
        if (lesson) break;
    }
    if (!lesson) return <div>Lesson not found</div>;

    return (
        <div className={styles.courseDetailPageWrapper}>
            <h1>{course.title}</h1>
            <h2>{lesson.title}</h2>
            <p>Контент лекції...</p>
        </div>
    );
};

export default LessonDetailPage;
