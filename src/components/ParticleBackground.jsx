import React, { useMemo } from 'react';
import '../styles/ParticleBackground.css';

const ParticleBackground = ({ count = 30 }) => {
    const particles = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            size: Math.random() * 4 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.5 + 0.1,
        }));
    }, [count]);

    return (
        <div className="particle-container">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        top: p.top,
                        left: p.left,
                        opacity: p.opacity,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `-${p.delay}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleBackground;
