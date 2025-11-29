import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_COURSE_DATA } from './CourseDetailPage'; 
import styles from '../styles/TaskDetail.module.css';

const TaskDetailPage = () => {
    const { courseId, taskId } = useParams();
    const course = MOCK_COURSE_DATA[Number(courseId)];
    const task = course?.tasks?.find(t => t.id === Number(taskId));

    const [comment, setComment] = useState('');
    const [tasks, setTasks] = useState([]);

    if (!course || !task) {
        return <div className={styles.errorContainer}>Task or course not found</div>;
    }

    const handleAddComment = () => {
        if (comment.trim() === '') return;
        console.log(`Private comment to mentor: "${comment}"`);
        alert('Comment sent to mentor!'); 
        setComment('');
    };

    const handleAddTask = () => {
        const newTask = { id: Date.now(), title: `New Task #${tasks.length + 1}`, isCompleted: false };
        setTasks(prev => [...prev, newTask]);
    };

    return (
        <div className={styles.detailWrapper}>
            <h1 className={styles.courseTitle}>{course.title}</h1>
            <h2 className={styles.taskTitle}>{task.title}</h2>

            <div className={styles.commentSection}>
                <h3>Leave a private comment to mentor:</h3>
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    rows={3}
                    className={styles.commentInput}
                />
                <button onClick={handleAddComment} className={styles.commentButton}>Send Comment</button>
            </div>

            <div className={styles.addTaskSection}>
                <h3>Add a new task:</h3>
                <button onClick={handleAddTask} className={styles.addTaskButton}>Add Task</button>
                <ul className={styles.taskList}>
                    {tasks.map(t => <li key={t.id}>{t.title}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default TaskDetailPage;
