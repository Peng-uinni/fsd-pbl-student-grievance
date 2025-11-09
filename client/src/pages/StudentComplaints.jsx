import { useEffect, useState } from 'react';
import Card from '../components/Card';
import ComplaintItem from '../components/ComplaintItem';
import { API_URL } from '../urls';
import { useAuth } from '../context/AuthContext';

const StudentComplaints = () => {
  const [studentComplaints, setStudentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(API_URL.MY_COMPLAINTS, {
          method: 'GET',
          credentials: 'include',
          headers: {
            ...getAuthHeader(),
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch complaints: ${response.status}`);
        }

        const data = await response.json();
        setStudentComplaints(data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching complaints:', err);
        setError('Failed to load complaints. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <main>
      <Card title="My Filed Complaints" style={{ maxWidth: '800px' }}>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading complaints...</p>
        ) : error ? (
          <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
        ) : studentComplaints.length === 0 ? (
          <p style={{ textAlign: 'center' }}>You have not filed any complaints yet.</p>
        ) : (
          studentComplaints.map((complaint) => (
            <ComplaintItem 
              key={complaint._id} 
              complaint={{
                ...complaint,
                date: new Date(complaint.createdAt).toLocaleDateString(),
              }}
            />
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