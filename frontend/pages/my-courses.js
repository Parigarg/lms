import NavBar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('lmsToken') : null;

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await api('/courses');
      setCourses(data);
    } catch (err) {
      setError(err.message || 'Error fetching');
    }
  }

  async function enroll(id) {
    try {
      if (!token) return alert('Please login first');
      await api(`/courses/${id}/enroll`, { method: 'POST', token });
      alert('Enrolled successfully');
    } catch (err) {
      alert(err.message || 'Error enrolling');
    }
  }

  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <h2>All Courses</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          {courses.map(c => (
            <div key={c._id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <p>Teacher: {c.teacher?.name || 'Unknown'}</p>
              <button onClick={() => enroll(c._id)}>Enroll</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
