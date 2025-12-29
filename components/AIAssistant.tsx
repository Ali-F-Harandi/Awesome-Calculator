
import React, { useState, useRef, useEffect } from 'react';
import { ITranslations, DesignStyle } from '../types';
import { generateAIResponse, IMChatMessage } from '../services/aiService';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAssistantProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
  apiKey: string;
  onOpenSettings: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ t, designStyle, isRTL, apiKey, onOpenSettings }) => {
  const [messages, setMessages] = useState<IMChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;

    const userMsg: IMChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
        const responseText = await generateAIResponse(apiKey, input);
        const aiMsg: IMChatMessage = { role: 'model', text: responseText };
        setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
        setMessages(prev => [...prev, { role: 'model', text: t.ai.error }]);
    } finally {
        setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
      }
  };

  // UI Styles
  const containerClass = designStyle === 'retro'
    ? 'bg-[#d4d4d2] border-4 border-black p-4 flex flex-col h-full font-mono'
    : designStyle === 'cyberpunk'
    ? 'bg-black border border-primary p-4 flex flex-col h-full'
    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex flex-col h-full overflow-hidden';

  const msgUserClass = designStyle === 'retro'
    ? 'bg-black text-white p-2 self-end max-w-[80%]'
    : 'bg-primary text-white p-3 rounded-l-xl rounded-tr-xl self-end max-w-[85%] shadow-md';

  const msgAIClass = designStyle === 'retro'
    ? 'bg-white border-2 border-black p-2 self-start max-w-[80%]'
    : designStyle === 'cyberpunk'
    ? 'bg-gray-900 border border-primary/50 text-primary p-3 self-start max-w-[85%]'
    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 rounded-r-xl rounded-tl-xl self-start max-w-[85%] border border-gray-200 dark:border-gray-600';

  // No API Key View
  if (!apiKey) {
      return (
          <div className="h-full p-2">
              <div className={`${containerClass} justify-center items-center text-center space-y-6`}>
                  <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t.ai.setKey}</h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-xs">{t.ai.noKeyMessage}</p>
                  <button 
                    onClick={onOpenSettings}
                    className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-105 transition"
                  >
                      {t.ai.goToSettings}
                  </button>
              </div>
          </div>
      );
  }

  return (
    <div className="h-full p-2">
        <div className={containerClass}>
            
            {/* Header */}
            <div className="flex items-center gap-2 pb-4 border-b border-gray-200 dark:border-gray-700 mb-4 shrink-0">
                <div className="p-2 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white">{t.ai.title}</h3>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 px-1 pb-4">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full opacity-50 space-y-2">
                        <span className="text-4xl">👋</span>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.ai.placeholder}</p>
                    </div>
                )}
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={msg.role === 'user' ? msgUserClass : msgAIClass}>
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className={`${msgAIClass} flex items-center gap-2`}>
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-xs italic opacity-70">{t.ai.thinking}</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="mt-2 flex gap-2 shrink-0">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t.ai.placeholder}
                    className={`flex-1 p-3 rounded-xl outline-none border transition-all ${
                        designStyle === 'retro' ? 'border-2 border-black font-mono' :
                        'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 ring-primary/50'
                    }`}
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className={`p-3 rounded-xl font-bold transition-all flex items-center justify-center
                        ${designStyle === 'retro' ? 'bg-black text-white border-2 border-transparent' : 'bg-primary text-white shadow-lg hover:bg-primary/90'}
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </div>

        </div>
    </div>
  );
};

export default AIAssistant;
