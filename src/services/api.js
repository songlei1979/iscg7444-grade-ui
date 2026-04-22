import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5001';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Get API information
  getApiInfo: () => api.get('/'),
  
  // Students
  getStudents: () => api.get('/students'),
  addStudent: (studentData) => api.post('/add_student', studentData),
  
  // Courses
  getCourses: () => api.get('/courses'),
  addCourse: (courseData) => api.post('/add_course', courseData),
  
  // Grades
  getGrades: () => api.get('/grades'),
  addGrade: (gradeData) => api.post('/add_grade', gradeData),
  getGradeOptions: () => api.get('/add_grade_options'),
};

export default apiService;
