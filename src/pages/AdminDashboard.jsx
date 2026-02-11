import React from 'react';
import { useContent } from '../context/ContentContext';
import {
    CheckCircle,
    XCircle,
    Play,
    BarChart3,
    Users,
    Shield,
    UserCog,
    Activity,
    Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
    const { pendingUploads, approveUpload, rejectUpload } = useContent();
    const { allUsers, updateRole } = useAuth();
    const [activeTab, setActiveTab] = React.useState('reviews');

    const handleRoleToggle = (userId, currentRole) => {
        const newRole = currentRole === 'student' ? 'mentor' : 'student';
        if (currentRole === 'admin') return;
        updateRole(userId, newRole);
    };

    const handleAction = (id, approved) => {
        if (approved) {
            approveUpload(id);
        } else {
            rejectUpload(id);
        }
    };

    return (
        <div className="admin-unity">
            <div className="admin-header-premium">
                <div className="content-max-width">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Administrator Desk
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Unified control panel for content moderation and user governance.
                    </motion.p>
                </div>
            </div>

            <div className="content-max-width admin-body-unity">
                {/* Admin Tabs */}
                <div className="admin-tabs">
                    <button
                        className={`admin-tab ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        <Shield size={18} />
                        <span>Content Reviews</span>
                    </button>
                    <button
                        className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <Users size={18} />
                        <span>User Management</span>
                    </button>
                </div>

                {activeTab === 'reviews' ? (
                    <div className="review-section">
                        <div className="admin-stats-row">
                            <motion.div
                                className="admin-stat-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '16px',
                                    background: 'rgba(79, 70, 229, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#4f46e5'
                                }}>
                                    <Clock size={28} />
                                </div>
                                <div className="stat-info">
                                    <span className="val">{pendingUploads.length}</span>
                                    <span className="lbl">Awaiting Review</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="admin-stat-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '16px',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#10b981'
                                }}>
                                    <Activity size={28} />
                                </div>
                                <div className="stat-info">
                                    <span className="val">24h</span>
                                    <span className="lbl">Avg. Response Time</span>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="review-table-unity"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="table-header-unity">
                                <span>Concept Details</span>
                                <span>Mentor</span>
                                <span>Subject</span>
                                <span>Status</span>
                                <span style={{ textAlign: 'right' }}>Actions</span>
                            </div>

                            <div className="table-body">
                                {pendingUploads.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        className="table-row"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <div className="col-concept">
                                            <Play size={16} className="play-icon-muted" />
                                            <span>{item.concept}</span>
                                        </div>
                                        <span>{item.mentorName || 'Guest Mentor'}</span>
                                        <span>{item.subjectName || 'General'}</span>
                                        <div>
                                            <span className="status-pill">Pending</span>
                                        </div>
                                        <div className="col-actions">
                                            <button className="btn-approve" onClick={() => handleAction(item.id, true)} title="Approve Content">
                                                <CheckCircle size={22} />
                                            </button>
                                            <button className="btn-reject" onClick={() => handleAction(item.id, false)} title="Reject Content">
                                                <XCircle size={22} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}

                                {pendingUploads.length === 0 && (
                                    <div className="table-empty">
                                        <CheckCircle size={64} color="#10b981" style={{ marginBottom: '24px', opacity: 0.5 }} />
                                        <h3>Platform Queue Clear</h3>
                                        <p>No new submissions require review at this time.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div >
                ) : (
                    <motion.div
                        className="user-management-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="table-header-unity">
                            <span>User</span>
                            <span>Email Identity</span>
                            <span>Level</span>
                            <span style={{ textAlign: 'right' }}>Governance</span>
                        </div>
                        <div className="table-body">
                            {allUsers.map((user, idx) => (
                                <motion.div
                                    key={user.id}
                                    className="table-row"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <div className="col-user">
                                        <div className="user-avatar-small">{user.name[0]}</div>
                                        <span className="user-name" style={{ fontWeight: 700 }}>{user.name}</span>
                                    </div>
                                    <span className="user-email" style={{ color: '#64748b' }}>{user.email}</span>
                                    <div>
                                        <span className={`role-badge ${user.role}`}>{user.role}</span>
                                    </div>
                                    <div className="col-actions">
                                        {user.role !== 'admin' && (
                                            <button
                                                className="btn-outline-sm"
                                                onClick={() => handleRoleToggle(user.id, user.role)}
                                            >
                                                <UserCog size={16} />
                                                <span>{user.role === 'student' ? 'Promote to Mentor' : 'Revert to Student'}</span>
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div >
        </div >
    );
};

export default AdminDashboard;
