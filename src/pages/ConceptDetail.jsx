import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useWallet } from '../context/WalletContext';
import NativeService from '../services/NativeService';
import {
    Star, Clock, Globe, Shield, PlayCircle,
    Check, Award, Users, ChevronRight, Share2,
    Gift, Tag
} from 'lucide-react';
import '../styles/ConceptDetail.css';

const ConceptDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { concepts, isConceptPurchased, unlockConcept } = useContent();
    const { balance } = useWallet();

    const concept = concepts.find(c => c.id === id);
    const isPurchased = isConceptPurchased(id);

    if (!concept) return <div className="error-view">Concept not found</div>;

    const handleUnlock = async () => {
        if (balance < concept.price) {
            alert("Insufficient balance! Please add funds to your wallet.");
            navigate('/wallet');
            return;
        }

        const success = await NativeService.triggerUPIIntent("concept@upi", "Unity Learn", concept.price);
        if (success) {
            unlockConcept(id);
            alert("Concept unlocked! Happy learning.");
        }
    };

    return (
        <div className="concept-detail-udemy">
            {/* STICKY HEADER MOCK (Optional enhancement) */}

            {/* Dark Hero Header */}
            <div className="detail-hero">
                <div className="content-max-width detail-hero-container">
                    <div className="hero-left">
                        <div className="breadcrumb-udemy">
                            <span>Courses</span> <ChevronRight size={14} />
                            <span>{concept.subjectName}</span> <ChevronRight size={14} />
                            <span>{concept.concept}</span>
                        </div>

                        <h1 className="detail-title">{concept.concept}</h1>
                        <p className="detail-headline">
                            Master the core principles of {concept.concept} through high-impact visual explanations
                            designed for rapid understanding and retention.
                        </p>

                        <div className="detail-meta-row">
                            <div className="rating-badge-udemy">
                                <span className="rating-text">4.8</span>
                                <div className="stars-mini">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < 4 ? "#fbbf24" : "none"} color="#fbbf24" strokeWidth={3} />
                                    ))}
                                </div>
                                <span className="rating-count">(1,245 ratings)</span>
                                <span className="student-count">4,562 students</span>
                            </div>
                        </div>

                        <div className="detail-author">
                            Created by <span className="author-link">{concept.mentorName || 'Unity Expert Mentor'}</span>
                        </div>

                        <div className="detail-extra-info">
                            <span><Clock size={16} /> 5-10 min duration</span>
                            <span><Globe size={16} /> Available in English</span>
                            <span><Award size={16} /> Certified Module</span>
                        </div>
                    </div>

                    <div className="hero-right">
                        {/* Floating Purchase Card */}
                        <div className="purchase-card-unity">
                            <div className="preview-video-box">
                                <img src={`https://picsum.photos/seed/${concept.id}/600/337`} alt="Preview Thumbnail" />
                                <div className="video-overlay">
                                    <div className="play-icon-mini" style={{ width: '64px', height: '64px' }}>
                                        <PlayCircle size={32} />
                                    </div>
                                    <span>Preview this Module</span>
                                </div>
                            </div>

                            <div className="purchase-content">
                                <div className="price-primary">₹{concept.price}</div>

                                {isPurchased ? (
                                    <button className="btn-primary-saas" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate(`/learn/${id}`)}>
                                        Continue Learning
                                    </button>
                                ) : (
                                    <button className="btn-primary-saas" style={{ width: '100%', justifyContent: 'center' }} onClick={handleUnlock}>
                                        Unlock Full Access
                                    </button>
                                )}

                                <div className="guarantee">Instant lifetime access upon payment</div>

                                <div className="includes-list">
                                    <h4>Module Essentials:</h4>
                                    <ul>
                                        <li><PlayCircle size={16} /> Cinematic 4K Explainer</li>
                                        <li><Clock size={16} /> Precise & Concise Format</li>
                                        <li><Shield size={16} /> Lifetime Study Resource</li>
                                        <li><Award size={16} /> Unity Verified Certificate</li>
                                    </ul>
                                </div>

                                <div className="action-links">
                                    <span><Share2 size={14} /> Share</span>
                                    <span><Gift size={14} /> Gift</span>
                                    <span><Tag size={14} /> Coupon</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="content-max-width detail-body">
                <div className="detail-main-content">
                    {/* What you'll learn */}
                    <div className="learning-objective-box">
                        <h2>Learning Objectives</h2>
                        <div className="objectives-grid">
                            <div className="objective-item">
                                <Check size={18} />
                                <span>Core theoretical foundations behind {concept.concept}</span>
                            </div>
                            <div className="objective-item">
                                <Check size={18} />
                                <span>Real-world case studies and industry examples</span>
                            </div>
                            <div className="objective-item">
                                <Check size={18} />
                                <span>Optimization techniques and professional tips</span>
                            </div>
                            <div className="objective-item">
                                <Check size={18} />
                                <span>Preparation for standard interviews or exams</span>
                            </div>
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="section-block">
                        <h2>Prerequisites</h2>
                        <ul className="simple-list">
                            <li>A basic understanding of {concept.subjectName} fundamentals.</li>
                            <li>No prior advanced knowledge of {concept.concept} required.</li>
                        </ul>
                    </div>

                    {/* Description */}
                    <div className="section-block">
                        <h2>Module Overview</h2>
                        <div className="description-text">
                            <p>This Unity precision module is engineered to give you 80% of the value in 20% of the time. We focus on the most critical elements of {concept.concept}, stripping away the academic fluff to give you pure, actionable knowledge.</p>
                            <p>Taught by industry experts with years of practical experience, this session provides the clarity you need to master the topic quickly and effectively.</p>
                        </div>
                    </div>

                    {/* Mentor Info */}
                    <div className="mentor-info-section">
                        <h2>Instructor</h2>
                        <div className="mentor-header-unity">
                            <div className="avatar-xl">{concept.mentorName?.[0] || 'U'}</div>
                            <div className="mentor-name-meta">
                                <span className="name-link">{concept.mentorName || 'Unity Educator'}</span>
                                <p className="title">Senior Curriculum Lead at Unity Precision Learning</p>
                            </div>
                        </div>
                        <div className="mentor-stats">
                            <div className="m-stat"><Star size={16} /> 4.9 Rating</div>
                            <div className="m-stat"><Users size={16} /> 25k+ Students</div>
                            <div className="m-stat"><PlayCircle size={16} /> 48 Modules</div>
                            <div className="m-stat"><Award size={16} /> Verified Expert</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConceptDetail;
