import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from '../styles/Auth.module.css';

const API_URL = 'http://localhost:5044/api/courses';

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [form, setForm] = useState({
    title: '',
    participantsCount: 0,
    mentorId: '',
    skillsRequired: '',
    programIncludes: '',
    description: '',
    totalHours: '',
    language: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [mentorsLoading, setMentorsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!!editId);
  const [editLoading, setEditLoading] = useState(!!editId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  useEffect(() => {
    const fetchMentors = async () => {
      setMentorsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5044/api/Users/mentors', {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error('Failed to load mentors');
        const data = await res.json();
        console.log('[CreateCoursePage] mentors from API:', data);
        setMentors(Array.isArray(data) ? data : []);
        // If mentorId not set, try to prefill with current user if they are mentor
        if (!form.mentorId) {
          const myId = localStorage.getItem('userId');
          if (myId && data.some(m => String(m.id) === String(myId))) {
            setForm(prev => ({ ...prev, mentorId: String(myId) }));
          }
        }
      } catch (err) {
        console.error('[CreateCoursePage] fetchMentors error:', err);
      } finally {
        setMentorsLoading(false);
      }
    };

    fetchMentors();
  }, []);

  // Fetch course data if editing
  useEffect(() => {
    if (!editId) return;

    const fetchCourse = async () => {
      setEditLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5044/api/courses/${editId}`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error('Failed to load course');
        const data = await res.json();
        console.log('[CreateCoursePage] course data for edit:', data);
        
        // Prefill form with course data
        setForm({
          title: data.title || '',
          participantsCount: data.participantsCount || 0,
          mentorId: String(data.mentorId) || '',
          skillsRequired: data.details?.skillsRequired || '',
          programIncludes: data.details?.programIncludes || '',
          description: data.details?.description || '',
          totalHours: data.details?.totalHours || '',
          language: data.details?.language || '',
        });
      } catch (err) {
        console.error('[CreateCoursePage] fetchCourse error:', err);
        setError(err.message || 'Failed to load course for editing');
      } finally {
        setEditLoading(false);
      }
    };

    fetchCourse();
  }, [editId]);

  const validate = () => {
    if (!form.title.trim()) return 'Title is required';
    if (!form.mentorId && !localStorage.getItem('userId')) return 'Mentor ID is required';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        title: form.title,
        participantsCount: Number(form.participantsCount) || 0,
        mentorId: Number(form.mentorId) || Number(localStorage.getItem('userId')) || 0,
        skillsRequired: form.skillsRequired,
        programIncludes: form.programIncludes,
        description: form.description,
        totalHours: Number(form.totalHours) || 0,
        language: form.language || 'English',
      };

      console.log('[CreateCoursePage] Payload:', payload);
      console.log('[CreateCoursePage] Mode:', isEditing ? `EDIT (id=${editId})` : 'CREATE');

      const url = isEditing ? `http://localhost:5044/api/courses/${editId}` : API_URL;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) data = await response.json();
      else data = { message: await response.text() };

      if (!response.ok) throw new Error(data.message || `Failed to ${isEditing ? 'update' : 'create'} course (${response.status})`);

      console.log('[CreateCoursePage] Response:', data);
      const courseId = isEditing ? editId : (data.course?.Id || data.courseId || data.course?.id || data.id || null);
      alert(data.message || `Course ${isEditing ? 'updated' : 'created'}`);
      // Navigate to my-courses or course detail if id available
      if (isEditing) navigate('/my-courses');
      else if (courseId) navigate(`/course/${courseId}`);
      else navigate('/courses');
    } catch (err) {
      console.error('[CreateCoursePage] Error:', err);
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} course`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer} style={{ paddingTop: '30px' }}>
      <main className={styles.main}>
        <div className={styles.authWrapper} style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className={styles.authBox}>
            <h2 className={styles.title}>{isEditing ? 'Edit Course' : 'Create Course'}</h2>

            {editLoading && <p>Loading course data...</p>}

            <form className={styles.form} onSubmit={handleSubmit} style={{ display: editLoading ? 'none' : 'block' }}>
              <label>Title</label>
              <input name="title" value={form.title} onChange={handleChange} required />

              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label>Participants count</label>
                  <input name="participantsCount" type="number" value={form.participantsCount} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Mentor</label>
                  {mentorsLoading ? (
                    <div style={{ padding: '8px 0' }}>Loading mentors...</div>
                  ) : mentors && mentors.length > 0 ? (
                    <select name="mentorId" value={form.mentorId} onChange={handleChange} style={{ padding: 8 }}>
                      <option value="">Select mentor</option>
                      {mentors.map(m => (
                        <option key={m.id} value={m.id}>{m.fullName || m.email}</option>
                      ))}
                    </select>
                  ) : (
                    <input name="mentorId" value={form.mentorId} onChange={handleChange} placeholder={localStorage.getItem('userId') ? `Your id: ${localStorage.getItem('userId')}` : ''} />
                  )}
                </div>
              </div>

              <label>Skills required (comma separated)</label>
              <input name="skillsRequired" value={form.skillsRequired} onChange={handleChange} />

              <label>Program includes (one item per line)</label>
              <textarea name="programIncludes" value={form.programIncludes} onChange={handleChange} rows={4} />

              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={6} />

              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label>Total hours</label>
                  <input name="totalHours" type="number" value={form.totalHours} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Language</label>
                  <input name="language" value={form.language} onChange={handleChange} placeholder="e.g. English" />
                </div>
              </div>

              {error && <div className={styles.error} style={{ marginTop: 8 }}>{error}</div>}

              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button type="submit" className={styles.submitBtn} disabled={loading}>{loading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Course' : 'Create Course')}</button>
                <button type="button" className={styles.submitBtn} style={{ backgroundColor: '#777' }} onClick={() => navigate(isEditing ? '/my-courses' : '/courses')}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCoursePage;
