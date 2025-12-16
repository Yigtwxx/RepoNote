import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api, { DOC_URL, VER_URL, COM_URL } from '../services/api';
import { Download, MessageCircle, Clock, File } from 'lucide-react';

interface Document {
    id: number;
    title: string;
    description: string;
    created_at: string;
}

interface Version {
    id: number;
    version_number: number;
    file_name: string;
    created_at: string;
    download_url: string;
}

interface Comment {
    id: number;
    username: string;
    content: string;
    created_at: string;
}

const NoteDetail = () => {
    const { id } = useParams();
    const [doc, setDoc] = useState<Document | null>(null);
    const [versions, setVersions] = useState<Version[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [docRes, verRes, comRes] = await Promise.all([
                    api.get(`${DOC_URL}/documents/${id}`),
                    api.get(`${VER_URL}/versions/${id}`),
                    api.get(`${COM_URL}/comments/${id}`)
                ]);
                setDoc(docRes.data);
                setVersions(verRes.data);
                setComments(comRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const res = await api.post(`${COM_URL}/comments`, {
                document_id: Number(id),
                content: newComment
            });
            setComments([...comments, res.data]);
            setNewComment('');
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!doc) return <div>Not Found</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content: Info & Versions */}
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        {doc.title}
                    </h1>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        {doc.description}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-muted text-sm">
                        <Clock size={16} />
                        Created on {new Date(doc.created_at).toLocaleDateString()}
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <File className="text-secondary" />
                        Version History
                    </h3>

                    <div className="space-y-3">
                        {versions.map((ver) => (
                            <div key={ver.id} className="flex items-center justify-between p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-colors border border-white/5">
                                <div>
                                    <div className="font-semibold text-white">Version {ver.version_number}</div>
                                    <div className="text-xs text-muted">{new Date(ver.created_at).toLocaleString()}</div>
                                    <div className="text-xs text-muted mt-1">{ver.file_name}</div>
                                </div>
                                <a
                                    href={ver.download_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/40 transition-colors"
                                    title="Download"
                                >
                                    <Download size={20} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar: Comments */}
            <div className="lg:col-span-1">
                <div className="glass-card p-6 h-full flex flex-col">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <MessageCircle className="text-primary" />
                        Discussion
                    </h3>

                    <div className="flex-grow space-y-4 mb-6 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin scrollbar-thumb-white/10">
                        {comments.length === 0 && (
                            <div className="text-center text-muted text-sm my-10">No comments yet.</div>
                        )}
                        {comments.map((comment) => (
                            <div key={comment.id} className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-secondary text-sm">{comment.username}</span>
                                    <span className="text-[10px] text-muted">{new Date(comment.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-gray-300">{comment.content}</p>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleCommentSubmit} className="mt-auto">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-primary focus:outline-none text-sm text-white resize-none mb-2"
                            placeholder="Add a comment..."
                            rows={3}
                        />
                        <button type="submit" className="w-full py-2 bg-primary/80 hover:bg-primary text-white rounded-lg text-sm font-semibold transition-colors">
                            Post Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NoteDetail;
