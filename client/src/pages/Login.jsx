import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect authenticated users immediately
    useEffect(()=>{
        if (isAuthenticated) {
            // If already authenticated, send to appropriate dashboard
            const role = localStorage.getItem('role');
            if (role === 'admin') navigate('/admin-dashboard');
            else navigate('/student-dashboard');
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(userId, password, role);
            // Read role from localStorage (login stores it) and redirect appropriately
            const storedRole = localStorage.getItem('role');
            if (storedRole === 'admin') navigate('/admin-dashboard');
            else navigate('/student-dashboard');
        } catch (err) {
            setError(err.message || 'An unknown error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-[80vh]">
            <Card title="Login" style={{ maxWidth: '400px', width: '90%' }}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Role Selector */}
                    <div className="flex justify-center mb-6">
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            className={`p-3 w-1/2 rounded-l-lg font-bold transition-all duration-200 
                                ${role === 'student' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            disabled={loading}
                        >
                            Student Login
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('admin')}
                            className={`p-3 w-1/2 rounded-r-lg font-bold transition-all duration-200 
                                ${role === 'admin' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            disabled={loading}
                        >
                            Admin Login
                        </button>
                    </div>


                    <div>
                        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                            {role === 'student' ? 'Student ID/Reg No.' : 'Admin ID'}
                        </label>
                        <input
                            type="text"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={loading}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 font-medium p-2 bg-red-50 rounded-lg border border-red-200">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                        disabled={loading}
                    >
                        {loading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Sign In'}
                    </button>
                    
                    {role === 'student' && (
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Don't have an account? 
                            <span 
                                onClick={() => navigate('/signup')} 
                                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer ml-1"
                            >
                                Register here
                            </span>
                        </p>
                    )}
                </form>
            </Card>
        </main>
    );
};

export default Login;