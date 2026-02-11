import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, Star, Clock, IndianRupee } from 'lucide-react';
import '../styles/CategoryConcepts.css';

const CategoryConcepts = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const { subjects, concepts } = useContent();

    // Find the category/subject
    const category = subjects.find(s => s.id === categoryId);

    // Filter concepts by category
    const categoryConcepts = concepts.filter(c => c.subjectId === categoryId);

    if (!category) {
        return <div>Category not found</div>;
    }

    return (
        <div className="category-concepts-page">
            {/* Header with Back Button */}
            <header className="concepts-header">
                <button className="back-btn" onClick={() => navigate('/')}>
                    <ArrowLeft size={24} />
                    <span>Back to Home</span>
                </button>
                <h1 className="category-title">{category.name} Concepts</h1>
                <p className="category-subtitle">Master {category.name} with our expert-curated concepts</p>
            </header>

            {/* Concepts Grid */}
            <div className="concepts-container">
                {categoryConcepts.length > 0 ? (
                    <div className="concepts-grid">
                        {categoryConcepts.map((concept) => (
                            <div
                                className="concept-card-small"
                                onClick={() => navigate(`/learn-module/${concept.id}`)}
                            >
                                <div className="concept-card-header">
                                    <span className="concept-badge">{concept.chapterName}</span>
                                    <div className="concept-rating">
                                        <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                        <span>{concept.rating || 4.8}</span>
                                    </div>
                                </div>

                                <h3 className="concept-title">{concept.name}</h3>

                                <div className="concept-meta">
                                    <div className="meta-item">
                                        <Clock size={14} />
                                        <span>{concept.time || '5-10 min'}</span>
                                    </div>
                                    <div className="meta-item price">
                                        <IndianRupee size={14} />
                                        <span>{concept.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>No concepts available for {category.name} yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryConcepts;
