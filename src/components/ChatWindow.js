// src/components/ChatWindow.js

import React from 'react';
import './ChatWindow.css'; // Ensure this path matches your CSS file

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.from}`}>
          <div className={`${msg.from}-logo`}>
            {msg.from === 'user' ? 'U' : 'B'}
          </div>
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
