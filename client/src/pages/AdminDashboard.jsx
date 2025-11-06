// src/pages/AdminDashboard.js
import React from 'react';
import Card from '../components/Card';

const AdminDashboard = () => {
  return (
    <main>
      <Card title="Admin Dashboard" style={{ maxWidth: '900px' }}>
        <p style={{ marginBottom: '30px' }}>Welcome, Administrator! Here is an overview of current grievances.</p>

        <h3 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Overall Complaint Summary</h3>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
          <StatBox title="New Complaints" value="12" color="#e91e63" />
          <StatBox title="Total Pending" value="35" color="#ff9800" />
          <StatBox title="Total Resolved" value="158" color="#4caf50" />
        </div>

        {/* Placeholder table for viewing *all* complaints */}
        <h3 style={{ marginBottom: '15px' }}>Recently Filed (All Complaints)</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white)' }}>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Subject</th>
                <th style={tableHeaderStyle}>Category</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Filed By</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy Data */}
              {dummyAdminComplaints.map((c) => (
                <tr key={c.id} style={tableRowStyle}>
                  <td style={tableCellStyle}>{c.id}</td>
                  <td style={tableCellStyle}>{c.subject}</td>
                  <td style={tableCellStyle}>{c.category}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontWeight: 'bold', color: getStatusColor(c.status) }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={tableCellStyle}>{c.filedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ textAlign: 'right', marginTop: '10px' }}>
            <a href="/all-complaints" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>
              View All Complaints →
            </a>
          </p>
      </Card>
    </main>
  );
};

// Helper Components and Styles
const StatBox = ({ title, value, color }) => (
  <div style={{
    flex: '1',
    backgroundColor: color,
    color: 'var(--white)',
    padding: '20px',
    borderRadius: 'var(--border-radius)',
    textAlign: 'center',
  }}>
    <h4 style={{ margin: '0 0 10px 0' }}>{title}</h4>
    <p style={{ fontSize: '2em', margin: 0, fontWeight: 'bold' }}>{value}</p>
  </div>
);

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return '#ff9800';
    case 'In Progress': return '#3f51b5';
    case 'Resolved': return '#4caf50';
    default: return '#333';
  }
};

const tableHeaderStyle = { padding: '10px', borderBottom: '2px solid var(--white)' };
const tableCellStyle = { padding: '10px', borderBottom: '1px solid #ddd' };
const tableRowStyle = { transition: 'background-color 0.1s' };

// Dummy Data for Admin
const dummyAdminComplaints = [
  { id: 101, subject: "Broken Fan in Class A", category: "Infrastructure", status: "In Progress", filedBy: "S001" },
  { id: 102, subject: "Delayed Scholarship Payment", category: "Administration", status: "Pending", filedBy: "S005" },
  { id: 103, subject: "Hostel Food Quality Issue", category: "Hostel/Mess", status: "Resolved", filedBy: "S010" },
];

export default AdminDashboard;