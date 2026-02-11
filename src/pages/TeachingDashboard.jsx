import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MODULES } from '../data/mockData';
import { ArrowLeft, Upload, CheckCircle, AlertCircle, Play } from 'lucide-react';
import '../styles/TeachingDashboard.css';

const TeachingDashboard = () => {
    const navigate = useNavigate();
    const [uploadingModules, setUploadingModules] = useState({});
    const [uploadedModules, setUploadedModules] = useState({});

    const handleFileSelect = (moduleId) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                simulateUpload(moduleId, file);
            }
        };

        input.click();
    };

    const simulateUpload = (moduleId, file) => {
        // Start upload
        setUploadingModules(prev => ({
            ...prev,
            [moduleId]: { progress: 0, fileName: file.name }
        }));

        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;

            if (progress >= 100) {
                clearInterval(interval);
                setUploadingModules(prev => {
                    const updated = { ...prev };
                    delete updated[moduleId];
                    return updated;
                });
                setUploadedModules(prev => ({
                    ...prev,
                    [moduleId]: { fileName: file.name, uploadedAt: new Date() }
                }));
            } else {
                setUploadingModules(prev => ({
                    ...prev,
                    [moduleId]: { ...prev[moduleId], progress: Math.min(progress, 100) }
                }));
            }
        }, 300);
    };

    return (
        <div className="teaching-dashboard">
            {/* Header with Back Arrow */}
            <header className="dashboard-header">
                <button className="back-arrow-btn-dash" onClick={() => navigate('/')}>
                    <ArrowLeft size={24} />
                    <span>Back to Home</span>
                </button>
                <h1 className="dashboard-title">Teaching Dashboard</h1>
                <p className="dashboard-subtitle">Upload your teaching videos for each module</p>
            </header>

            {/* Module List */}
            <div className="modules-list-container">
                {MODULES.map((module) => {
                    const isUploading = uploadingModules[module.id];
                    const isUploaded = uploadedModules[module.id];

                    return (
                        <div key={module.id} className="teaching-module-card">
                            <div className="module-info-section">
                                <div className="module-icon-wrapper">
                                    <Play size={28} />
                                </div>

                                <div className="module-details">
                                    <h3 className="module-name">{module.title}</h3>
                                    <p className="module-category-text">{module.category}</p>
                                    <p className="module-desc-text">{module.description}</p>
                                </div>
                            </div>

                            <div className="module-action-section">
                                {isUploaded ? (
                                    <div className="upload-success">
                                        <CheckCircle size={20} className="success-icon" />
                                        <div className="success-text">
                                            <span className="success-label">Uploaded</span>
                                            <span className="success-filename">{isUploaded.fileName}</span>
                                        </div>
                                    </div>
                                ) : isUploading ? (
                                    <div className="upload-progress-section">
                                        <div className="progress-info">
                                            <span className="uploading-label">Uploading...</span>
                                            <span className="progress-percentage">{Math.round(isUploading.progress)}%</span>
                                        </div>
                                        <div className="progress-bar-container">
                                            <div
                                                className="progress-bar-fill"
                                                style={{ width: `${isUploading.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="uploading-filename">{isUploading.fileName}</span>
                                    </div>
                                ) : (
                                    <button
                                        className="upload-btn"
                                        onClick={() => handleFileSelect(module.id)}
                                    >
                                        <Upload size={18} />
                                        Upload Video
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Info Panel */}
            <div className="info-panel">
                <AlertCircle size={20} />
                <p>Videos will be reviewed before being published to students. Ensure your content is clear and follows teaching guidelines.</p>
            </div>
        </div>
    );
};

export default TeachingDashboard;
