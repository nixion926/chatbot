import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageSquare, Shield, Zap } from 'lucide-react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <video autoPlay loop muted playsInline className="background-video">
                <source src="/animation.mp4" type="video/mp4" />
            </video>
            <div className="content-overlay">
                <nav className="navbar">
                    <div className="logo">
                        <Sparkles size={24} className="logo-icon" />
                        <span>AI Assistant</span>
                    </div>
                    <div className="nav-links">
                        <Link to="/login" className="nav-btn login-btn">Log in</Link>
                        <Link to="/signup" className="nav-btn signup-btn">Sign up</Link>
                    </div>
                </nav>

                <main className="hero-section">
                    <div className="hero-content">
                        <h1>Next Generation <br /> <span className="gradient-text">AI Conversation</span></h1>
                        <p>Experience the future of communication with our advanced AI assistant. Smart, fast, and always ready to help.</p>
                        <div className="cta-buttons">
                            <Link to="/signup" className="cta-btn primary">Get Started</Link>
                            <Link to="/login" className="cta-btn secondary">Log In</Link>
                        </div>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <MessageSquare className="feature-icon" />
                            <h3>Natural Chat</h3>
                            <p>Engage in human-like conversations with context awareness.</p>
                        </div>
                        <div className="feature-card">
                            <Zap className="feature-icon" />
                            <h3>Instant Answers</h3>
                            <p>Get real-time responses to your questions and tasks.</p>
                        </div>
                        <div className="feature-card">
                            <Shield className="feature-icon" />
                            <h3>Secure & Private</h3>
                            <p>Your conversations are private and secure.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;
