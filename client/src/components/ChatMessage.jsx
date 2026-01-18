import React from 'react';
import { Sparkles, User } from 'lucide-react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
    const isBot = message.role === 'model';

    return (
        <div className={`message ${isBot ? 'bot-message' : 'user-message'} ${message.isError ? 'error' : ''}`}>
            {isBot && (
                <div className="bot-avatar">
                    <Sparkles size={18} />
                </div>
            )}

            <div className="message-content">
                {message.file && (
                    <div className="message-attachment">
                        <img
                            src={`data:${message.file.mime_type};base64,${message.file.data}`}
                            alt="Uploaded attachment"
                        />
                    </div>
                )}
                <div className="message-text">
                    {message.text}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
