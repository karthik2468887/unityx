import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import NativeService from '../services/NativeService';
import FirebaseService from '../services/FirebaseService';
import {
    Upload,
    ChevronLeft,
    Video,
    CheckCircle2,
    Info,
    IndianRupee,
    Shield,
    Rocket,
    Check,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import '../styles/MentorUpload.css';

const MentorUpload = () => {
    const navigate = useNavigate();
    const { publishDirectly, subjects, concepts } = useContent();
    const { isAdmin, isMentor, user } = useAuth();
    const [step, setStep] = useState(1);

    // Strict Access Control - RELAXED for "Start Teaching" Flow
    // We want Students to see this page so they can BECOME mentors
    useEffect(() => {
        if (!user) {
            // Only redirect if NOT logged in
            navigate('/login');
        }
    }, [user, navigate]);

    // FAIL-SAFE DATA (Hardcoded Fallbacks if Context Fails)
    const safeSubjects = subjects && subjects.length > 0 ? subjects : [
        { id: 'math', name: 'Mathematics' },
        { id: 'physics', name: 'Physics' },
        { id: 'cs', name: 'Computer Science' },
        { id: 'bio', name: 'Biology' }
    ];

    const safeConcepts = concepts && concepts.length > 0 ? concepts : [
        { id: 'alg', subjectId: 'math', title: 'Algebra' },
        { id: 'calc', subjectId: 'math', title: 'Calculus' },
        { id: 'trig', subjectId: 'math', title: 'Trigonometry' },
        { id: 'mech', subjectId: 'physics', title: 'Mechanics' },
        { id: 'react', subjectId: 'cs', title: 'React JS' }
    ];

    const [formData, setFormData] = useState({
        subject: '',
        concept: '',
        price: '5',
        previewVideo: null,
        fullVideo: null,
        customSubject: '',
        customIcon: 'Book'
    });

    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [uploadedRecord, setUploadedRecord] = useState(null);

    const previewInputRef = useRef(null);
    const fullInputRef = useRef(null);

    // Filter concepts based on selected subject (Using FAIL-SAFE data)
    const availableConcepts = formData.subject
        ? safeConcepts.filter(c => c.subjectId === formData.subject)
        : [];



    // State to track if we are in "Create New Subject" mode
    const [isCustomSubject, setIsCustomSubject] = useState(false);

    const handleSubjectChange = (e) => {
        const val = e.target.value;
        if (val === 'new_custom_subject') {
            setIsCustomSubject(true);
            setFormData({ ...formData, subject: '', concept: '' }); // Clear ID, wait for custom text
        } else {
            setIsCustomSubject(false);
            setFormData({ ...formData, subject: val, concept: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation
        if (!formData.subject || (!formData.concept && formData.subject !== 'custom') || !formData.fullVideo) {
            alert('Please fill all required fields and upload a video.');
            return;
        }
        await handleUpload();
    };

    const handleFilePick = async (type) => {
        const platform = Capacitor.getPlatform();
        if (platform === 'web') {
            if (type === 'previewVideo') previewInputRef.current.click();
            else fullInputRef.current.click();
            return;
        }
        // Native handling omitted for brevity, fallback to web
    };

    const handleWebFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [type]: file }));
        }
    };

    const handleUpload = async () => {
        setIsUploading(true);
        setUploadProgress(0);

        try {
            await FirebaseService.simulateUpload((p) => setUploadProgress(p));

            const finalSubjectName = formData.subject === 'custom' || formData.subject === 'new_custom_subject'
                ? formData.customSubject
                : safeSubjects.find(s => s.id === formData.subject)?.name || 'General';

            const uploadData = {
                ...formData,
                mentorId: user?.id || 'demo-mentor',
                mentorName: user?.name || 'Unity Mentor',
                timestamp: Date.now(),
                // Generate a faux Transaction ID for the "Record" look
                uploadId: `UP-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`
            };

            publishDirectly(uploadData);
            setUploadedRecord({ ...uploadData, subjectName: finalSubjectName });

            NativeService.triggerHaptic('heavy');
            setIsUploading(false);
            setSubmitted(true);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Please try again.");
            setIsUploading(false);
        }
    };

    if (submitted && uploadedRecord) {
        return (
            <div className="upload-success">
                <motion.div
                    className="success-content receipt-card"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                >
                    <div className="receipt-header">
                        <div className="success-icon-small">
                            <CheckCircle2 size={32} color="#10b981" />
                        </div>
                        <h3>Upload Successful</h3>
                        <span className="timestamp">{new Date(uploadedRecord.timestamp).toLocaleString()}</span>
                    </div>

                    <div className="receipt-body">
                        <div className="receipt-row">
                            <span className="label">Upload ID</span>
                            <span className="value mono">{uploadedRecord.uploadId}</span>
                        </div>
                        <div className="receipt-divider"></div>
                        <div className="receipt-row">
                            <span className="label">Subject</span>
                            <span className="value">{uploadedRecord.subjectName}</span>
                        </div>
                        <div className="receipt-row">
                            <span className="label">Concept</span>
                            <span className="value highlight">{uploadedRecord.concept}</span>
                        </div>
                        <div className="receipt-row">
                            <span className="label">Valuation</span>
                            <span className="value price">₹{uploadedRecord.price}</span>
                        </div>
                        <div className="receipt-row">
                            <span className="label">Mentor</span>
                            <span className="value">{uploadedRecord.mentorName}</span>
                        </div>
                    </div>

                    <div className="receipt-footer">
                        <div className="status-badge-row">
                            <span className="status-indicator"></span>
                            <span>Live on Platform</span>
                        </div>
                        <button className="next-btn" onClick={() => navigate('/')}>
                            Go to Dashboard
                        </button>
                    </div>
                </motion.div >
            </div >
        );
    }

    return (
        <div className="mentor-container">
            <header className="mentor-header">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <ChevronLeft size={24} />
                    <span>Back</span>
                </button>
                <h2>Upload Teaching Content</h2>
            </header>

            <div className="mentor-content">
                {/* 1. User Details Section (Read-Only) */}
                <section className="user-details-section">
                    <div className="user-info-card">
                        <div className="info-row">
                            <label>Instructor</label>
                            <span className="info-value">{user?.name || 'Guest Mentor'}</span>
                        </div>
                        <div className="info-row">
                            <label>Role</label>
                            <span className="info-value-badge">Mentor</span>
                        </div>
                        <div className="info-row">
                            <label>Email</label>
                            <span className="info-value email">{user?.email || 'mentor@unity.com'}</span>
                        </div>
                    </div>
                </section>

                <form onSubmit={handleSubmit} className="upload-form">

                    {/* 2. Subject Selection (With Create New option) */}
                    <div className="form-section">
                        <h3>Subject Selection</h3>
                        <div className="input-group">
                            <label>Choose Subject <span className="required">*</span></label>
                            {!isCustomSubject ? (
                                <select onChange={handleSubjectChange} required defaultValue="">
                                    <option value="" disabled>Select a Subject</option>
                                    {safeSubjects.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                    <option value="new_custom_subject" style={{ fontWeight: 'bold', color: '#a855f7' }}>
                                        + Add New Subject
                                    </option>
                                </select>
                            ) : (
                                <div className="custom-input-wrapper">
                                    <input
                                        type="text"
                                        placeholder="Enter New Subject Name..."
                                        value={formData.customSubject || ''}
                                        onChange={e => setFormData({ ...formData, subject: 'custom', customSubject: e.target.value })}
                                        autoFocus
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="cancel-custom-btn"
                                        onClick={() => { setIsCustomSubject(false); setFormData({ ...formData, subject: '' }); }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 3. Concept Selection (Type OR Select) */}
                    <div className="form-section">
                        <h3>Concept Selection</h3>
                        <div className="input-group">
                            <label>Concept Title <span className="required">*</span></label>
                            <div className="searchable-input">
                                <input
                                    list="concepts-list"
                                    type="text"
                                    placeholder="Type or Select Concept..."
                                    value={formData.concept}
                                    onChange={e => setFormData({ ...formData, concept: e.target.value })}
                                    required
                                    disabled={!formData.subject && !isCustomSubject}
                                />
                                <datalist id="concepts-list">
                                    {availableConcepts.map(c => (
                                        <option key={c.id} value={c.title} />
                                    ))}
                                </datalist>
                            </div>
                            <p className="helper-text">You can type a new concept name or pick from the list.</p>
                        </div>
                    </div>



                    {/* 3.5. Price Input */}
                    <div className="form-section">
                        <h3>Valuation</h3>
                        <div className="input-group">
                            <label>Content Price (₹) <span className="required">*</span></label>
                            <div className="price-input-wrapper" style={{ position: 'relative' }}>
                                <IndianRupee size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Enter Amount"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    style={{ paddingLeft: '36px' }}
                                    required
                                />
                            </div>
                            <p className="helper-text">Set the unlock price for this concept.</p>
                        </div>
                    </div>

                    {/* 4. Video File Upload */}
                    <div className="form-section">
                        <h3>Video Upload</h3>
                        <div className={`upload-box ${formData.fullVideo ? 'completed' : ''}`} onClick={() => handleFilePick('fullVideo')}>
                            <input
                                type="file"
                                ref={fullInputRef}
                                style={{ display: 'none' }}
                                accept="video/*"
                                onChange={(e) => handleWebFileChange(e, 'fullVideo')}
                            />
                            <div className="upload-icon-wrapper">
                                {formData.fullVideo ? <CheckCircle2 size={32} color="#10b981" /> : <Upload size={32} />}
                            </div>
                            <div className="upload-text">
                                <h4>{formData.fullVideo ? formData.fullVideo.name : "Select Video File"}</h4>
                                <span>{formData.fullVideo ? 'Ready to upload' : 'MP4, MOV supported'}</span>
                            </div>
                            <button type="button" className="browse-btn">{formData.fullVideo ? 'Change' : 'Browse'}</button>
                        </div>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                        <div className="upload-progress-container">
                            <div className="progress-labels">
                                <span>Uploading...</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <div className="progress-bar-track">
                                <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                        </div>
                    )}

                    {/* 3. Submit Action */}
                    <div className="form-actions">
                        <button
                            type="submit"
                            className="submit-upload-btn"
                            disabled={!formData.subject || !formData.concept || !formData.fullVideo || isUploading}
                        >
                            {isUploading ? 'Uploading...' : 'Upload Video'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default MentorUpload;
