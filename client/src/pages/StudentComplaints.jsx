// src/pages/StudentComplaints.js
import React from 'react';
import Card from '../components/Card';

// Dummy data representing a student's complaints
const studentComplaints = [
  {
    id: 1,
    subject: "Issue with Mid-Term Grading",
    category: "Academic",
    status: "In Progress",
    date: "2023-11-01",
    description: "The marks for the recent mid-term seem incorrect based on the answer key provided...",
    adminNote: "Assigned to Prof. K. Sharma for review.",
  },
  {
    id: 2,
    subject: "Slow WiFi in Library Block",
    category: "Infrastructure",
    status: "Resolved",
    date: "2023-10-25",
    description: "The internet connection in the central library is consistently slow, making research difficult.",
    adminNote: "Network hardware replaced on 2023-10-30. Confirmed resolution.",
  },
  {
    id: 3,
    subject: "Misbehavior by Security Guard",
    category: "Disciplinary",
    status: "Pending",
    date: "2023-11-05",
    description: "Was improperly questioned by the night guard near the main gate...",
    adminNote: null,
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return '#ff9800'; // Amber
    case 'In Progress': return '#3f51b5'; // Indigo (Primary)
    case 'Resolved': return '#4caf50'; // Green
    default: return '#333';
  }
};

const ComplaintItem = ({ complaint }) => (
  <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '4px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <h4 style={{ margin: 0, color: 'var(--primary-color)' }}>{complaint.subject}</h4>
      <span style={{
        fontWeight: 'bold',
        color: getStatusColor(complaint.status),
        border: `1px solid ${getStatusColor(complaint.status)}`,
        padding: '5px 10px',
        borderRadius: '20px',
        fontSize: '0.8em',
      }}>
        {complaint.status}
      </span>
    </div>

    <p style={{ fontSize: '0.9em', color: '#666' }}>
      **Category:** {complaint.category} | **Filed On:** {complaint.date}
    </p>

    <details style={{ marginTop: '10px' }}>
      <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: 'var(--text-color)' }}>
        View Details & Admin Response
      </summary>
      <p style={{ margin: '10px 0' }}>**Description:** {complaint.description}</p>
      <div style={{ padding: '10px', borderLeft: '3px solid #ccc', backgroundColor: 'var(--secondary-color)' }}>
        **Admin Note/Status Update:** {complaint.adminNote || "Awaiting initial review."}
      </div>
    </details>
  </div>
);

const StudentComplaints = () => {
  return (
    <main>
      <Card title="My Filed Complaints" style={{ maxWidth: '800px' }}>
        {studentComplaints.length === 0 ? (
          <p style={{ textAlign: 'center' }}>You have not filed any complaints yet.</p>
        ) : (
          studentComplaints.map((complaint) => (
            <ComplaintItem key={complaint.id} complaint={complaint} />
          ))
        )}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a href="/file-complaint" className="button" style={{ textDecoration: 'none' }}>
            + File a New Complaint
          </a>
        </div>
      </Card>
    </main>
  );
};

export default StudentComplaints;