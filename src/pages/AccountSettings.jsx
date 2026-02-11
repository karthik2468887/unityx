import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    ArrowLeft, User, Mail, Shield,
    Eye, EyeOff, Key, Fingerprint
} from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/AccountSettings.css';

const AccountSettings = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    if (!user) return null;

    return (
        <div className="account-settings-page">
            <div className="settings-container">
                {/* Header */}
                <header className="settings-header">
                    <button className="back-btn-pill" onClick={() => navigate('/profile')}>
                        <ArrowLeft size={18} />
                        <span>Back to Profile</span>
                    </button>
                    <h1>Account Settings</h1>
                    <p>Manage your account data and security credentials</p>
                </header>

                <main className="settings-grid">
                    {/* Personal Information */}
                    <motion.section
                        className="settings-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="card-header">
                            <User size={20} />
                            <h2>Personal Information</h2>
                        </div>
                        <div className="settings-list">
                            <div className="settings-item">
                                <div className="item-label">Full Name</div>
                                <div className="item-value">{user.name}</div>
                            </div>
                            <div className="settings-item">
                                <div className="item-label">Email Address</div>
                                <div className="item-value">{user.email}</div>
                            </div>
                            <div className="settings-item">
                                <div className="item-label">Account Role</div>
                                <div className="item-value role-badge">{user.role}</div>
                            </div>
                            <div className="settings-item">
                                <div className="item-label">User Identifier</div>
                                <div className="item-value mono-text">
                                    <Fingerprint size={14} style={{ marginRight: '6px' }} />
                                    {user.id}
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Security credentials */}
                    <motion.section
                        className="settings-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="card-header">
                            <Shield size={20} />
                            <h2>Security Credentials</h2>
                        </div>
                        <div className="settings-list">
                            <div className="settings-item">
                                <div className="item-info">
                                    <div className="item-label">Stored Password</div>
                                    <div className="password-display">
                                        <Key size={14} style={{ marginRight: '8px', opacity: 0.5 }} />
                                        <span>{showPassword ? user.password : '••••••••••••'}</span>
                                    </div>
                                </div>
                                <button
                                    className="toggle-visibility-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="security-note">
                                <p>This password is used for your local session and mock authentication during the development phase.</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Preferences / Placeholder */}
                    <motion.section
                        className="settings-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="card-header">
                            <SettingsIcon size={20} />
                            <h2>System Preferences</h2>
                        </div>
                        <div className="settings-list">
                            <div className="settings-item disabled">
                                <div className="item-label">Push Notifications</div>
                                <div className="item-status">Coming Soon</div>
                            </div>
                            <div className="settings-item disabled">
                                <div className="item-label">Dark Mode</div>
                                <div className="item-status">Always On</div>
                            </div>
                        </div>
                    </motion.section>
                </main>

                <footer className="settings-footer">
                    <p>© 2026 Unity Precision Learning • Secure Session</p>
                </footer>
            </div>
        </div>
    );
};

const SettingsIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

export default AccountSettings;
