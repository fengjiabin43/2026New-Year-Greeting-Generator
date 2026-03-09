
import React from 'react';

interface GreetingCardProps {
  text: string;
  recipientLabel: string;
  onClose: () => void;
}

const GreetingCard: React.FC<GreetingCardProps> = ({ text, recipientLabel, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-red-700 rounded-lg shadow-2xl overflow-hidden border-4 border-yellow-500 transform transition-all scale-100 p-1">
        
        {/* Decorative Borders */}
        <div className="absolute top-2 left-2 w-12 h-12 border-t-4 border-l-4 border-yellow-400"></div>
        <div className="absolute top-2 right-2 w-12 h-12 border-t-4 border-r-4 border-yellow-400"></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 border-b-4 border-l-4 border-yellow-400"></div>
        <div className="absolute bottom-2 right-2 w-12 h-12 border-b-4 border-r-4 border-yellow-400"></div>

        <div className="bg-red-800 p-8 flex flex-col items-center text-center">
          {/* Header */}
          <div className="mb-6 flex flex-col items-center">
            <span className="text-yellow-500 text-3xl font-bold mb-2">马年大吉</span>
            <div className="w-16 h-1 bg-yellow-500 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="mb-8 w-full">
            <p className="text-yellow-200 text-lg font-bold mb-4 text-left">亲爱的{recipientLabel}:</p>
            <p className="text-yellow-100 text-xl leading-relaxed whitespace-pre-wrap font-serif italic">
              {text}
            </p>
          </div>

          {/* Footer Signature */}
          <div className="mt-auto w-full text-right">
            <p className="text-yellow-400 font-bold">新春贺岁</p>
            <p className="text-yellow-500/80 text-sm">2026 · 丙午马年</p>
          </div>
          
          <div className="mt-10 flex gap-4 no-print">
            <button 
              onClick={() => window.print()} 
              className="px-6 py-2 bg-yellow-600 text-red-900 rounded-full font-bold hover:bg-yellow-500 transition shadow-lg"
            >
              打印贺卡
            </button>
            <button 
              onClick={onClose} 
              className="px-6 py-2 bg-red-900 text-yellow-500 border border-yellow-500 rounded-full font-bold hover:bg-red-950 transition"
            >
              关闭预览
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingCard;
