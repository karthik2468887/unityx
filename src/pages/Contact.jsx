import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState({
        sending: false,
        success: false,
        error: false,
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({
                sending: false,
                success: false,
                error: true,
                message: 'Please fill in all fields.'
            });
            return;
        }

        setStatus({ sending: true, success: false, error: false, message: 'Sending...' });

        try {
            // Using Web3Forms API for REAL email sending (FREE)
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: 'acb96136-b2f8-4676-b22a-2d2bfa257cc7',
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    to_email: 'karthikkumarkadavala4@gmail.com',
                    subject: `New Contact from ${formData.name} - Unity Learning`
                })
            });

            const result = await response.json();

            if (result.success) {
                setStatus({
                    sending: false,
                    success: true,
                    error: false,
                    message: `✓ Message sent successfully to karthikkumarkadavala4@gmail.com! We'll respond soon.`
                });
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus({ sending: false, success: false, error: false, message: '' }), 8000);
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus({
                sending: false,
                success: false,
                error: true,
                message: 'Email service not configured. Please email directly: karthikkumarkadavala4@gmail.com'
            });
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0d 0%, #1a1a1f 100%)',
            padding: '120px 5% 60px'
        }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>
                        Get in Touch
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                        Have questions? Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{
                    background: '#1a1a1f',
                    border: '2px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '20px',
                    padding: '40px'
                }}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', marginBottom: '10px', fontWeight: '600' }}>
                            <User size={18} style={{ color: '#7b42f5' }} />
                            Your Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your full name"
                            disabled={status.sending}
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                fontSize: '1rem',
                                background: '#f8f9fa',
                                color: '#000000',
                                border: '2px solid rgba(0, 0, 0, 0.1)',
                                borderRadius: '12px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', marginBottom: '10px', fontWeight: '600' }}>
                            <Mail size={18} style={{ color: '#7b42f5' }} />
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your.email@example.com"
                            disabled={status.sending}
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                fontSize: '1rem',
                                background: '#f8f9fa',
                                color: '#000000',
                                border: '2px solid rgba(0, 0, 0, 0.1)',
                                borderRadius: '12px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', marginBottom: '10px', fontWeight: '600' }}>
                            <MessageSquare size={18} style={{ color: '#7b42f5' }} />
                            Message
                        </label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Type your message here..."
                            rows="6"
                            disabled={status.sending}
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                fontSize: '1rem',
                                background: '#f8f9fa',
                                color: '#000000',
                                border: '2px solid rgba(0, 0, 0, 0.1)',
                                borderRadius: '12px',
                                resize: 'vertical',
                                fontFamily: 'inherit',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {status.message && (
                        <div style={{
                            padding: '14px 18px',
                            marginBottom: '20px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: status.success ? 'rgba(16, 185, 129, 0.15)' : status.error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                            border: `2px solid ${status.success ? 'rgba(16, 185, 129, 0.3)' : status.error ? 'rgba(239, 68, 68, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`,
                            color: status.success ? '#10b981' : status.error ? '#ef4444' : '#3b82f6'
                        }}>
                            {status.success && <CheckCircle size={20} />}
                            {status.error && <AlertCircle size={20} />}
                            {status.message}
                        </div>
                    )}

                    <button type="submit" disabled={status.sending} style={{
                        width: '100%',
                        padding: '16px 24px',
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: '#fff',
                        background: 'linear-gradient(135deg, #7b42f5 0%, #9d5cff 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: status.sending ? 'not-allowed' : 'pointer',
                        opacity: status.sending ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                    }}>
                        {status.sending ? 'Sending...' : <><Send size={20} /> Send Message</>}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '30px', padding: '20px' }}>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        Or email us directly at: <strong style={{ color: '#7b42f5' }}>karthikkumarkadavala4@gmail.com</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
