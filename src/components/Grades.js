import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    student_id: '',
    course_id: '',
    grade: '',
    semester: '',
    year: ''
  });

  useEffect(() => {
    fetchGrades();
    fetchGradeOptions();
  }, []);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const response = await apiService.getGrades();
      setGrades(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch grades');
      console.error('Error fetching grades:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGradeOptions = async () => {
    try {
      const response = await apiService.getGradeOptions();
      setStudents(response.data.students);
      setCourses(response.data.courses);
    } catch (err) {
      console.error('Error fetching grade options:', err);
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
      await apiService.addGrade({
        ...formData,
        student_id: parseInt(formData.student_id),
        course_id: parseInt(formData.course_id),
        grade: parseFloat(formData.grade),
        year: parseInt(formData.year)
      });
      setFormData({ student_id: '', course_id: '', grade: '', semester: '', year: '' });
      setShowAddForm(false);
      fetchGrades();
    } catch (err) {
      setError('Failed to add grade');
      console.error('Error adding grade:', err);
    }
  };

  if (loading) return <div className="loading">Loading grades...</div>;

  return (
    <div className="grades-container">
      <div className="header">
        <h2>Grades</h2>
        <button 
          className="add-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add Grade'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showAddForm && (
        <div className="add-form">
          <h3>Add New Grade</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Student:</label>
              <select
                name="student_id"
                value={formData.student_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a student</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.first_name} {student.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Course:</label>
              <select
                name="course_id"
                value={formData.course_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.course_code} - {course.course_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Grade:</label>
              <input
                type="number"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>
            <div className="form-group">
              <label>Semester:</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                required
              >
                <option value="">Select semester</option>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
              </select>
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                min="2000"
                max="2030"
                required
              />
            </div>
            <button type="submit">Add Grade</button>
          </form>
        </div>
      )}

      <div className="grades-list">
        {grades.length === 0 ? (
          <p>No grades found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Course</th>
                <th>Grade</th>
                <th>Semester</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(grade => (
                <tr key={grade.id}>
                  <td>{grade.id}</td>
                  <td>{grade.student?.first_name} {grade.student?.last_name}</td>
                  <td>{grade.course?.course_code}</td>
                  <td>{grade.grade}</td>
                  <td>{grade.semester}</td>
                  <td>{grade.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Grades;
