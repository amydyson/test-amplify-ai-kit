import React, { useState } from 'react';
import { ChatToggle } from './ChatToggle';
import './ChatDrawer.css';

interface ChatDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatDrawer = ({ isOpen, onToggle }: ChatDrawerProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'This is a sample response.', sender: 'bot' }]);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <ChatToggle onClick={onToggle} />
      {isOpen && <div className="chat-drawer-overlay" onClick={onToggle} />}
      <div className={`chat-drawer ${isOpen ? 'open' : ''}`}>
        <div className="chat-drawer-header">
          <h2>Chat</h2>
          <button className="close-button" onClick={onToggle}>×</button>
        </div>
        <div className="chat-drawer-messages">
          {messages.length === 0 ? (
            <div className="empty-state">Start a conversation...</div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))
          )}
        </div>
        <div className="chat-drawer-input">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={3}
          />
          <button onClick={handleSendMessage} disabled={!message.trim()}>Send</button>
        </div>
      </div>
    </>
  );
};
