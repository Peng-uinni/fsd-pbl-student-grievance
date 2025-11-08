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

export default ComplaintItem;