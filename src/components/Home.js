import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const Home = () => {
  const [apiInfo, setApiInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApiInfo();
  }, []);

  const fetchApiInfo = async () => {
    try {
      setLoading(true);
      const response = await apiService.getApiInfo();
      setApiInfo(response.data);
      setError('');
    } catch (err) {
      setError('Failed to connect to API');
      console.error('Error fetching API info:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Connecting to API...</div>;

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to Student Grades Management System</h1>
        <p>Manage students, courses, and grades with ease</p>
      </div>

      {error && <div className="error">{error}</div>}

      {apiInfo && (
        <div className="api-status">
          <h2>API Status</h2>
          <div className="status-grid">
            <div className="status-item">
              <strong>Database Status:</strong> {apiInfo.database_status}
            </div>
            <div className="status-item">
              <strong>Database Name:</strong> {apiInfo.database_name}
            </div>
            <div className="status-item">
              <strong>API Message:</strong> {apiInfo.message}
            </div>
          </div>

          <div className="endpoints-section">
            <h3>Available Endpoints</h3>
            <div className="endpoints-grid">
              <div className="endpoint-card">
                <h4>Students</h4>
                <ul>
                  <li>GET {apiInfo.endpoints.students}</li>
                  <li>POST {apiInfo.endpoints.add_student}</li>
                </ul>
              </div>
              <div className="endpoint-card">
                <h4>Courses</h4>
                <ul>
                  <li>GET {apiInfo.endpoints.courses}</li>
                  <li>POST {apiInfo.endpoints.add_course}</li>
                </ul>
              </div>
              <div className="endpoint-card">
                <h4>Grades</h4>
                <ul>
                  <li>GET {apiInfo.endpoints.grades}</li>
                  <li>POST {apiInfo.endpoints.add_grade}</li>
                  <li>GET {apiInfo.endpoints.add_grade_options}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <a href="/students" className="action-card">
            <h3>Manage Students</h3>
            <p>Add, view, and manage student information</p>
          </a>
          <a href="/courses" className="action-card">
            <h3>Manage Courses</h3>
            <p>Add, view, and manage course information</p>
          </a>
          <a href="/grades" className="action-card">
            <h3>Manage Grades</h3>
            <p>Add, view, and manage student grades</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
