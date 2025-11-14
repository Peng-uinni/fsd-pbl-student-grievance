import { useContext, useState } from 'react';
import Card from './Card';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  'Academic',
  'Administration',
  'Hostel/Mess',
  'Infrastructure',
  'Disciplinary',
  'Other',
];

const DEPARTMENTS = [
  'CSE',
];

const ComplaintForm = () => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');

    // Use FormData so the actual file(s) are uploaded (if provided)
    const form = new FormData();
    form.append('subject', subject);
    form.append('category', category);
    form.append('description', description);
    form.append('department', department);
    if (photos && photos.length) {
      photos.forEach((file) => form.append('photos', file));
    }

    setLoading(true);
    try{
      const res = await fetch("http://localhost:8080/api/complaint/create",{
        method: 'POST',
        credentials: 'include',
        body: form,
      })

      const data = await res.json();

      if(res.ok && data.success){
        setLoading(false);
        navigate('/student-dashboard');
      }
    }catch(err){
      console.error(err);
    }
  };

  return (
    <Card title="File a New Complaint" style={{ maxWidth: '700px', margin: '40px auto' }}>
      <form onSubmit={handleSubmit}>
        {successMessage && (
          <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>
        )}
        {errorMessage && (
          <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>
        )}
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            maxLength="100"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="photos">Upload Supporting Photos (Optional)</label>
          <input
            type="file"
            id="photos"
            accept="image/*"
            multiple
            onChange={(e) => setPhotos(Array.from(e.target.files))}
          />
          {photos && photos.length > 0 && (
            <small style={{ display: 'block', marginTop: '5px' }}>
              Selected file{photos.length > 1 ? 's' : ''}: {photos.map(f => f.name).join(', ')}
            </small>
          )}
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', marginTop: '20px' }}>
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>
    </Card>
  );
};

export default ComplaintForm;