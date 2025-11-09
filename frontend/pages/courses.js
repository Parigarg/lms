import NavBar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => { load(); }, []);

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
      const token = typeof window !== 'undefined' && localStorage.getItem('lmsToken');
      if (!token) return alert('Please login first');
      await api(`/courses/${id}/enroll`, { method: 'POST', token });
      alert('Enrolled successfully');
    } catch (err) {
      alert(err.message || 'Error enrolling');
    }
  }

  return (
    <>
      
      <main className="container py-10">
        <h2 className="text-2xl font-semibold mb-6">All Courses</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(c => (
            <article key={c._id} className="bg-white rounded-lg shadow hover:shadow-xl transition p-5 flex flex-col">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
                <p className="text-slate-600 mt-2 line-clamp-3">{c.description || 'No description'}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-slate-500">Teacher: {c.teacher?.name || 'Unknown'}</div>
                <button onClick={() => enroll(c._id)} className="ml-4 bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-blue-800">
                  Enroll
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
