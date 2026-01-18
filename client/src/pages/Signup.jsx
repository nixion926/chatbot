import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import axios from 'axios';
import './Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate('/chat');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="auth-container">
            <video autoPlay loop muted playsInline className="background-video">
                <source src="/animation.mp4" type="video/mp4" />
            </video>
            <div className="auth-overlay">
                <div className="auth-box">
                    <h2>Create your account</h2>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="error-msg">{error}</div>}
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="auth-btn">Continue</button>
                    </form>
                    <div className="auth-footer">
                        <p className="auth-redirect">
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>
                        <Link to="/" className="home-link">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
