import React from 'react';
import './VideoBackground.css';

const VideoBackground = ({ src }) => {
    return (
        <div className="video-bg-container">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="video-bg-content"
            >
                <source src={src} type="video/mp4" />
            </video>
            <div className="video-bg-overlay"></div>
        </div>
    );
};

export default VideoBackground;
