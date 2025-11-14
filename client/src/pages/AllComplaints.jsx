import { useEffect, useState } from 'react';
import Card from '../components/Card';
import ComplaintItem from '../components/ComplaintItem';

const STATUSES = ["All", "Pending", "In Progress", "Resolved", "Closed"];

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return '#ff9800'; // Amber
    case 'In Progress': return '#3f51b5'; // Indigo
    case 'Resolved': return '#4caf50'; // Green
    case 'Closed': return '#eb1c2c'; // Red
    default: return '#333';
  }
};

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const getAllComplaints = async () => {
      const endpoint = "http://localhost:8080/api/complaint/all";
      try{
        const res = await fetch(endpoint, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.json();
        if(res.ok && data.success){
          setComplaints(data.body);
        }
      }catch(err){
        console.error(err);
      }
    }

    getAllComplaints();
  }, []);

  return (
    <main>
      <Card title="All Grievances" style={{ maxWidth: '1100px' }}>
        {/* <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
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
        </div> */}

        {/* Complaints List */}
        <div style={{ overflowX: 'auto', maxHeight: '60vh', overflowY: 'auto' }}>
          {complaints.map(complaint => (
            <ComplaintItem 
              key={complaint._id} 
              complaint={{
                ...complaint,
                date: new Date(complaint.createdAt).toLocaleDateString(),
              }}
            />
          ))
          }
        </div>
      </Card>
    </main>
  );
};

export default AllComplaints;