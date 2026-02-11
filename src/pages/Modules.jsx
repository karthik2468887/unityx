import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MODULES } from '../data/mockData';
import { ArrowLeft, BookOpen, Star, Clock } from 'lucide-react';
import '../styles/Modules.css';

const Modules = () => {
    const navigate = useNavigate();

    const handleModuleClick = (moduleId) => {
        navigate(`/module/${moduleId}`);
    };

    return (
        <div className="modules-page">
            {/* Header */}
            <header className="modules-header">
                <button className="back-btn" onClick={() => navigate('/')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>Learning Modules</h1>
                <div className="header-subtitle">Choose a module to start your learning journey</div>
            </header>

            {/* Modules Container */}
            <div className="modules-container">
                <div className="modules-scroll">
                    {MODULES.map((module) => (
                        <div
                            key={module.id}
                            className="module-card"
                            onClick={() => handleModuleClick(module.id)}
                        >
                            <div className="module-category-tag">{module.category}</div>

                            <div className="module-icon">
                                <BookOpen size={32} />
                            </div>

                            <h3 className="module-title">{module.title}</h3>
                            <p className="module-description">{module.description}</p>

                            <div className="module-meta">
                                <div className="module-rating">
                                    <Star size={16} fill="#fbbf24" color="#fbbf24" />
                                    <span>{module.teacherRating}</span>
                                </div>
                                <div className="module-teacher">
                                    {module.teacherName}
                                </div>
                            </div>

                            {module.progress > 0 ? (
                                <button className="module-btn continue">
                                    Continue Learning
                                </button>
                            ) : (
                                <button className="module-btn start">
                                    Start Learning
                                </button>
                            )}

                            {module.progress > 0 && (
                                <div className="module-progress">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${module.progress}%` }}
                                        ></div>
                                    </div>
                                    <span className="progress-text">{module.progress}% Complete</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modules;
