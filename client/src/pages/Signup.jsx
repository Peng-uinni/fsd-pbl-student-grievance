import { useState } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../urls';

const Register = () => {
    const [formData, setFormData] = useState({
        userId: '',
        name: '',
        password: '',
        passwordConfirm: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (formData.password !== formData.passwordConfirm) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL.AUTH}/student/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: formData.userId,
                    name: formData.name,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.error || 'Registration failed.');
            }
        } catch (err) {
            setError('Network error. Could not connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-[80vh]">
            <Card title="Student Registration" style={{ maxWidth: '400px', width: '90%' }}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="name" value={formData.name} onChange={handleChange} required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled={loading}/>
                    </div>
                    <div>
                        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">Student ID/Reg No.</label>
                        <input type="text" id="userId" value={formData.userId} onChange={handleChange} required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled={loading}/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" value={formData.password} onChange={handleChange} required minLength="6"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled={loading}/>
                    </div>
                    <div>
                        <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" id="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} required minLength="6"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled={loading}/>
                    </div>
                    
                    {error && (
                        <p className="text-sm text-red-600 font-medium p-2 bg-red-50 rounded-lg border border-red-200">{error}</p>
                    )}
                    {success && (
                        <p className="text-sm text-green-600 font-medium p-2 bg-green-50 rounded-lg border border-green-200">{success}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already registered? 
                        <span 
                            onClick={() => navigate('/login')} 
                            className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer ml-1"
                        >
                            Log in
                        </span>
                    </p>
                </form>
            </Card>
        </main>
    );
};

export default Register;