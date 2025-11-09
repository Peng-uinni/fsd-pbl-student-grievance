import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import ComplaintItem from '../components/ComplaintItem';
import { API_URL } from '../urls';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(API_URL.MY_COMPLAINTS, {
          credentials: 'include',
          headers: {
            ...getAuthHeader(),
          }
        });

        if (!response.ok) throw new Error('Failed to fetch complaints');
        const data = await response.json();
        setComplaints(data.data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching complaints:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Calculate stats
  const stats = complaints.reduce((acc, complaint) => {
    acc[complaint.status] = (acc[complaint.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <main>
      <Card title="Student Dashboard" style={{ maxWidth: '800px', margin: '40px auto' }}>
        <p style={{ marginBottom: '30px' }}>Welcome! You have filed {complaints.length} complaint(s).</p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/file-complaint" className="button" style={{ textDecoration: 'none', padding: '15px 30px', flex: '1 1 200px', textAlign: 'center' }}>
            <span role="img" aria-label="file">📝</span> File New Complaint
          </Link>
          <Link to="/my-complaints" className="button" style={{ textDecoration: 'none', padding: '15px 30px', flex: '1 1 200px', textAlign: 'center' }}>
            <span role="img" aria-label="list">📋</span> View My Complaints
          </Link>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading your complaints...</p>
        ) : error ? (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</p>
        ) : (
          <>
            <h3 style={{ marginTop: '40px', color: 'var(--primary-color)' }}>Quick Stats:</h3>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
              <li>Total Filed: {complaints.length}</li>
              <li>Status: Pending: {stats['Pending'] || 0}</li>
              <li>Status: In Progress: {stats['In Progress'] || 0}</li>
              <li>Status: Resolved: {stats['Resolved'] || 0}</li>
            </ul>

            <h3 style={{ marginTop: '40px', color: 'var(--primary-color)' }}>Recent Complaints:</h3>
            <div style={{ marginTop: '20px' }}>
              {complaints.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>
                  No complaints filed yet. Use the "File New Complaint" button to get started.
                </p>
              ) : (
                complaints.slice(0, 3).map(complaint => (
                  <ComplaintItem 
                    key={complaint._id} 
                    complaint={{
                      ...complaint,
                      date: new Date(complaint.createdAt).toLocaleDateString(),
                    }}
                  />
                ))
              )}
              {complaints.length > 3 && (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                  <Link to="/my-complaints" style={{ color: 'var(--primary-color)' }}>
                    View all {complaints.length} complaints →
                  </Link>
                </p>
              )}
            </div>
          </>
        )}
      </Card>
    </main>
  );
};

export default StudentDashboard;