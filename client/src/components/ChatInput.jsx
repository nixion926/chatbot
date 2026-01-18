import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Mic, X } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const fileInputRef = useRef(null);
    const inputRef = useRef(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US";

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setMessage(prev => prev + transcript);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim() && !file) return;

        onSendMessage(message, file);
        setMessage('');
        setFile(null);
        setShowEmojiPicker(false);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64String = e.target.result.split(",")[1];
            setFile({
                data: base64String,
                mime_type: selectedFile.type,
                preview: e.target.result
            });
        };
        reader.readAsDataURL(selectedFile);
        e.target.value = ''; // Reset input
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    const addEmoji = (emoji) => {
        setMessage(prev => prev + emoji.native);
        // Don't close picker immediately for better UX
    };

    return (
        <div className="chat-footer">
            <form className="chat-form" onSubmit={handleSend}>
                {file && (
                    <div className="file-preview">
                        <img src={file.preview} alt="Preview" />
                        <button type="button" className="remove-file" onClick={() => setFile(null)}>
                            <X size={14} />
                        </button>
                    </div>
                )}

                <textarea
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message..."
                    className="message-input"
                    rows={1}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 768) {
                            e.preventDefault();
                            handleSend(e);
                        }
                    }}
                />

                <div className="chat-controls">
                    <button
                        type="button"
                        className="control-btn"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        <Smile size={20} />
                    </button>

                    <button
                        type="button"
                        className="control-btn"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <Paperclip size={20} />
                    </button>
                    <input
                        type="file"
                        accept="images/*"
                        ref={fileInputRef}
                        hidden
                        onChange={handleFileChange}
                    />

                    <button
                        type="button"
                        className={`control-btn ${isListening ? 'listening' : ''}`}
                        onClick={toggleListening}
                    >
                        <Mic size={20} />
                    </button>

                    <button
                        type="submit"
                        className="send-btn"
                        disabled={!message.trim() && !file}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </form>

            {showEmojiPicker && (
                <div className="emoji-picker-container">
                    <Picker
                        data={data}
                        onEmojiSelect={addEmoji}
                        theme="light"
                        previewPosition="none"
                    />
                </div>
            )}
        </div>
    );
};

export default ChatInput;
