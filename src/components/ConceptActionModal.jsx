import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, Plus, Share2, X, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/ConceptActionModal.css';

const ConceptActionModal = ({ isOpen, onClose, concept }) => {
    const navigate = useNavigate();

    if (!concept) return null;

    // Simulate some missing data for the UI
    const { rating, reviews, duration, thumbnail } = React.useMemo(() => {
        const hash = (concept.id || '').toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const rand = (hash % 100) / 100;
        return {
            rating: (rand * (5 - 4.2) + 4.2).toFixed(1),
            reviews: Math.floor(rand * 5000) + 100,
            duration: "5-10 min",
            thumbnail: `https://picsum.photos/seed/${concept.id}/600/338`
        };
    }, [concept.id]);

    const handleStartLearning = () => {
        onClose();
        navigate(`/concept/${concept.id}`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay-unity">
                    <motion.div
                        className="modal-backdrop-unity"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="modal-container-unity"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <button className="modal-close-btn-unity" onClick={onClose}>
                            <X size={24} />
                        </button>

                        <div className="modal-banner-unity">
                            <img src={thumbnail} alt={concept.concept} />
                            <div className="banner-overlay-unity">
                                <motion.button
                                    className="play-pulse-btn-unity"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleStartLearning}
                                >
                                    <Play size={32} fill="white" />
                                </motion.button>
                            </div>
                        </div>

                        <div className="modal-body-unity">
                            <div className="modal-header-info-unity">
                                <div className="modal-top-meta-unity">
                                    <span className="modal-badge-saas">Premium Content</span>
                                    <div className="modal-rating-saas">
                                        <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                        <span>{rating}</span>
                                        <span className="reviews-muted">({reviews})</span>
                                    </div>
                                </div>
                                <h2 className="modal-title-unity">{concept.concept}</h2>
                                <p className="modal-sub-unity">By <span className="mentor-name-saas">{concept.mentorName || 'Top Mentor'}</span> • {duration}</p>
                            </div>

                            <p className="modal-description-unity">
                                Master this concept with our deep-dive micro-module. Designed for retention and quick application in real-world scenarios.
                            </p>

                            <div className="modal-actions-grid-unity">
                                <button className="action-btn-saas primary" onClick={handleStartLearning}>
                                    <Play size={18} fill="currentColor" />
                                    <span>Start Learning</span>
                                </button>
                                <button className="action-btn-saas secondary" onClick={() => navigate(`/concept/${concept.id}`)}>
                                    <Info size={18} />
                                    <span>Full Details</span>
                                </button>
                                <button className="action-btn-saas outline">
                                    <Plus size={18} />
                                    <span>Add to Library</span>
                                </button>
                                <button className="action-btn-saas outline">
                                    <Share2 size={18} />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConceptActionModal;
