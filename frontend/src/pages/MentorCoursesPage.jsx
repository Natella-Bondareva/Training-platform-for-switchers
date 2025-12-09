import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AllCoursesPage.css';

const API_BASE = 'http://localhost:5044/api';

const StatusBadge = ({ status }) => {
  const color = status === 'Published' ? '#4CAF50' : status === 'Draft' ? '#FF9800' : '#999';
  return (
    <span style={{
      backgroundColor: color,
      color: '#fff',
      padding: '4px 8px',
      borderRadius: 6,
      fontSize: 12
    }}>{status}</span>
  );
};

const MentorCoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);

  const mentorId = localStorage.getItem('userId') || '';

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE}/Courses/mentor/${mentorId}`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        });
        if (!res.ok) throw new Error(`Failed to load courses (${res.status})`);
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
        console.log('[MentorCoursesPage] courses:', data);
      } catch (err) {
        console.error('[MentorCoursesPage] fetch error', err);
        setError(err.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [mentorId]);

  const changeStatus = async (courseId, newStatus) => {
    setUpdating(courseId);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/Courses/${courseId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error(`Failed to update status (${res.status})`);
      // reflect change locally
      setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: newStatus } : c));
    } catch (err) {
      console.error('[MentorCoursesPage] changeStatus error', err);
      alert(err.message || 'Failed to change status');
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading mentor courses...</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>My Courses</h2>
      {courses.length === 0 && <p>No courses found for this mentor.</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
        {courses.map(course => (
          <div key={course.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, background: '#fff' }}>
            <h3 style={{ margin: '0 0 8px 0' }}>{course.title}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 13, color: '#666' }}>Participants: {course.participantsCount}</div>
              <StatusBadge status={course.status} />
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => navigate(`/study/${course.id}`)} style={{ flex: 1, padding: '8px', cursor: 'pointer' }}>Open</button>
              <button onClick={() => navigate(`/create-course?edit=${course.id}`)} style={{ flex: 1, padding: '8px', cursor: 'pointer' }}>Edit</button>
            </div>

            <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
              <label style={{ fontSize: 13 }}>Set status:</label>
              <select value={course.status} onChange={(e) => changeStatus(course.id, e.target.value)} disabled={updating === course.id}>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorCoursesPage;
