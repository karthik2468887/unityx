import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Play, DownloadCloud, BookOpen, Clock, Heart, Archive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ConceptCard from '../components/ConceptCard';
import '../styles/MyLearning.css';

const MyLearning = () => {
    const [activeTab, setActiveTab] = useState('purchased');
    const { isConceptPurchased, concepts } = useContent();
    const navigate = useNavigate();

    const purchasedConcepts = concepts.filter(c => isConceptPurchased(c.id));

    return (
        <div className="my-learning-unity">
            <div className="player-header-unity">
                <div className="content-max-width">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ padding: '3rem 0 2rem', fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.02em' }}
                    >
                        My Learning
                    </motion.h1>
                </div>
            </div>

            <div className="content-max-width my-learning-body">
                <div className="learning-tabs-unity">
                    <button
                        className={activeTab === 'purchased' ? 'active' : ''}
                        onClick={() => setActiveTab('purchased')}
                    >
                        <BookOpen size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        All Modules
                    </button>
                    <button
                        className={activeTab === 'wishlist' ? 'active' : ''}
                        onClick={() => setActiveTab('wishlist')}
                    >
                        <Heart size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Wishlist
                    </button>
                    <button
                        className={activeTab === 'archived' ? 'active' : ''}
                        onClick={() => setActiveTab('archived')}
                    >
                        <Archive size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Archived
                    </button>
                </div>

                <motion.div
                    className="learning-content-grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {activeTab === 'purchased' && (
                        purchasedConcepts.length > 0 ? (
                            <div className="concepts-grid-unity">
                                {purchasedConcepts.map(concept => (
                                    <ConceptCard key={concept.id} concept={concept} />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-learning-state">
                                <BookOpen size={64} color="#1e293b" />
                                <h3>No modules unlocked yet</h3>
                                <p>Start your learning journey by exploring our premium micro-courses.</p>
                                <button className="btn-primary-saas" onClick={() => navigate('/')}>
                                    Explore Categories
                                </button>
                            </div>
                        )
                    )}

                    {(activeTab === 'wishlist' || activeTab === 'archived') && (
                        <div className="empty-learning-state">
                            <History size={64} color="#1e293b" />
                            <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} is empty</h3>
                            <p>You haven't added any items here yet.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

// Helper for empty state icon mapping
const History = ({ size, color, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="9" />
    </svg>
);

export default MyLearning;
