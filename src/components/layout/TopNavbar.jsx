import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Search, Menu, User, Wallet, Bell,
    Globe, ChevronDown, Zap, BookOpen, Clock, Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';
import './TopNavbar.css';

const TopNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [globalSearch, setGlobalSearch] = useState('');

    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="top-navbar-ethereal">
            <div className="nav-container-ethereal content-max-width">
                {/* Left: Brand */}
                <div className="nav-section-left">
                    <NavLink to="/" className="nav-logo-ethereal">
                        <span className="logo-text-main">Unity</span>
                    </NavLink>
                </div>

                {/* Center: Main Links */}
                <div className="nav-section-center desktop-only">
                    <div className="nav-menu-stack">
                        <NavLink to="/" className="nav-menu-item">Home</NavLink>
                        <NavLink to="/contact" className="nav-menu-item">Contact</NavLink>
                        <NavLink to="/wallet" className="nav-menu-item">Wallet</NavLink>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="nav-section-right">
                    <div className="nav-links-right">
                        {user ? (
                            <div className="user-profile-trigger" onClick={toggleProfile}>
                                <div className="avatar-chip">
                                    <User size={16} />
                                </div>
                                <span className="profile-name">{user.displayName || 'Learner'}</span>
                            </div>
                        ) : (
                            <NavLink to="/login" className="nav-link-cta">Login</NavLink>
                        )}
                    </div>

                    <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Profile Drawer */}
            <AnimatePresence>
                {isProfileOpen && (
                    <>
                        <motion.div
                            className="profile-sidebar-drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <div className="drawer-header">
                                <h3 className="drawer-title">Profile Settings</h3>
                                <button className="close-drawer" onClick={toggleProfile}>×</button>
                            </div>
                            <div className="drawer-content">
                                <div className="user-hero-mini">
                                    <div className="large-avatar"><User size={40} /></div>
                                    <div className="user-details">
                                        <h4>{user?.displayName || 'Unity Learner'}</h4>
                                        <p>{user?.email}</p>
                                    </div>
                                </div>

                                <div className="stats-mini-grid">
                                    <div className="stat-box">
                                        <span className="stat-num">12</span>
                                        <span className="stat-label">Modules</span>
                                    </div>
                                    <div className="stat-box">
                                        <span className="stat-num">4h</span>
                                        <span className="stat-label">Learning</span>
                                    </div>
                                </div>

                                <div className="drawer-actions">
                                    <button className="drawer-nav-item" onClick={() => { navigate('/profile'); toggleProfile(); }}>My Profile</button>
                                    <button className="drawer-nav-item" onClick={() => { navigate('/wallet'); toggleProfile(); }}>Wallet</button>
                                    <button className="drawer-logout" onClick={() => { logout(); toggleProfile(); }}>Sign Out</button>
                                </div>
                            </div>
                        </motion.div>
                        <div className="drawer-backdrop" onClick={toggleProfile} />
                    </>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-nav-overlay"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="mobile-menu-links">
                            <NavLink to="/" onClick={toggleMobileMenu}>Home</NavLink>
                            <NavLink to="/contact" onClick={toggleMobileMenu}>Contact</NavLink>
                            <NavLink to="/wallet" onClick={toggleMobileMenu}>Wallet</NavLink>
                            {user ? (
                                <NavLink to="/profile" onClick={toggleMobileMenu}>Profile ({user.displayName || 'Learner'})</NavLink>
                            ) : (
                                <NavLink to="/login" onClick={toggleMobileMenu}>Login</NavLink>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        className="search-overlay-saas"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="search-container-saas"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                        >
                            <div className="search-input-wrapper">
                                <Search size={24} className="search-icon-large" />
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Search concepts, mentors, or skills..."
                                    value={globalSearch}
                                    onChange={(e) => setGlobalSearch(e.target.value)}
                                />
                                <button className="close-search" onClick={() => setIsSearchOpen(false)}>
                                    Esc
                                </button>
                            </div>
                        </motion.div>
                        <div className="search-backdrop" onClick={() => setIsSearchOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default TopNavbar;
