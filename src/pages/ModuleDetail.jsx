import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, Star, Clock, DollarSign, Play } from 'lucide-react';
import '../styles/ModuleDetail.css';

const ModuleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { modules, concepts } = useContent();

    const module = modules.find(m => m.id === id);

    if (!module) {
        return <div className="module-not-found">Module not found</div>;
    }

    // Get the concept associated with this module
    const concept = concepts.find(c => module.conceptIds?.includes(c.id));

    return (
        <div className="module-detail-page">
            {/* Back Arrow */}
            <button className="back-arrow-btn" onClick={() => navigate('/modules')}>
                <ArrowLeft size={24} />
                <span>Back to Modules</span>
            </button>

            {/* Demo Video Section */}
            <div className="demo-video-section">
                <h1 className="module-detail-title">{module.title}</h1>
                <p className="module-detail-subtitle">Teacher Demo Video</p>

                <div className="video-player-container">
                    <div className="video-placeholder">
                        <Play size={64} className="play-icon" />
                        <p>Demo Video: {module.title}</p>
                        <span className="teacher-name">by {module.teacherName}</span>
                    </div>
                </div>

                <div className="demo-description">
                    <h3>About this module</h3>
                    <p>{module.description}</p>
                    <p>In this demo video, {module.teacherName} will introduce you to the core concepts and give you an overview of what you'll learn in this module.</p>
                </div>
            </div>

            {/* Continue Learning Section */}
            <div className="continue-learning-section">
                <h2 className="section-heading">Continue learning with concept video</h2>

                {concept ? (
                    <div className="concept-video-card">
                        <div className="concept-video-thumbnail">
                            <Play size={48} className="concept-play-icon" />
                        </div>

                        <div className="concept-video-content">
                            <div className="concept-header">
                                <h3 className="concept-title">{concept.name}</h3>
                                <div className="concept-price">
                                    ₹{concept.price}
                                </div>
                            </div>

                            <div className="concept-meta">
                                <div className="concept-rating">
                                    <Star size={16} fill="#fbbf24" color="#fbbf24" />
                                    <span>{concept.rating || module.teacherRating}</span>
                                    <span className="rating-count">(250+ ratings)</span>
                                </div>
                                <div className="concept-duration">
                                    <Clock size={16} />
                                    <span>{concept.time || '15 min'}</span>
                                </div>
                            </div>

                            <p className="concept-description">
                                {concept.description || module.description}
                            </p>

                            <div className="concept-teacher-info">
                                <div className="teacher-avatar">
                                    {module.teacherName.charAt(0)}
                                </div>
                                <div className="teacher-details">
                                    <div className="teacher-name-label">Instructor</div>
                                    <div className="teacher-name-value">{module.teacherName}</div>
                                </div>
                            </div>

                            <button
                                className="watch-concept-btn"
                                onClick={() => navigate(`/learn/${concept.id}`)}
                            >
                                Watch Concept Video
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="no-concept-message">
                        <p>Concept video coming soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModuleDetail;
