import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  RefreshCw, 
  Bot, 
  AlertTriangle,
  Sprout 
} from 'lucide-react';
import { Language } from '../types';

interface AgriChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

interface ChatMessage {
  sender: 'user' | 'model';
  text: string;
}

const QUICK_PROMPTS: Record<Language, string[]> = {
  en: [
    'How to control Fall Armyworm in Maize?',
    'What is the fertilizer schedule for 40-day Paddy?',
    'Tomato fruit borer organic remedy',
    'Best time to spray fungicides today',
  ],
  kn: [
    'ಭತ್ತದ ಬೆಂಕಿ ರೋಗಕ್ಕೆ ಯಾವ ಔಷಧ ಸಿಂಪಡಿಸಬೇಕು?',
    'ಟೊಮೆಟೊ ಹಣ್ಣು ಕೊರೆಯುವ ಹುಳು ನಿಯಂತ್ರಣ ಹೇಗೆ?',
    'ತೆಂಗಿನ ಮರಕ್ಕೆ ಸುಳಿ ಕೊಳೆ ರೋಗದ ಪರಿಹಾರವೇನು?',
    'ಇಂದು ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆಗೆ ಸೂಕ್ತ ಸಮಯ ಯಾವುದು?',
  ],
  hi: [
    'धान में खैरा रोग और झुलसा के लिए क्या डालें?',
    'टमाटर के फल छेदक कीट का जैविक उपचार?',
    'कपास में गुलाबी सुंडी की रोकथाम कैसे करें?',
    'कीटनाशक छिड़काव का सबसे अच्छा समय क्या है?',
  ],
  te: [
    'వరిలో అగ్గితెగులు నివారణకు ఏ మందులు వాడాలి?',
    'టమాటా కాయ తొలుచు పురుగు నివారణ పద్ధతులు?',
    'ప్రత్తిలో గులాబీ రంగు పురుగు నివారణ?',
    'మందుల పిచికారీకి సరైన సమయం?',
  ],
  mr: [
    'भात पिकातील करपा रोगावर काय उपाय करावा?',
    'टोमॅटो फळ पोखरणाऱ्या अळीचा सेंद्रिय उपाय?',
    'सोयाबीनवरील खोडमाशी नियंत्रण कसे करावे?',
    'फवारणीसाठी आजचा अनुकूल वेळ कोणता?',
  ],
};

export const AgriChatModal: React.FC<AgriChatModalProps> = ({ isOpen, onClose, currentLang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'model',
      text: 'Namaste! I am Krishi Mitr, your AI Agricultural Advisor created by Akshay Ramappa Nerli, AMBIT. How can I assist with your crop diseases, fertilizers, or mandi rates today?',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/agri-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: newMessages.slice(-6),
          language: currentLang === 'kn' ? 'Kannada' : currentLang === 'hi' ? 'Hindi' : currentLang === 'te' ? 'Telugu' : currentLang === 'mr' ? 'Marathi' : 'English',
        }),
      });

      const data = await res.json();
      setMessages([...newMessages, { sender: 'model', text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        {
          sender: 'model',
          text: 'For best results on your farm, keep plant foliage aerated, spray bio-fungicide like Trichoderma, and consult your local Raitha Samparka Kendra.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const currentPrompts = QUICK_PROMPTS[currentLang] || QUICK_PROMPTS.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#f7faf7] w-full max-w-lg h-[620px] flex flex-col shadow-2xl border-2 border-[#064e3b] overflow-hidden">
        {/* Header (Green Primary Theme) */}
        <div className="bg-[#064e3b] text-white p-4 flex items-center justify-between shrink-0 border-b border-[#047857]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#10b981] text-[#064e3b] flex items-center justify-center font-black shadow-xs">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm font-display text-white">Krishi Mitr AI Advisor</h3>
                <span className="text-[9px] bg-[#022c22] text-[#34d399] font-black px-1.5 py-0.2 border border-[#10b981]">
                  AMBIT
                </span>
              </div>
              <p className="text-[11px] text-[#a7f3d0] flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 bg-[#34d399] animate-ping"></span>
                <span>Created by Akshay Ramappa Nerli, AMBIT</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-sharp p-1.5 text-[#a7f3d0] hover:text-white hover:bg-[#047857] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick prompt chips (Sharp Buttons in Green) */}
        <div className="bg-[#ecfdf5] border-b border-[#a7f3d0] p-2.5 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-black text-[#065f46] uppercase tracking-wider shrink-0 pl-1">
            Suggested:
          </span>
          {currentPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="btn-sharp text-[11px] font-bold text-[#064e3b] bg-white hover:bg-[#a7f3d0] border border-[#10b981] px-2.5 py-1 whitespace-nowrap transition-all shadow-2xs shrink-0 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-white">
          {messages.map((m, index) => {
            const isModel = m.sender === 'model';
            return (
              <div
                key={index}
                className={`flex gap-2.5 ${isModel ? 'items-start' : 'items-end justify-end'}`}
              >
                {isModel && (
                  <div className="w-7 h-7 bg-[#064e3b] text-[#34d399] flex items-center justify-center shrink-0 mt-0.5 border border-[#047857]">
                    <Sprout className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3.5 text-xs leading-relaxed max-w-[85%] whitespace-pre-wrap ${
                    isModel
                      ? 'bg-[#f7faf7] border-2 border-[#a7f3d0] text-[#0f2417] font-medium'
                      : 'bg-[#064e3b] text-white font-bold border border-[#047857]'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#047857] italic pl-10 font-bold">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#059669]" />
              <span>Krishi Mitr is researching agronomic guidelines...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer with Sharp Animated Button and AI Disclaimer */}
        <div className="p-3 bg-[#f7faf7] border-t-2 border-[#d1fae5] shrink-0 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about crops, pests, spray windows, mandi..."
              className="flex-1 text-xs border-2 border-[#a7f3d0] px-3.5 py-2.5 text-[#0f2417] focus:outline-none focus:border-[#059669] font-medium"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-sharp btn-green-primary px-4 py-2.5 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
            >
              <Send className="w-4 h-4 text-[#34d399]" />
            </button>
          </form>

          {/* Prominent Note: AI can make mistakes */}
          <div className="bg-[#fefce8] border border-[#f59e0b] p-1.5 text-center text-[10px] sm:text-[11px] text-[#92400e] font-bold flex items-center justify-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-[#b45309] shrink-0" />
            <span>
              <strong>Note: AI can make mistakes.</strong> Verify chemical recommendations with agricultural experts before field application.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
