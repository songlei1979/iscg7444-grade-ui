import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h1>Student Grades System</h1>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/students" className="nav-link">Students</Link>
        <Link to="/courses" className="nav-link">Courses</Link>
        <Link to="/grades" className="nav-link">Grades</Link>
      </div>
    </nav>
  );
};

export default Navigation;
