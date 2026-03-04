import React, { useState, useRef, useEffect } from 'react';
import './Conversation.css';

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { text: inputMessage, type: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/chat-voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          user_id: 'demo-user',
          session_id: 'demo-session'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { text: data.reply, type: 'assistant' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        text: 'Sorry, I encountered an error. Please try again.', 
        type: 'assistant' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/health');
      const data = await response.json();
      console.log('Health check:', data);
      alert(`Backend connection: ${data.status}\n${data.message}`);
    } catch (error) {
      console.error('Health check failed:', error);
      alert('Backend connection failed. Make sure the server is running on port 5001.');
    }
  };

  return (
    <div className="conversation">
      <div className="chat-surface">
        {/* Left Column - Chat Messages */}
        <div className="chat-left">
          <div className="bubble-list">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`bubble bubble--${msg.type}`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bubble bubble--assistant bubble--typing">
                <div className="dotdotdot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Controls */}
          {/* <div className="quick-controls">
            <button className="quick-btn" onClick={testConnection}>🔗</button>
            <button className="quick-btn">🎤</button>
          </div> */}
        </div>

        {/* Right Column - Mascot */}
        <div className="chat-right">
          <div className="mascot">
            <div className="mascot-face">
              <div className="eye left"></div>
              <div className="eye right"></div>
              <div className="smile"></div>
            </div>
            <div className="confetti c1"></div>
            <div className="confetti c2"></div>
            <div className="confetti c3"></div>
          </div>
        </div>

        {/* Composer Panel */}
        <div className="composer-panel">
          <form className="composer-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Conversation;