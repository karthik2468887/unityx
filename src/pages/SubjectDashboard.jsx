import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, BookOpen, Layers, Users,
    TrendingUp, Settings, Search, Bell, User,
    ChevronRight, Play, CheckCircle2, Lock,
    MessageSquare, Sparkles, Clock, BarChart3
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SUBJECTS, CHAPTERS } from '../data/mockData';
import Footer from '../components/layout/Footer';
import '../styles/SubjectDashboard.css';

const SubjectDashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { subjects: ctxSubjects, chapters: ctxChapters } = useContent();

    const subjectsList = ctxSubjects.length > 0 ? ctxSubjects : SUBJECTS;
    const chaptersList = ctxChapters.length > 0 ? ctxChapters : CHAPTERS;

    const subject = useMemo(() => subjectsList.find(s => s.id === id) || subjectsList[0], [subjectsList, id]);
    const subjectChapters = useMemo(() => chaptersList.filter(c => c.subjectId === subject.id), [chaptersList, subject]);

    const [selectedModule, setSelectedModule] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const filteredModules = useMemo(() => {
        if (!searchQuery) return subjectChapters;
        return subjectChapters.filter(module =>
            module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            module.concepts.some(con => con.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [subjectChapters, searchQuery]);

    useEffect(() => {
        if (subjectChapters.length > 0 && !selectedModule) {
            setSelectedModule(subjectChapters[0]);
        }
    }, [subjectChapters, selectedModule]);

    // Immediate render, no loading screen for subjects

    const sidebarItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'modules', icon: Layers, label: 'Modules' },
        { id: 'concepts', icon: BookOpen, label: 'Concepts' },
        { id: 'mentor', icon: Sparkles, label: 'AI Mentor' },
        { id: 'progress', icon: TrendingUp, label: 'Progress' },
        { id: 'settings', icon: Settings, label: 'Settings' }
    ];

    return (
        <div className={`dashboard-container-dark ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            {/* SIDEBAR */}
            <aside className={`dashboard-sidebar ${isMobileMenuOpen ? 'show' : ''}`}>
                <div className="sidebar-brand">
                    <div className="brand-dot"></div>
                    <span className="brand-text">Unity</span>
                    <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
                        <ChevronRight size={24} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {sidebarItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                            {activeTab === item.id && <motion.div layoutId="active-pill" className="active-pill" />}
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="mentor-mini-status">
                        <div className="status-indicator online"></div>
                        <span>AI Mentor Active</span>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="dashboard-main">
                {/* TOP BAR */}
                <header className="dashboard-topbar">
                    <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(true)}>
                        <LayoutDashboard size={24} />
                    </button>

                    <div className="search-box-glow">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search modules or concepts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="topbar-actions">
                        <button className="icon-btn-glow"><Bell size={20} /></button>
                        <div className="user-profile-glow">
                            <div className="avatar-mini"><User size={20} /></div>
                            <span className="user-name">Alex Smith</span>
                        </div>
                    </div>
                </header>

                <div className="dashboard-scroll-content">
                    {/* OVERVIEW SECTION */}
                    <section className="overview-section">
                        <div className="subject-header">
                            <h1 className="subject-title-gradient">{subject.name} Dashboard</h1>
                            <p className="subject-subtitle">Inner subject master control</p>
                        </div>

                        <div className="stats-grid-glow">
                            <div className="stat-card-glass">
                                <span className="stat-label">Overall Progress</span>
                                <div className="stat-value-flex">
                                    <span className="stat-number">65%</span>
                                    <div className="progress-mini-bar"><div className="progress-fill" style={{ width: '65%' }}></div></div>
                                </div>
                            </div>
                            <div className="stat-card-glass">
                                <span className="stat-label">Modules Completed</span>
                                <span className="stat-number">{Math.floor(subjectChapters.length * 0.6)} / {subjectChapters.length}</span>
                            </div>
                        </div>
                    </section>

                    {/* MODULES GRID SECTION */}
                    <section className="modules-section">
                        <div className="section-header-flex">
                            <h2 className="section-title-glow">Learning Modules</h2>
                            <div className="filter-chips">
                                <span className="chip active">All</span>
                                <span className="chip">In Progress</span>
                                <span className="chip">Completed</span>
                            </div>
                        </div>

                        <div className="modules-horizontal-scroll">
                            {filteredModules.length > 0 ? (
                                filteredModules.map(module => (
                                    <motion.div
                                        key={module.id}
                                        className={`module-card-glow ${selectedModule?.id === module.id ? 'active' : ''}`}
                                        whileHover={{ y: -5 }}
                                        onClick={() => setSelectedModule(module)}
                                    >
                                        <div className={`module-status-icon ${module.concepts.length > 2 ? 'completed' : 'in-progress'}`}>
                                            {module.concepts.length > 2 ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                                        </div>
                                        <h3 className="module-card-title">{module.name}</h3>
                                        <div className="module-meta">
                                            <span>{module.concepts.length} Concepts</span>
                                            <span className="price-badge">₹10</span>
                                        </div>
                                        <div className="selection-glow"></div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="no-results-dash">No modules found matching your search.</div>
                            )}
                        </div>
                    </section>

                    <div className="dashboard-two-column">
                        {/* ACTIVE MODULE PANEL */}
                        <div className="active-panel-column">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedModule?.id}
                                    className="active-module-detail-glass"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h2 className="active-title">{selectedModule?.name}</h2>
                                    <p className="active-desc">Master the core building blocks of {selectedModule?.name}. Follow the path to unlock advanced concepts.</p>

                                    <div className="concepts-list-mini">
                                        {selectedModule?.concepts.map((con, idx) => (
                                            <div key={con.id} className="concept-item-row-glow">
                                                <div className="concept-index">{idx + 1}</div>
                                                <div className="concept-info-mini">
                                                    <h4>{con.name}</h4>
                                                    <span>{con.time} • ⭐ {con.rating}</span>
                                                </div>
                                                {idx < 2 ? <CheckCircle2 size={18} className="text-success" /> : <Play size={18} className="text-primary-glow" />}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className="btn-continue-glow"
                                        onClick={() => navigate(`/learn-module/${selectedModule.id}`)}
                                    >
                                        <span>Continue Learning</span>
                                        <ChevronRight size={18} />
                                    </button>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* PERSISTENT AI MENTOR & INSIGHTS */}
                        <div className="p-side-column">
                            <div className="ai-mentor-panel-glass">
                                <div className="ai-header">
                                    <div className="ai-orb-glow">
                                        <Sparkles size={24} />
                                    </div>
                                    <div>
                                        <h3>AI Mentor</h3>
                                        <span>Always active</span>
                                    </div>
                                </div>
                                <p className="ai-prompt-box">"How do I apply Calculus to modern engineering?"</p>
                                <button className="btn-ai-glow">
                                    <MessageSquare size={18} />
                                    <span>Ask AI Mentor</span>
                                </button>
                            </div>

                            <div className="insights-panel-glass">
                                <h3>Insights</h3>
                                <div className="insight-stat">
                                    <BarChart3 size={18} />
                                    <span>Top 10% of learners this week</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    );
};

export default SubjectDashboard;
