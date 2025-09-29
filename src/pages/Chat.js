// src/pages/Chat.js
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../utils/socket';

export default function Chat() {
  const { fantasyId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Mock profile data
  const profile = {
    id: fantasyId,
    name: fantasyId === '1' ? 'Aria' : fantasyId === '2' ? 'Luna' : 'Zoe',
    photo: fantasyId === '1'
      ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
      : fantasyId === '2'
      ? 'https://images.unsplash.com/photo-1529626455594-4ff0f8a29d8a?w=100'
      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate fantasy typing & replies
  useEffect(() => {
    const handleTyping = () => setIsTyping(true);
    const handleStopTyping = () => setIsTyping(false);

    const handleNewMessage = (msg) => {
      setMessages(prev => [...prev, msg]);
    };

    // Simulate fantasy reply after customer sends message
    const simulateFantasyReply = (customerMsg) => {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const replies = [
            "Hey there! 😊 How's your day going?",
            "I was just thinking about you...",
            "Tell me something real about you 💬",
            "You seem interesting... want to know a secret?",
            "I love deep conversations — what's on your mind?"
          ];
          const reply = replies[Math.floor(Math.random() * replies.length)];
          setMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'fantasy',
            content: reply,
            timestamp: new Date().toISOString(),
            profilePic: profile.photo
          }]);
        }, 1500);
      }, 1000);
    };

    const handleCustomerMessage = (msg) => {
      setMessages(prev => [...prev, msg]);
      simulateFantasyReply(msg);
    };

    // Mock: load initial message
    if (messages.length === 0) {
      setMessages([{
        id: 1,
        sender: 'fantasy',
        content: `Hi! I'm ${profile.name}. So glad you're here 💖`,
        timestamp: new Date().toISOString(),
        profilePic: profile.photo
      }]);
    }

    // In real app, you'd use:
    // socket.on('typing:start', handleTyping);
    // socket.on('message:new', handleNewMessage);

    return () => {
      socket.off('typing:start', handleTyping);
      socket.off('typing:stop', handleStopTyping);
      socket.off('message:new', handleNewMessage);
    };
  }, [fantasyId, profile.photo]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'customer',
      content: input,
      timestamp: new Date().toISOString()
    };

    // In real app: socket.emit('sendMessage', { ... });
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '12px 16px',
        boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <img
          src={profile.photo}
          alt={profile.name}
          style={{ width: '36px', height: '36px', borderRadius: '50%' }}
        />
        <div>
          <h3 style={{ margin: '0', fontWeight: '600' }}>{profile.name}</h3>
          {isTyping && (
            <p style={{ margin: '0', fontSize: '13px', color: '#666' }}>typing...</p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`message-bubble ${msg.sender === 'customer' ? 'customer-bubble' : 'fantasy-bubble'}`}
            style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}
          >
            {msg.sender === 'fantasy' && (
              <img
                src={msg.profilePic}
                alt="Fantasy"
                style={{ width: '32px', height: '32px', borderRadius: '50%', marginTop: '4px' }}
              />
            )}
            <div>
              <div>{msg.content}</div>
              <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px', textAlign: msg.sender === 'customer' ? 'right' : 'left' }}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button (if scrolled up) */}
      {messages.length > 5 && (
        <button className="scroll-to-bottom" onClick={scrollToBottom}>
          ↓
        </button>
      )}

      {/* Input */}
      <form onSubmit={sendMessage} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ fontSize: '16px' }}
        />
        <button type="submit" style={{ backgroundColor: '#0d9488' }}>
          ✈️
        </button>
      </form>
    </div>
  );
}