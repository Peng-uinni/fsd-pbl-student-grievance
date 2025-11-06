import { useState } from 'react';
import Card from './Card';
import "../urls"
import { FORM_COMPLAINT_URL } from '../urls';

const CATEGORIES = [
  'Academic',
  'Administration',
  'Hostel/Mess',
  'Infrastructure',
  'Disciplinary',
  'Other',
];

const ComplaintForm = () => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('New Complaint Submitted:', {
    //   subject,
    //   category,
    //   description,
    //   photos: photos ? photos.name : 'No file',
    // });

    const complaintData = {
      subject,
      category,
      description,
      photos: photos ? photos.name : 'No file',
    }

    //fetch req to backend 
    try{
      const response = await fetch(FORM_COMPLAINT_URL, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          //token/cookie auth here
          //temp dummy id
          'x-user-id': '99999',
        },
        body: JSON.stringify(complaintData),
      });

      console.log(response);
    } catch(err){ 
      console.log(err);
    }

    // Reset form
    setSubject('');
    setCategory(CATEGORIES[0]);
    setDescription('');
    setPhotos(null);
  };

  return (
    <Card title="File a New Complaint" style={{ maxWidth: '700px' }}>
      <form onSubmit={handleSubmit}>
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
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="photos">Upload Supporting Photos (Optional)</label>
          <input
            type="file"
            id="photos"
            accept="image/*"
            onChange={(e) => setPhotos(e.target.files[0])}
          />
          {photos && (
            <small style={{ display: 'block', marginTop: '5px' }}>
              Selected file: **{photos.name}**
            </small>
          )}
        </div>

        <button type="submit" style={{ width: '100%', marginTop: '20px' }}>
          Submit Complaint
        </button>
      </form>
    </Card>
  );
};

export default ComplaintForm;