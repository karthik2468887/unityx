import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    Star,
    Share2,
    FileText,
    Info,
    MessageCircle,
    Play,
    CheckCircle,
    Check,
    Activity,
    ChevronRight,
    Users,
    Clock
} from 'lucide-react';
import '../styles/VideoPlayer.css';

const VideoPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { concepts, isConceptPurchased } = useContent();

    const [activeTab, setActiveTab] = useState('info');
    const concept = concepts.find(c => c.id === id);
    const related = concepts.filter(c => c.id !== id).slice(0, 4);

    if (!concept) return <div className="error-view">Concept not found</div>;

    if (!isConceptPurchased(id)) {
        return (
            <div className="upload-success">
                <motion.div
                    className="success-content"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="success-icon">
                        <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', color: '#ef4444' }}>
                            <ShieldOff size={48} />
                        </div>
                    </div>
                    <h2>Access Restricted</h2>
                    <p>You haven't unlocked this premium micro-module yet. Please purchase it to start learning.</p>
                    <button className="next-btn" onClick={() => navigate(`/concept/${id}`)}>
                        View Module Details
                    </button>
                    <button className="btn-secondary" style={{ marginTop: '16px' }} onClick={() => navigate('/')}>
                        Back to Library
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="video-player-unity">
            <header className="player-header-unity">
                <div className="content-max-width player-nav-unity">
                    <button onClick={() => navigate(-1)} className="back-link">
                        <ChevronLeft size={20} />
                        <span>Return to Catalog</span>
                    </button>
                    <div className="player-actions">
                        <button className="share-btn">
                            <Share2 size={16} />
                            <span>Share Module</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="player-layout">
                {/* Main Video Area */}
                <div className="player-main">
                    <div className="content-max-width">
                        <div className="video-header-section">
                            <div className="breadcrumb-trail">
                                <span>{concept.subjectName}</span>
                                <ChevronRight size={14} />
                                <span>{concept.chapterName}</span>
                            </div>
                            <h1 className="concept-main-title">{concept.concept}</h1>
                        </div>

                        <motion.div
                            className="video-viewport"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {concept.videoUrl ? (
                                <video
                                    src={concept.videoUrl}
                                    controls
                                    autoPlay
                                    className="html5-video-player"
                                />
                            ) : (
                                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                    <img src={`https://picsum.photos/seed/v${concept.id}/1280/720`} alt="Video Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div className="play-overlay">
                                        <Play size={32} fill="white" />
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        <div className="content-info-card">
                            <div className="info-main">
                                <div className="mentor-profile">
                                    <img src={`https://ui-avatars.com/api/?name=${concept.mentorName || 'Mentor'}&background=4f46e5&color=fff`} alt="Mentor" />
                                    <div>
                                        <span className="label">Delivered By</span>
                                        <h4>{concept.mentorName || 'Unity Expert'}</h4>
                                    </div>
                                </div>
                                <div className="meta-stats">
                                    <div className="stat-pill rating">
                                        <Star size={16} fill="currentColor" />
                                        <span>4.9 Content Rating</span>
                                    </div>
                                    <div className="stat-pill price">
                                        <CheckCircle size={16} />
                                        <span>Full Access Granted</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="player-tabs">
                            <button
                                className={activeTab === 'info' ? 'active' : ''}
                                onClick={() => setActiveTab('info')}
                            >
                                <Info size={18} /> Module Overview
                            </button>
                            <button
                                className={activeTab === 'notes' ? 'active' : ''}
                                onClick={() => setActiveTab('notes')}
                            >
                                <FileText size={18} /> Personal Notes
                            </button>
                            <button
                                className={activeTab === 'doubts' ? 'active' : ''}
                                onClick={() => setActiveTab('doubts')}
                            >
                                <MessageCircle size={18} /> Ask a Doubt
                            </button>
                        </div>

                        <div className="tab-content-panel">
                            <AnimatePresence mode="wait">
                                {activeTab === 'info' && (
                                    <motion.div
                                        key="info"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="overview-tab"
                                    >
                                        <h3 style={{ marginBottom: '16px' }}>What you are learning</h3>
                                        <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
                                            In this high-precision micro-module, we dive deep into {concept.concept}.
                                            Our industry expert mentor breaks down complex theoretical frameworks into
                                            actionable visual mental-models.
                                        </p>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#10b981', fontSize: '0.9rem', fontWeight: 600 }}>
                                                <Check size={16} /> Visual Mental Models
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#10b981', fontSize: '0.9rem', fontWeight: 600 }}>
                                                <Check size={16} /> Precision Examples
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#10b981', fontSize: '0.9rem', fontWeight: 600 }}>
                                                <Check size={16} /> Exam-Ready Logic
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'notes' && (
                                    <motion.div
                                        key="notes"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="notes-tab"
                                    >
                                        <textarea placeholder="Write a note to yourself at this timestamp... (e.g. Important formula at 02:30)"></textarea>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <button className="btn-outline-sm" style={{ padding: '12px 24px' }}>Save Study Note</button>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'doubts' && (
                                    <motion.div
                                        key="doubts"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="doubts-tab"
                                    >
                                        <div style={{ padding: '32px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                                            <Activity size={48} color="#1e293b" style={{ marginBottom: '16px' }} />
                                            <h3>Have a question?</h3>
                                            <p style={{ color: '#64748b', marginBottom: '24px' }}>Your mentor is available for one-on-one doubt clearing sessions.</p>
                                            <button className="btn-outline-sm" style={{ margin: '0 auto' }}>Connect with Mentor</button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Sidebar Side Panel */}
                <div className="player-sidebar">
                    <div className="sidebar-header">
                        <h3>Up Next</h3>
                        <span>{related.length} modules</span>
                    </div>
                    <div className="related-list-player">
                        {related.map((rec, idx) => (
                            <motion.div
                                key={rec.id}
                                className="related-item-player"
                                onClick={() => navigate(`/learn/${rec.id}`)}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="item-thumb">
                                    <img src={`https://picsum.photos/seed/${rec.id}/140/80`} alt="Thumbnail" />
                                    <div className="item-play-overlay">
                                        <div style={{ width: '32px', height: '32px', background: '#4f46e5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Play size={14} fill="white" color="white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="item-info">
                                    <p className="item-title">{rec.concept}</p>
                                    <div className="item-meta">
                                        <Clock size={12} />
                                        <span>5 min</span>
                                        <span style={{ color: '#4f46e5' }}>• Verified</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Icon
const ShieldOff = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18" />
        <path d="M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

export default VideoPlayer;
