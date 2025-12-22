import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import ParticleNetwork from './ParticleNetwork';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-lg">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                        RepoNote
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link to="/upload" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors">
                            <Plus size={18} />
                            <span>Upload</span>
                        </Link>
                        <button onClick={handleLogout} className="text-muted hover:text-white transition-colors">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-12 container mx-auto px-6">
                {children}
            </main>

            {/* Advanced Background Elements */}
            <div className="space-bg">
                {/* We can use multiple star layers if we had the JS generator, but for now CSS handles basic stars */}
                <div className="nebula-glow glow-purple"></div>
                <div className="nebula-glow glow-cyan"></div>
            </div>
            <ParticleNetwork />
        </div>
    );
};

export default Layout;
