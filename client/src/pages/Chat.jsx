import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MessageSquare, Plus, LogOut, User, Menu, X, Sparkles } from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import './Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'model',
            text: 'Hello! I am your AI assistant. How can I help you today?',
            isError: false
        }
    ]);
    const [isThinking, setIsThinking] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const chatBodyRef = useRef(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isThinking]);

    const handleSendMessage = async (userMessage, file) => {
        const newMessages = [
            ...messages,
            {
                role: 'user',
                text: userMessage,
                file: file
            }
        ];
        setMessages(newMessages);
        setIsThinking(true);

        try {
            const API_KEY = import.meta.env.VITE_API_KEY;
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

            const history = newMessages.map(msg => ({
                role: msg.role === 'model' ? 'model' : 'user',
                parts: [
                    { text: msg.text },
                    ...(msg.file ? [{ inline_data: { mime_type: msg.file.mime_type, data: msg.file.data } }] : [])
                ]
            }));

            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: history })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || "Something went wrong");

            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();

            setMessages(prev => [
                ...prev,
                { role: 'model', text: apiResponseText }
            ]);

        } catch (error) {
            setMessages(prev => [
                ...prev,
                { role: 'model', text: error.message || "Failed to get response", isError: true }
            ]);
        } finally {
            setIsThinking(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="chat-layout">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/" className="brand-link">
                        <Sparkles size={24} className="brand-icon" />
                        <span>AI Assistant</span>
                    </Link>
                    <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>
                <div className="new-chat-container">
                    <button className="new-chat-btn" onClick={() => setMessages([])}>
                        <Plus size={16} />
                        New chat
                    </button>
                </div>

                <div className="chat-history">
                    <div className="history-group">
                        <h3>Today</h3>
                        <button className="history-item active">
                            <MessageSquare size={16} />
                            <span>New Conversation</span>
                        </button>
                    </div>
                </div>

                <div className="user-profile">
                    <div className="user-info">
                        <div className="avatar">
                            <User size={20} />
                        </div>
                        <span className="username">{user.username || 'User'}</span>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="main-chat">
                <header className="mobile-header">
                    <button onClick={() => setSidebarOpen(true)}>
                        <Menu size={24} />
                    </button>
                    <span>AI Assistant</span>
                </header>

                <div className="messages-container" ref={chatBodyRef}>
                    {messages.length === 0 ? (
                        <div className="empty-state">
                            <h1>How can I help you today?</h1>
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <ChatMessage key={index} message={msg} />
                        ))
                    )}

                    {isThinking && (
                        <div className="message bot-message thinking">
                            <div className="bot-avatar">
                                <div className="thinking-indicator">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="input-area">
                    <div className="input-container">
                        <ChatInput onSendMessage={handleSendMessage} />
                        <p className="disclaimer">
                            AI can make mistakes. Consider checking important information.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Chat;
