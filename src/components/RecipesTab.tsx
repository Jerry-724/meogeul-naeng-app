
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import KoreanKeyboard from './KoreanKeyboard';
import { Button } from '@/components/ui/button';

const RecipesTab: React.FC = () => {
  const { messages, addMessage, showKeyboard, setShowKeyboard } = useApp();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage({
        sender: 'user',
        text: input.trim()
      });
      setInput('');
    }
  };
  
  const handleFocus = () => {
    setShowKeyboard(true);
  };
  
  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // If no messages yet, add a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        sender: 'bot',
        text: '안녕하세요! 오늘은 어떤 요리를 도와드릴까요?'
      });
    }
  }, [messages, addMessage]);
  
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] pb-16 bg-app-yellow bg-opacity-20">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`max-w-[85%] mb-4 ${
              message.sender === 'user' ? 'ml-auto' : 'mr-auto'
            }`}
          >
            <div 
              className={
                message.sender === 'user' 
                  ? 'chat-bubble-user' 
                  : 'chat-bubble-bot'
              }
            >
              {message.text}
            </div>
            <div 
              className={`text-xs text-gray-500 mt-1 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              {message.timestamp.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form 
        onSubmit={handleSubmit} 
        className="p-4 bg-white border-t flex items-center gap-2 sticky bottom-16"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="오늘 저녁 추천해줘..."
          className="flex-1 border rounded-full px-4 py-2"
          onFocus={handleFocus}
        />
        <Button 
          type="submit" 
          className="bg-app-green hover:bg-app-darkGreen text-white rounded-full px-4"
        >
          전송
        </Button>
      </form>
      
      {showKeyboard && (
        <div className="fixed bottom-0 left-0 right-0 animate-slide-up">
          <KoreanKeyboard />
        </div>
      )}
    </div>
  );
};

export default RecipesTab;
