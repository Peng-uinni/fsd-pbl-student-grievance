import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import ComplaintItem from '../components/ComplaintItem';

const StudentDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false); //turned it to false since theres no backend rn
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/complaint/me", {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Failed to fetch complaints');
        const data = await response.json();
        setComplaints(data.body);
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
    <main className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <Card>
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6"> Student Dashboard   </h1>

        <p className="text-center text-gray-700 mb-8"> Welcome! You have filed <span className="font-semibold">{complaints.length}</span> complaint(s).</p>


    {/* Buttonactions */}
        <div className="flex justify-center gap-6 mb-10">
          <Link to="/file-complaint"className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow">
            <span role="img" aria-label="file"></span> File New Complaint
          </Link>

          <Link to="/my-complaints" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow">
            <span role="img" aria-label="list"></span> View My Complaints
          </Link>
        </div>

        {loading ? (
          <p className='text-center mt-5 text-gray-600 animate-pulse'> Loading your complaints...</p>
        ) : error ? (
          <p className="text-center mt-5 text-red-600 font-medium">{error}</p>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats:</h3>
            <ul className="list-none mt-2 space-y-1 text-gray-700">
              <li>Total Filed: {complaints.length}</li>
              <li>Status: Pending: {stats['Pending'] || 0}</li>
              <li>Status: In Progress: {stats['In Progress'] || 0}</li>
              <li>Status: Resolved: {stats['Resolved'] || 0}</li>
            </ul>

            <h3 className="text-xl font-semibold mt-10 mb-3" style={{ color: "var(--primary-color)" }}>Recent Complaints:</h3>

            <div className="mt-5">
              {complaints.length === 0 ? (
                <p className="text-center text-gray-500">
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
                <p className="text-center mt-6">
                  <Link to="/my-complaints" className='font-medium' style={{ color: 'var(--primary-color)' }}>
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