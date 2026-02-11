import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { useContent } from '../context/ContentContext';
import {
    User, Mail, Wallet, BookOpen, Clock, TrendingUp,
    LogOut, X, ChevronRight, Award, Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const { balance } = useWallet();
    const { concepts } = useContent();
    const navigate = useNavigate();

    // Mock user stats
    const userStats = {
        conceptsCompleted: 12,
        learningHours: 24,
        creditsEarned: 450
    };

    const profileModules = [
        {
            id: 'wallet',
            icon: Wallet,
            label: 'Wallet',
            value: `₹${balance}`,
            color: '#10b981',
            onClick: () => navigate('/wallet')
        },
        {
            id: 'modules',
            icon: BookOpen,
            label: 'Modules Completed',
            value: userStats.conceptsCompleted,
            color: '#7b42f5',
            onClick: () => navigate('/my-learning')
        },
        {
            id: 'time',
            icon: Clock,
            label: 'Learning Time',
            value: `${userStats.learningHours}h`,
            color: '#3b82f6',
            onClick: () => { }
        },
        {
            id: 'credits',
            icon: Award,
            label: 'Credits Earned',
            value: userStats.creditsEarned,
            color: '#fbbf24',
            onClick: () => { }
        }
    ];

    const handleClose = () => {
        navigate('/');
    };

    const handleSignOut = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="profile-page-solid">
            <div className="profile-container">
                {/* Close Button */}
                <button className="profile-close-btn" onClick={handleClose}>
                    <X size={24} />
                </button>

                {/* Profile Header */}
                <div className="profile-header-solid">
                    <div className="profile-avatar-large">
                        <User size={48} />
                    </div>
                    <h2 className="profile-user-name">{user?.name || 'Unity Learner'}</h2>
                    <p className="profile-user-email">{user?.email || 'learner@unity.com'}</p>
                    <span className="profile-role-badge">{user?.role || 'Student'}</span>
                </div>

                {/* Profile Stats Grid */}
                <div className="profile-stats-grid">
                    {profileModules.map((module) => (
                        <div
                            key={module.id}
                            className="profile-module-card"
                            onClick={module.onClick}
                            style={{ '--module-color': module.color }}
                        >
                            <div className="module-icon">
                                <module.icon size={24} />
                            </div>
                            <div className="module-info">
                                <div className="module-value">{module.value}</div>
                                <div className="module-label">{module.label}</div>
                            </div>
                            <ChevronRight size={20} className="module-arrow" />
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="profile-actions">
                    <button className="profile-action-btn" onClick={() => navigate('/profile/settings')}>
                        <Settings size={20} />
                        <span>Account Settings</span>
                    </button>

                    <button className="profile-action-btn" onClick={() => navigate('/my-learning')}>
                        <BookOpen size={20} />
                        <span>My Learning</span>
                    </button>

                    <button className="profile-action-btn signout-btn" onClick={handleSignOut}>
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
