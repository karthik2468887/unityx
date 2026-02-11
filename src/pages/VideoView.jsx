import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Play, User, Star,
    ArrowRight, Clock, Video
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Footer from '../components/layout/Footer';
import '../styles/VideoView.css';

const VideoView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { concepts } = useContent();

    const concept = useMemo(() => concepts.find(c => c.id === id), [concepts, id]);

    if (!concept) return <div className="loading-view" style={{ background: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Module...</div>;

    return (
        <div className="video-view-page">
            <header className="view-header">
                <div className="content-max-width header-flex">
                    <button onClick={() => navigate(-1)} className="back-btn-circle">
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="view-title">{concept.name || concept.concept}</h1>
                </div>
            </header>

            <main className="view-main content-max-width">
                {/* TEACHER DEMO SECTION */}
                <section className="demo-section">
                    <div className="demo-player-container">
                        <div className="demo-placeholder-box">
                            <Play size={64} className="play-pulse" />
                            <div className="demo-label">Teacher Demo Implementation</div>
                        </div>
                    </div>
                    <div className="demo-info">
                        <h2>Demo Overview</h2>
                        <p>This session covers the practical implementation of {concept.concept}. Follow along as the mentor explores real-world use cases and variations.</p>
                    </div>
                </section>

                {/* CONCEPT CREDENTIALS SECTION */}
                <section className="credentials-section">
                    <h2 className="credentials-title">Concept Details</h2>
                    <div className="credentials-grid">
                        <div className="credential-item">
                            <span className="credential-label">Concept Name</span>
                            <span className="credential-value">{concept.name || concept.concept}</span>
                        </div>
                        <div className="credential-item">
                            <span className="credential-label">Category</span>
                            <span className="credential-value">{concept.subjectName || 'General'}</span>
                        </div>
                        <div className="credential-item">
                            <span className="credential-label">Chapter</span>
                            <span className="credential-value">{concept.chapterName || 'Core Concepts'}</span>
                        </div>
                        <div className="credential-item">
                            <span className="credential-label">Price</span>
                            <span className="credential-value price-highlight">₹{concept.price}</span>
                        </div>
                        <div className="credential-item">
                            <span className="credential-label">Teacher</span>
                            <span className="credential-value">
                                <User size={16} style={{ marginRight: '6px' }} />
                                Prof. Rahul Sharma
                            </span>
                        </div>
                        <div className="credential-item">
                            <span className="credential-label">Rating</span>
                            <span className="credential-value rating-value">
                                <Star size={16} fill="#fbbf24" color="#fbbf24" style={{ marginRight: '4px' }} />
                                4.9 (3,500+ reviews)
                            </span>
                        </div>
                        <div className="credential-item">
                            <span className="credential-label">Duration</span>
                            <span className="credential-value">
                                <Clock size={16} style={{ marginRight: '6px' }} />
                                5-10 minutes
                            </span>
                        </div>
                        <div className="credential-item full-width">
                            <span className="credential-label">Description</span>
                            <p className="credential-description">
                                Master {concept.name || concept.concept} with this comprehensive video lesson.
                                This concept covers fundamental principles and practical applications in {concept.subjectName}.
                                Perfect for exam preparation and building strong foundational knowledge.
                            </p>
                        </div>
                    </div>
                </section>

                <hr className="section-divider" />

                {/* CONCEPT VIDEO SECTION */}
                <section className="concept-video-section">
                    <div className="section-header-row">
                        <div className="icon-badge"><Video size={20} /></div>
                        <h2>Continue Learning with Concept Video</h2>
                    </div>

                    <div className="concept-video-layout">
                        <div className="video-card-main">
                            <div className="video-thumb-large">
                                <img src={`https://picsum.photos/seed/${concept.id}/800/450`} alt="Concept Thumbnail" />
                                <div className="unlock-overlay">
                                    <Play size={40} fill="white" />
                                </div>
                            </div>
                            <div className="video-footer-info">
                                <div className="info-top">
                                    <h3>{concept.concept}</h3>
                                    <div className="price-tag-big">₹{concept.price}</div>
                                </div>
                                <div className="mentor-row">
                                    <div className="mentor-avatar-mini">
                                        <User size={14} />
                                    </div>
                                    <span>Prof. Rahul Sharma</span>
                                    <div className="rating-pill">
                                        <Star size={12} fill="currentColor" />
                                        <span>4.9</span>
                                    </div>
                                </div>
                                <p className="concept-desc">Deep dive into theory and logic of {concept.concept}. Comprehensive exam-ready modules for advanced learners.</p>
                            </div>
                        </div>

                        <aside className="next-modules-side">
                            <h3>Next Modules</h3>
                            <div className="mini-module-list">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="mini-card">
                                        <div className="mini-thumb"></div>
                                        <div className="mini-details">
                                            <h4>Advanced Applications</h4>
                                            <span>15 min • Video</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default VideoView;
