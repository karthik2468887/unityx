import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="professional-footer">
            <div className="content-max-width footer-grid">
                <div className="footer-bio">
                    <h3>Unity Platform</h3>
                    <p>A precision-driven micro-learning ecosystem designed to empower students with verified theoretical insight and mental models. Built for the future of digital education.</p>
                </div>
                <div className="footer-contact">
                    <h3>Contact Developer</h3>
                    <p className="contact-item"><strong>Name:</strong> Karthik Kumar</p>
                    <p className="contact-item"><strong>Email:</strong> <a href="mailto:karthikkumarkadavala4@gmail.com">karthikkumarkadavala4@gmail.com</a></p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2026 Unity. Crafted for precision and clarity.</p>
            </div>
        </footer>
    );
};

export default Footer;
