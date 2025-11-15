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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
    <Card title="File a New Complaint" className="text-2xl font-semibold text-center text-blue-700 mb-6">
      <form className="space-y-5" onSubmit={handleSubmit}>
        {successMessage && (
          <div className="text-green-600 mb-3">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-600 mb-3">{errorMessage}</div>
        )}

{/* For SUBJECT */}
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            maxLength="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:outline-none"
          />
        </div>

{/* For CATEGORYYY */}
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white ocus:ring-blue-500 focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

{/* DESCRITPTION */}

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="description">Description</label>
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:outline-none"
          />
        </div>

{/* PHOTOS */}
<div className="mb-4">
  <label
    className="block text-gray-700 font-medium mb-1"
    htmlFor="photos"
  >
    Upload Photos (Optional)
  </label>

  {/* Styled clickable upload box */}
  <label
    htmlFor="photos"
    className="cursor-pointer border-2 border-dashed border-gray-400 rounded-md 
               px-4 py-3 text-gray-600 text-sm inline-block w-full
               hover:border-blue-500 transition"
  >
    Choose Files
  </label>

  {/* Hidden file input */}
  <input
    type="file"
    id="photos"
    accept="image/*"
    multiple
    onChange={(e) => setPhotos(Array.from(e.target.files))}
    className="hidden"
  />

  {photos && photos.length > 0 && (
    <small className="text-gray-600 text-sm mt-1 block">
      Selected file{photos.length > 1 ? 's' : ''}:{" "}
      {photos.map((f) => f.name).join(", ")}
    </small>
  )}
</div>



        {/* <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="photos">Upload Photos (Optional)</label>
          <input
            type="file"
            id="photos"
            accept="image/*"
            multiple
            onChange={(e) => setPhotos(Array.from(e.target.files))}
            className="cw-full text-sm text-gray-600"
          />
          {photos && photos.length > 0 && (
            <small className="text-gray-600 text-sm mt-1">
              Selected file{photos.length > 1 ? 's' : ''}: {photos.map(f => f.name).join(', ')}
            </small>
          )}
        </div> */}

 {/* SUBMIT */}
        <button type="submit" disabled={loading} 
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-200">
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>
    </Card>
    </div>
  );
};

export default ComplaintForm;