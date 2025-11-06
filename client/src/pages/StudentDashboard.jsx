// src/pages/StudentDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const StudentDashboard = () => {
  return (
    <main>
      <Card title="Student Dashboard" style={{ maxWidth: '800px' }}>
        <p style={{ marginBottom: '30px' }}>Welcome, Student User!</p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/file-complaint" className="button" style={{ textDecoration: 'none', padding: '15px 30px', flex: '1 1 200px', textAlign: 'center' }}>
            <span role="img" aria-label="file">📝</span> File New Complaint
          </Link>
          <Link to="/my-complaints" className="button" style={{ textDecoration: 'none', padding: '15px 30px', flex: '1 1 200px', textAlign: 'center' }}>
            <span role="img" aria-label="list">📋</span> View My Complaints
          </Link>
        </div>

        <h3 style={{ marginTop: '40px', color: 'var(--primary-color)' }}>Quick Stats:</h3>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
          <li>**Total Filed:** 5</li>
          <li>**Status: Pending:** 2</li>
          <li>**Status: In Progress:** 2</li>
          <li>**Status: Resolved:** 1</li>
        </ul>
      </Card>
    </main>
  );
};

export default StudentDashboard;