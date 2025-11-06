// src/pages/AllComplaints.js
import React, { useState } from 'react';
import Card from '../components/Card';

// Comprehensive Dummy Data
const initialComplaints = [
  { id: 101, subject: "Broken Fan in Class A", category: "Infrastructure", status: "In Progress", filedBy: "S001", date: "2023-11-06" },
  { id: 102, subject: "Delayed Scholarship Payment", category: "Administration", status: "Pending", filedBy: "S005", date: "2023-11-05" },
  { id: 103, subject: "Hostel Food Quality Issue", category: "Hostel/Mess", status: "Resolved", filedBy: "S010", date: "2023-11-04" },
  { id: 104, subject: "Incorrect marks on grade sheet", category: "Academic", status: "Pending", filedBy: "S022", date: "2023-11-03" },
  { id: 105, subject: "Unauthorized fee collection", category: "Administration", status: "In Progress", filedBy: "S015", date: "2023-11-02" },
  { id: 106, subject: "Lab equipment malfunction", category: "Infrastructure", status: "Resolved", filedBy: "S030", date: "2023-11-01" },
];

const STATUSES = ["All", "Pending", "In Progress", "Resolved"];

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return '#ff9800'; // Amber
    case 'In Progress': return '#3f51b5'; // Indigo
    case 'Resolved': return '#4caf50'; // Green
    default: return '#333';
  }
};

const tableHeaderStyle = { padding: '12px 10px', borderBottom: '2px solid #ccc', backgroundColor: '#f0f0f0', color: 'var(--text-color)' };
const tableCellStyle = { padding: '10px', borderBottom: '1px solid #eee' };

const AllComplaints = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [filter, setFilter] = useState('All');

  // Mock function for admin action
  const handleStatusChange = (id, newStatus) => {
    setComplaints(complaints.map(c =>
      c.id === id ? { ...c, status: newStatus } : c
    ));
    // In a real app, this would be an API call
    console.log(`Complaint ${id} status updated to: ${newStatus}`);
  };

  const filteredComplaints = complaints.filter(c =>
    filter === 'All' || c.status === filter
  );

  return (
    <main>
      <Card title="All Grievances (Admin View)" style={{ maxWidth: '1100px' }}>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <h4 style={{ margin: 0 }}>Filter by Status:</h4>
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                backgroundColor: filter === s ? 'var(--primary-color)' : 'var(--white)',
                color: filter === s ? 'var(--white)' : 'var(--primary-color)',
                border: `1px solid var(--primary-color)`,
                padding: '8px 15px',
                transition: 'all 0.2s',
              }}
            >
              {s} ({s === 'All' ? complaints.length : complaints.filter(c => c.status === s).length})
            </button>
          ))}
        </div>

        {/* Complaints Table */}
        <div style={{ overflowX: 'auto', maxHeight: '60vh', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: 'var(--white)' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Subject</th>
                <th style={tableHeaderStyle}>Category</th>
                <th style={tableHeaderStyle}>Filed By</th>
                <th style={tableHeaderStyle}>Date</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={{...tableHeaderStyle, width: '180px'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                      No complaints match the current filter.
                    </td>
                  </tr>
              ) : (
                filteredComplaints.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #f5f5f5', ':hover': { backgroundColor: '#fafafa' } }}>
                    <td style={tableCellStyle}>**{c.id}**</td>
                    <td style={tableCellStyle}>{c.subject}</td>
                    <td style={tableCellStyle}>{c.category}</td>
                    <td style={tableCellStyle}>{c.filedBy}</td>
                    <td style={tableCellStyle}>{c.date}</td>
                    <td style={tableCellStyle}>
                      <span style={{ fontWeight: 'bold', color: getStatusColor(c.status) }}>
                        {c.status}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      <select
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#888' }}>
            *Note: Status changes in this mock interface are temporary and reset on refresh.
        </p>
      </Card>
    </main>
  );
};

export default AllComplaints;