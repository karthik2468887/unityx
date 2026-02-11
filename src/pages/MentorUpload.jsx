import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "../context/ContentContext";
import { useAuth } from "../context/AuthContext";
import FirebaseService from "../services/FirebaseService";
import {
    Upload,
    ChevronLeft,
    CheckCircle2,
    IndianRupee,
} from "lucide-react";
import { motion } from "framer-motion";
import "../styles/MentorUpload.css";

const MentorUpload = () => {
    const navigate = useNavigate();
    const { publishDirectly, subjects, concepts } = useContent();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        subject: "",
        concept: "",
        price: "5",
        fullVideo: null,
    });

    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [uploadedRecord, setUploadedRecord] = useState(null);

    const fullInputRef = useRef(null);

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);

    const handleWebFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, fullVideo: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.subject || !formData.concept || !formData.fullVideo) {
            alert("Please fill all fields and upload video.");
            return;
        }

        await handleUpload();
    };

    const handleUpload = async () => {
        setIsUploading(true);
        setUploadProgress(0);

        try {
            // 🔥 REAL FIREBASE UPLOAD
            const videoUrl = await FirebaseService.uploadVideo(
                formData.fullVideo,
                "videos",
                (progress) => setUploadProgress(progress)
            );

            const uploadData = {
                subject: formData.subject,
                concept: formData.concept,
                price: formData.price,
                videoUrl,
                mentorId: user?.uid || "demo",
                mentorName: user?.name || "Unity Mentor",
                timestamp: Date.now(),
                uploadId: `UP-${Math.floor(Math.random() * 10000)
                    .toString()
                    .padStart(4, "0")}`,
            };

            publishDirectly(uploadData);

            setUploadedRecord(uploadData);
            setSubmitted(true);
            setIsUploading(false);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Please check Firebase rules.");
            setIsUploading(false);
        }
    };

    if (submitted && uploadedRecord) {
        return (
            <div className="upload-success">
                <motion.div
                    className="success-card"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <CheckCircle2 size={40} color="#10b981" />
                    <h3>Upload Successful</h3>
                    <p>{uploadedRecord.concept}</p>
                    <p>₹{uploadedRecord.price}</p>
                    <button onClick={() => navigate("/")}>Go Home</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="mentor-container">
            <header className="mentor-header">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <ChevronLeft size={20} /> Back
                </button>
                <h2>Upload Teaching Content</h2>
            </header>

            <form onSubmit={handleSubmit} className="upload-form">
                {/* Subject */}
                <div className="input-group">
                    <label>Subject</label>
                    <input
                        type="text"
                        placeholder="Enter subject"
                        value={formData.subject}
                        onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                        }
                        required
                    />
                </div>

                {/* Concept */}
                <div className="input-group">
                    <label>Concept</label>
                    <input
                        type="text"
                        placeholder="Enter concept"
                        value={formData.concept}
                        onChange={(e) =>
                            setFormData({ ...formData, concept: e.target.value })
                        }
                        required
                    />
                </div>

                {/* Price */}
                <div className="input-group">
                    <label>Price (₹)</label>
                    <div style={{ position: "relative" }}>
                        <IndianRupee
                            size={18}
                            style={{
                                position: "absolute",
                                left: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                            }}
                        />
                        <input
                            type="number"
                            min="0"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({ ...formData, price: e.target.value })
                            }
                            style={{ paddingLeft: "30px" }}
                            required
                        />
                    </div>
                </div>

                {/* Video Upload */}
                <div
                    className="upload-box"
                    onClick={() => fullInputRef.current.click()}
                >
                    <input
                        type="file"
                        ref={fullInputRef}
                        style={{ display: "none" }}
                        accept="video/*"
                        onChange={handleWebFileChange}
                    />
                    <Upload size={28} />
                    <p>
                        {formData.fullVideo
                            ? formData.fullVideo.name
                            : "Click to select video"}
                    </p>
                </div>

                {/* Progress */}
                {isUploading && (
                    <div className="progress-container">
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <span>{uploadProgress}%</span>
                    </div>
                )}

                <button
                    type="submit"
                    className="submit-upload-btn"
                    disabled={isUploading}
                >
                    {isUploading ? "Uploading..." : "Upload Video"}
                </button>
            </form>
        </div>
    );
};

export default MentorUpload;
