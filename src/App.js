// src/App.js

import React, { useEffect, useState } from 'react';
import ChatWindow from './components/ChatWindow';
import corpus from './data/corpus.json';
import './styles.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Send a welcome message when the component mounts
    // const welcomeMessage = "Hello, welcome to Jessup Cellars!";
    const welcomeMessage = "Hello, welcome to Jessup Cellars! How can I assist you today?";


    setMessages([{ from: 'bot', text: welcomeMessage }]);
  }, []);

  const normalizeText = (text) => {
    return text.toLowerCase().replace(/[?.,!]/g, ''); // Remove common punctuation
  };

  const getResponse = (question) => {
    const normalizedQuestion = normalizeText(question); // Normalize user input
    for (let entry of corpus) {
      const normalizedEntryQuestion = normalizeText(entry.question);
      if (normalizedQuestion.includes(normalizedEntryQuestion)) {
        return entry.answer;
      }
    }
    return "Sorry, I don't have the answer to that. Please contact us directly.";
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: 'user', text: input }]);
      const response = getResponse(input);
      setMessages([...messages, { from: 'user', text: input }, { from: 'bot', text: response }]);
      setInput('');
    }
  };

  return (
    <div className="app">
      <ChatWindow messages={messages} />
      <div className="message-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default App;
