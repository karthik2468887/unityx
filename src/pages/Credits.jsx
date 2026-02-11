import React from 'react';
import Footer from '../components/layout/Footer';

import '../styles/Credits.css';

const Credits = () => {
    return (
        <div className="credits-unity">
            <div className="content-max-width credits-content">
                <h1 className="credits-title">Platform Credits</h1>
                <p className="credits-description">
                    Unity Platform is dedicated to providing precision-driven micro-learning experiences. Special thanks to all the mentors, developers, and students who contribute to this ecosystem.
                </p>

                <div className="credits-grid">
                    <div className="credit-item">
                        <h3>Development</h3>
                        <p>Karthik Kumar</p>
                    </div>
                    <div className="credit-item">
                        <h3>Content Strategy</h3>
                        <p>Unity Educational Board</p>
                    </div>
                    <div className="credit-item">
                        <h3>Visual Design</h3>
                        <p>Ethereal Labs</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Credits;
