import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import ConceptCard from '../components/ConceptCard';
import WhatsAppButton from '../components/WhatsAppButton';
import {
    ChevronRight, Zap, Star, BarChart3, Users,
    PlayCircle, Award, BookOpen, Globe, Search, User, Menu, X
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MODULES } from '../data/mockData';
import vortexImg from '../assets/vortex_hero_final.png';
import heroSticker from '../assets/hero_sticker.png';
import '../styles/Home.css';
import '../styles/CompactModules.css';
import '../styles/CompactConceptCards.css';

const Home = () => {
    const { subjects, concepts, modules } = useContent();
    const { isMentor, isAdmin } = useAuth();
    const navigate = useNavigate();

    // Mobile menu state
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Scroll parallax setup
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax transforms for depth
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const [selectedSubject, setSelectedSubject] = useState(null);
    const activeSubject = selectedSubject || (subjects.length > 0 ? subjects[0] : null);

    // Derived data for sections
    const recommended = concepts.slice(0, 5);
    const trending = concepts.slice(5, 10);
    const subjectConcepts = concepts.filter(c => c.subjectId === activeSubject?.id).slice(0, 5);

    const handleStartTeaching = () => {
        navigate('/mentor/upload');
    };

    const handleGetStarted = () => {
        navigate('/modules');
    };

    return (
        <div className="home-unity" ref={containerRef}>
            {/* Nav Header */}
            <header className="nav-header-vortex">
                <div className="logo-vortex" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    U<span>nity</span>
                </div>
                <nav className="nav-links-vortex desktop-nav">
                    <a href="/" className="active">Home</a>
                    <a href="/credits" onClick={(e) => { e.preventDefault(); navigate('/credits'); }}>Credits</a>
                    <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact</a>
                    <a href="/profile" onClick={(e) => { e.preventDefault(); navigate('/profile'); }} className="profile-link">
                        <User size={18} style={{ marginRight: '6px' }} />
                        Profile
                    </a>
                </nav>

                {/* Mobile hamburger */}
                <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <button className="btn-signup-vortex desktop-only">
                    Sign up<span>&rarr;</span>
                </button>
            </header>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu-overlay">
                    <nav className="mobile-nav-links">
                        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); setMobileMenuOpen(false); }}>Home</a>
                        <a href="/credits" onClick={(e) => { e.preventDefault(); navigate('/credits'); setMobileMenuOpen(false); }}>Credits</a>
                        <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); setMobileMenuOpen(false); }}>Contact</a>
                        <a href="/profile" onClick={(e) => { e.preventDefault(); navigate('/profile'); setMobileMenuOpen(false); }}>
                            <User size={18} /> Profile
                        </a>
                    </nav>
                </div>
            )}

            {/* Vortex Hero Section with Parallax */}
            <motion.section
                className="hero-unity"
                style={{
                    y: heroY,
                    opacity: heroOpacity
                }}
            >
                <div className="hero-content-container">
                    {/* Left: Text Content */}
                    <div className="hero-text-block">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{
                                opacity: 1,
                                y: [0, -10, 0]
                            }}
                            transition={{
                                opacity: { duration: 1.2 },
                                y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                            }}
                        >
                            The more you <span className="text-learn">learn</span>, the <br />
                            more you <span className="text-earn">earn</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: 1,
                                y: [0, -6, 0]
                            }}
                            transition={{
                                opacity: { duration: 1.2, delay: 0.3 },
                                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                            }}
                        >
                            Unity is the best platform for <br />
                            learning and mastering your skills.
                        </motion.p>

                        <motion.div
                            className="hero-actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                        >
                            <button className="btn-get-started" onClick={handleGetStarted}>
                                Get Started <span>&rarr;</span>
                            </button>
                            <button className="btn-start-teach" onClick={handleStartTeaching}>
                                Start Teaching
                            </button>
                        </motion.div>
                    </div>

                    {/* Right: Vortex Visual */}
                    <motion.div
                        className="hero-visual-side"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="vortex-container">
                            <img
                                src={vortexImg}
                                alt="Unity Vortex"
                                className="vortex-image"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Horizontal Module Carousel - Compact Cards */}
            <motion.section
                className="module-carousel-section"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="content-max-width">
                    <h2 className="carousel-title">Featured Learning Modules</h2>
                    <p className="carousel-subtitle">Start your journey with our curated Python courses</p>

                    <div className="module-carousel-container">
                        <div className="module-carousel-track">
                            {MODULES.map((module, index) => (
                                <motion.div
                                    key={module.id}
                                    className="module-card-compact"
                                    onClick={() => navigate(`/module/${module.id}`)}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <div className="module-card-header">
                                        <span className="module-category-badge">{module.category}</span>
                                        <div className="module-rating-small">
                                            <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                            <span>{module.teacherRating}</span>
                                        </div>
                                    </div>

                                    <h3 className="module-card-title">{module.title}</h3>
                                    <p className="module-card-subtitle">{module.description}</p>

                                    <div className="module-card-footer">
                                        <span className="module-teacher-name">{module.teacherName}</span>
                                        <ChevronRight size={18} className="module-arrow" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            <div className="content-max-width main-sections">
                {/* Categories Grid - Colorful Squares */}
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                >
                    Browse Top Essential <br /> Career Courses
                </motion.h2>
                <div className="categories-grid-unity">
                    {subjects.slice(0, 4).map((sub, index) => {
                        return (
                            <motion.div
                                key={sub.id}
                                className="category-item-unity"
                                onClick={() => setSelectedSubject(sub)}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                            >
                                <div className="category-icon-box">
                                    <BookOpen size={24} color="#b1a0e8" />
                                </div>
                                <span>{sub.name}</span>
                                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>
                                    View Content &rarr;
                                </div>
                            </motion.div>
                        );
                    })}
                </div>



                {/* Recommended Section */}
                <section className="section-row">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, x: -40, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                    >
                        Recommended for you
                    </motion.h2>
                    <div className="concept-row-grid">
                        {recommended.map((concept, index) => (
                            <motion.div
                                key={concept.id}
                                initial={{ opacity: 0, y: 30, scale: 0.92 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.08,
                                    ease: "easeOut"
                                }}
                            >
                                <ConceptCard
                                    concept={concept}
                                    onClick={() => navigate(`/learn-module/${concept.id}`)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>



                {/* Categories Grid */}
                <section className="categories-showcase">
                    <h2 className="section-title">Top Categories</h2>
                    <div className="categories-grid-unity">
                        {subjects.map(sub => (
                            <div
                                key={sub.id}
                                className="category-item-unity"
                                onClick={() => navigate(`/category/${sub.id}`)}
                            >
                                <div className="category-icon-box">
                                    <BookOpen size={32} />
                                </div>
                                <span>{sub.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mentor CTA */}
                <motion.section
                    className="mentor-cta-banner card"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <div className="cta-content">
                        <motion.h2
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            Become a mentor
                        </motion.h2>
                        <p>Join thousands of experts and share your knowledge through micro-learning. Earn for every view.</p>
                        <button className="btn-primary" onClick={handleStartTeaching} style={{ position: 'relative', zIndex: 10 }}>Start Teaching</button>
                    </div>
                    <div className="cta-image">
                        <Users size={120} color="#f7f9fa" />
                    </div>
                </motion.section>
            </div>

            {/* Footer Mock */}
            <footer className="footer-unity">
                <div className="content-max-width footer-top">
                    {/* ... (existing footer content) ... */}
                    <div className="footer-links">
                        <div className="link-group">
                            <span>Unity for Business</span>
                            <span>Teach on Unity</span>
                            <span>Get the app</span>
                        </div>
                        <div className="link-group">
                            <span>About us</span>
                            <span>Contact us</span>
                            <span>Careers</span>
                        </div>
                        <div className="link-group">
                            <span>Terms</span>
                            <span>Privacy policy</span>
                            <span>Cookie settings</span>
                        </div>
                    </div>
                    <div className="footer-lang">
                        <button className="btn-outline lang-btn">
                            <Globe size={16} /> <span>English</span>
                        </button>
                    </div>
                </div>
                <div className="content-max-width footer-bottom">
                    <div className="footer-logo">
                        <Zap fill="white" color="white" size={24} />
                        <span className="logo-text">Unity</span>
                    </div>
                    <span className="copyright">© 2026 Unity, Inc.</span>
                </div>
            </footer>

            {/* Floating WhatsApp Button */}
            <WhatsAppButton />
        </div>
    );
};

export default Home;
