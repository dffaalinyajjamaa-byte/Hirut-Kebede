import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User as UserIcon, 
  Loader2, 
  ShoppingBag, 
  HardDrive, 
  ShieldCheck,
  CreditCard,
  Clock,
  ArrowRight
} from 'lucide-react';
import { User } from 'firebase/auth';
import { ChatMessage } from '../types';

interface AiConsultantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onOpenCheckout: () => void;
}

export const AiConsultantDrawer: React.FC<AiConsultantDrawerProps> = ({
  isOpen,
  onClose,
  user,
  onOpenCheckout,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'amir',
      text: `Greetings! I am **Amir Plus**, your luxury-tier Google AI Pro specialist.\n\nI am here to guide your 18-month access, showcase how 5 team members share 5,000 GB cloud storage, and assist with local Ethiopian payment rails (TeleBirr, CBE Birr, and Bank of Abyssinia).\n\nHow may I elevate your workflow today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'How does 18-Month licensing work?',
        'How are 5 TB storage & 5 seats divided?',
        'Payment details for TeleBirr & CBE',
        'Explain the 24-hour fulfillment SLA'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ sender: m.sender, text: m.text })),
          userEmail: user?.email
        })
      });

      const data = await response.json();
      const amirMsg: ChatMessage = {
        id: `amir-${Date.now()}`,
        sender: 'amir',
        text: data.reply || data.fallback || 'I am ready to assist you with Google AI Pro.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: data.suggestions || ['Start 399 ETB Checkout', 'Ask another question']
      };

      setMessages((prev) => [...prev, amirMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const fallbackMsg: ChatMessage = {
        id: `amir-err-${Date.now()}`,
        sender: 'amir',
        text: 'The 18-Month Google AI Pro license is available for 399 ETB with 5 TB Cloud Storage and 5 Multi-Seats. Click "Get AI Pro" below to secure your license.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Start 399 ETB Checkout']
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] p-2 sm:p-4 animate-slide-left pointer-events-auto">
      <div className="glass-panel rounded-[36px] h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/60 flex items-center justify-between bg-white/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] flex items-center justify-center shadow-md">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#111827] text-sm">Amir Plus AI</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-[#6B7280] font-medium">Luxury Product Specialist</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCheckout}
              className="clay-button px-3.5 py-1.5 font-bold text-xs text-[#111827] cursor-pointer"
            >
              Order (399 ETB)
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/60 text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}>
                <div
                  className={`p-3.5 rounded-2xl max-w-[88%] leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-xs shadow-xs font-medium'
                      : 'bg-white/70 text-[#111827] rounded-bl-xs border border-white/80 shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>

                <span className="text-[10px] text-[#9CA3AF] px-1">
                  {msg.timestamp}
                </span>

                {/* Suggestions Pills for AI Responses */}
                {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1.5 max-w-full">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (sug.includes('Checkout') || sug.includes('Order')) {
                            onOpenCheckout();
                          } else {
                            handleSendMessage(sug);
                          }
                        }}
                        className="px-3 py-1 text-[11px] font-semibold text-[#6B7280] hover:text-[#111827] bg-white/60 hover:bg-white/90 border border-white/80 rounded-full transition-all cursor-pointer text-left shadow-2xs"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-[#9CA3AF] text-xs p-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span>Amir Plus is formulating executive consultation...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Field */}
        <div className="p-3 sm:p-4 border-t border-white/60 bg-white/40 backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about 5TB storage, TeleBirr, or 18M license..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-2xl text-xs text-[#111827] placeholder-[#9CA3AF] bg-white/60 border border-white/80 outline-none focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="w-10 h-10 rounded-2xl gemini-gradient-bg text-white flex items-center justify-center shadow-md hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
