import { useEffect, useState } from 'react';

import Card from '../components/Card';
import ComplaintItem from '../components/ComplaintItem';

// Temp Data
const tempComplaints = [
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

const StudentComplaints = () => {
  const [studentComplaints, setStudentComplaints] = useState(tempComplaints);

  useEffect(()=>{
    
  }, []);

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