import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTH_URL } from '../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Attempting registration:", { username, email });
        try {
            const res = await axios.post(`${AUTH_URL}/register`, {
                username,
                email,
                password
            });
            console.log("Registration success:", res.data);
            alert("Registration Successful! Redirecting to login...");
            navigate('/login');
        } catch (err: any) {
            console.error("Registration Details:", err);

            let message = 'Registration Failed';
            if (err.response) {
                // Server responded with a status code
                message += `: ${err.response.status} ${err.response.statusText}`;
                if (err.response.data && err.response.data.detail) {
                    message += ` - ${err.response.data.detail}`;
                } else {
                    message += ` - ${JSON.stringify(err.response.data)}`;
                }
            } else if (err.request) {
                // Request made but no response received
                message += ': No response received from server. Check network or server status.';
            } else {
                // Error setting up request
                message += `: ${err.message}`;
            }

            setError(message);
            alert(`${message}\n\nURL Tried: ${AUTH_URL}/register`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-text p-4">
            <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-white/10 backdrop-blur-xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">Create Account</h2>

                {error && <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-lg text-sm">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-4">
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
                        <label className="block text-sm text-muted mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    <button type="submit" className="w-full py-3 rounded-lg bg-secondary hover:bg-secondary/80 text-white font-bold transition-all mt-2 shadow-[0_0_15px_rgba(0,246,255,0.3)] hover:shadow-[0_0_25px_rgba(0,246,255,0.5)] hover:scale-[1.02] active:scale-[0.98]">
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-muted text-sm">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
                </p>
            </div>

            <div className="fixed inset-0 -z-10 pointer-events-none bg-space-gradient opacity-80"></div>
        </div>
    );
};

export default Register;
