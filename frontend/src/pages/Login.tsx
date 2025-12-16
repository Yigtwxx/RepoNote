import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTH_URL } from '../services/api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const res = await axios.post(`${AUTH_URL}/token`, formData);
            const token = res.data.access_token;

            localStorage.setItem('token', token);
            alert("Login Successful!");
            navigate('/');
        } catch (err: any) {
            console.error(err);
            setError('Invalid credentials');
            alert("Login Failed: Invalid credentials or server error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-text p-4">
            <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-white/10 backdrop-blur-xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Welcome Back</h2>

                {error && <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-lg text-sm">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm text-muted mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-muted mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors mt-2">
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-muted text-sm">
                    Don't have an account? <Link to="/register" className="text-secondary hover:underline">Register</Link>
                </p>
            </div>

            <div className="fixed inset-0 -z-10 pointer-events-none bg-space-gradient opacity-80"></div>
        </div>
    );
};

export default Login;
