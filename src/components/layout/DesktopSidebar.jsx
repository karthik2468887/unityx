import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Home, BookOpen, Wallet, User, LogOut,
    Shield, Layout, ChevronRight, Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { motion } from 'framer-motion';
import './DesktopSidebar.css';

const DesktopSidebar = () => {
    const { user, logout, isAdmin } = useAuth();
    const { balance } = useWallet();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="desktop-sidebar">
            <div className="sidebar-brand">
                <div className="logo-icon">
                    <Zap fill="currentColor" />
                </div>
                <span>Antigravity</span>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <Home size={20} />
                    <span>Home</span>
                    <div className="active-glow" />
                </NavLink>
                <NavLink to="/my-learning" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <BookOpen size={20} />
                    <span>My Learning</span>
                    <div className="active-glow" />
                </NavLink>
                <NavLink to="/wallet" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <Wallet size={20} />
                    <span>Wallet</span>
                    <div className="active-glow" />
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <User size={20} />
                    <span>Profile</span>
                    <div className="active-glow" />
                </NavLink>

                {isAdmin && (
                    <div className="admin-section">
                        <div className="section-label">Management</div>
                        <NavLink to="/admin" className={({ isActive }) => `nav-link admin ${isActive ? 'active' : ''}`}>
                            <Shield size={20} />
                            <span>Admin Desk</span>
                            <div className="active-glow" />
                        </NavLink>
                    </div>
                )}
            </nav>

            <div className="sidebar-footer">
                <div className="footer-wallet" onClick={() => navigate('/wallet')}>
                    <div className="wallet-info">
                        <span className="label">Balance</span>
                        <span className="value">₹{balance}</span>
                    </div>
                    <ChevronRight size={16} />
                </div>

                <div className="user-pill">
                    <div className="user-info-mini">
                        <div className="avatar-mini">{user?.name?.[0]}</div>
                        <div className="user-meta">
                            <span className="name">{user?.name}</span>
                            <span className="role">{user?.role}</span>
                        </div>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="logout-icon-btn"
                        onClick={handleLogout}
                    >
                        <LogOut size={18} />
                    </motion.button>
                </div>
            </div>
        </aside>
    );
};

export default DesktopSidebar;
