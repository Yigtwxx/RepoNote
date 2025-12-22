import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { DOC_URL } from '../services/api';
import { FileText, Clock, Search, Plus, UploadCloud, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import GlowingButton from '../components/ui/GlowingButton';
import NeonInput from '../components/ui/NeonInput';
import ParticleNetwork from '../components/ParticleNetwork';

interface Document {
    id: number;
    title: string;
    description: string;
    created_at: string;
    tags: string;
    owner_id: number;
}

const getTagStyles = (tag: string) => {
    const t = tag?.toUpperCase() || '';
    switch (t) {
        case 'PDF': return 'bg-red-500/10 border-red-500/20 text-red-300';
        case 'DOC': return 'bg-blue-500/10 border-blue-500/20 text-blue-300';
        case 'PPT': return 'bg-orange-500/10 border-orange-500/20 text-orange-300';
        case 'XLS': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300';
        case 'TXT': return 'bg-gray-500/10 border-gray-500/20 text-gray-300';
        case 'IMG': return 'bg-pink-500/10 border-pink-500/20 text-pink-300';
        case 'CODE': return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300';
        case 'ARCHIVE': return 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300';
        default: return 'bg-purple-500/10 border-purple-500/20 text-purple-300';
    }
};

const Dashboard = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await api.get(`${DOC_URL}/documents`);
            setDocuments(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredDocs = documents.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.preventDefault(); // Prevent navigation
        if (!window.confirm("Are you sure you want to delete this node? This action is irreversible.")) return;

        try {
            await api.delete(`${DOC_URL}/documents/${id}`);
            setDocuments(documents.filter(doc => doc.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete document.");
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden">

            {/* --- Neural Network Background --- */}
            <ParticleNetwork />
            <div className="fixed inset-0 z-0 bg-gradient-to-t from-[#030014] via-transparent to-[#030014]/50 pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-10">

                {/* --- Hero Section --- */}
                <header className="flex flex-col items-center text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >

                        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-2">
                            <span className="text-white drop-shadow-2xl">Neural</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Archives</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            A decentralized knowledge base for your second brain.
                            <br className="hidden sm:block" />
                            Store, retrieve, and connect your digital assets.
                        </p>
                    </motion.div>

                    {/* --- Search Bar --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-full max-w-2xl"
                    >
                        <NeonInput
                            icon={<Search className="text-purple-400" />}
                            placeholder="Search quantum nodes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-14 text-lg bg-black/40 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-2xl"
                        />
                    </motion.div>
                </header>

                {/* --- Controls & Legend --- */}
                <div className="w-full max-w-5xl flex items-center justify-between px-2">
                    <div className="text-xs text-gray-500 font-mono hidden sm:flex items-center gap-4">
                        {/* Legend Removed */}
                    </div>

                    <Link to="/upload">
                        <GlowingButton icon={<Plus size={18} />} className="shadow-[0_0_20px_rgba(112,66,248,0.3)]">
                            Create Node
                        </GlowingButton>
                    </Link>
                </div>

                {/* --- Content Grid --- */}
                <motion.div
                    layout
                    className="w-full min-h-[400px]"
                >
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse border border-white/5" />
                            ))}
                        </div>
                    ) : filteredDocs.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]"
                        >
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                <UploadCloud size={40} className="text-white/50" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">Repository Empty</h3>
                            <p className="text-gray-400 mb-8 max-w-sm text-center">Initialize your first neural node to begin mapping your knowledge graph.</p>
                            {/* Initialize Button Removed */}
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {filteredDocs.map((doc, idx) => (
                                    <motion.div
                                        key={doc.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <Link to={`/note/${doc.id}`}>
                                            <GlassCard hoverEffect className="h-full p-6 flex flex-col group relative overflow-hidden bg-black/40">

                                                {/* Card Glow Effect on Hover */}
                                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

                                                <div className="flex justify-between items-start mb-4 relative z-10">
                                                    <div className="p-3 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl text-cyan-300 ring-1 ring-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                        <FileText size={20} />
                                                    </div>
                                                    {doc.tags && (
                                                        <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase ${getTagStyles(doc.tags.split(',')[0])}`}>
                                                            {doc.tags.split(',')[0]}
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                                                    {doc.title}
                                                </h3>

                                                <p className="text-gray-400 text-sm line-clamp-2 mb-6 leading-relaxed">
                                                    {doc.description || "No description provided."}
                                                </p>

                                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                                                        <Clock size={12} />
                                                        <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                    <button
                                                        onClick={(e) => handleDelete(e, doc.id)}
                                                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                                                        title="Delete Node"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </GlassCard>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
