import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { DOC_URL, VER_URL } from '../services/api';
import { Upload as UploadIcon, File } from 'lucide-react';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        try {
            // 1. Create Document
            const docRes = await api.post(`${DOC_URL}/documents`, {
                title,
                description,
                tags: "general" // Default for now
            });
            const docId = docRes.data.id;

            // 2. Upload Version (This automatically uploads to Storage Service via Versioning Logic)
            // Wait, our backend logic in Versioning Service handles the storage upload proxy.

            const formData = new FormData();
            formData.append('file', file);

            // We need to pass query param or append to formData? 
            // Versioning Service create_version expects `document_id` query param usually or we specified path param?
            // Checking Versioning Service code: @app.post("/versions") -> document_id: int (Query param by default in FastAPI)

            await api.post(`${VER_URL}/versions?document_id=${docId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            navigate(`/note/${docId}`);
        } catch (err) {
            console.error(err);
            alert("Upload failed. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Upload New Note</h1>

            <div className="glass-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-muted mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:border-secondary focus:outline-none transition-all text-white"
                            required
                            placeholder="e.g. Advanced Calculus Week 1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-muted mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:border-secondary focus:outline-none transition-all text-white h-32 resize-none"
                            placeholder="Briefly describe the contents..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-muted mb-2">File</label>
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-secondary/50 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                required
                            />
                            <div className="flex flex-col items-center gap-2 pointer-events-none">
                                {file ? (
                                    <>
                                        <File className="text-secondary" size={32} />
                                        <span className="text-white font-medium">{file.name}</span>
                                        <span className="text-xs text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                    </>
                                ) : (
                                    <>
                                        <UploadIcon className="text-muted" size={32} />
                                        <span className="text-muted">Click or drag file here</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !file}
                        className="w-full py-4 rounded-lg bg-secondary hover:bg-secondary/90 text-black font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? 'Uploading...' : 'Create Note'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Upload;
