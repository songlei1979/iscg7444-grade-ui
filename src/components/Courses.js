import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    course_code: '',
    course_name: '',
    credits: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCourses();
      setCourses(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.addCourse({
        ...formData,
        credits: parseInt(formData.credits)
      });
      setFormData({ course_code: '', course_name: '', credits: '' });
      setShowAddForm(false);
      fetchCourses();
    } catch (err) {
      setError('Failed to add course');
      console.error('Error adding course:', err);
    }
  };

  if (loading) return <div className="loading">Loading courses...</div>;

  return (
    <div className="courses-container">
      <div className="header">
        <h2>Courses</h2>
        <button 
          className="add-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add Course'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showAddForm && (
        <div className="add-form">
          <h3>Add New Course</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Course Code:</label>
              <input
                type="text"
                name="course_code"
                value={formData.course_code}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Course Name:</label>
              <input
                type="text"
                name="course_name"
                value={formData.course_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Credits:</label>
              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleInputChange}
                min="1"
                max="10"
                required
              />
            </div>
            <button type="submit">Add Course</button>
          </form>
        </div>
      )}

      <div className="courses-list">
        {courses.length === 0 ? (
          <p>No courses found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.course_code}</td>
                  <td>{course.course_name}</td>
                  <td>{course.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Courses;
