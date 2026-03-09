
import React, { useState, useCallback } from 'react';
import { RECIPIENTS, STYLES, LanternIcon, HorseIcon } from './constants';
import { RecipientType, GreetingConfig, GeneratedGreeting } from './types';
import { generateNewYearGreeting } from './services/geminiService';

const App: React.FC = () => {
  const [config, setConfig] = useState<GreetingConfig>({
    recipient: 'friend',
    style: 'traditional',
    tone: 'warm',
    remarks: '',
    customRecipient: '',
    customStyle: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedGreeting | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (config.recipient === 'other' && !config.customRecipient?.trim()) {
      alert("请输入对方的称呼，让祝福更有温度哦！");
      return;
    }
    if (config.style === 'other' && !config.customStyle?.trim()) {
      alert("请输入您想要的祝福风格，比如：凡尔赛风、武侠风等。");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const greeting = await generateNewYearGreeting(config);
      setResult(greeting);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Top Banner with Animation */}
      <div className="bg-red-800 border-b-4 border-yellow-600 p-6 relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="grid grid-cols-6 gap-8 p-10">
             {[...Array(12)].map((_, i) => <div key={i} className="text-4xl">福</div>)} 
           </div>
        </div>
        
        <div className="flex items-center gap-4 mb-4 z-10">
          <LanternIcon />
          <h1 className="text-5xl md:text-7xl font-cursive font-bold text-yellow-500 drop-shadow-lg">
            马年新春大吉
          </h1>
          <LanternIcon />
        </div>
        <p className="text-yellow-400/80 text-lg md:text-xl tracking-[0.5em] font-serif uppercase z-10">
          Happy Year of the Horse
        </p>
      </div>

      <main className="container mx-auto px-4 mt-12 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
          
          {/* Main Selector Section */}
          <div className="bg-red-900/40 p-8 rounded-3xl border-2 border-yellow-600/50 shadow-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-yellow-500 mb-8 flex items-center gap-3">
              <span className="bg-yellow-600 text-red-900 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              谁是祝福对象？
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {RECIPIENTS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setConfig(prev => ({ ...prev, recipient: r.id as RecipientType }))}
                  className={`p-4 rounded-2xl border-2 transition-all transform hover:scale-105 flex flex-col items-center gap-2 ${config.recipient === r.id ? 'bg-yellow-600 border-yellow-400 text-red-900 shadow-xl' : 'bg-red-950/60 border-yellow-900/30 text-yellow-600 hover:border-yellow-600'}`}
                >
                  <span className="text-3xl">{r.icon}</span>
                  <span className="font-bold text-sm whitespace-nowrap">{r.label}</span>
                </button>
              ))}
            </div>

            {/* Custom Recipient Input - Only shows if 'other' is selected */}
            {config.recipient === 'other' && (
              <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <input
                  type="text"
                  value={config.customRecipient}
                  onChange={(e) => setConfig(prev => ({ ...prev, customRecipient: e.target.value }))}
                  placeholder="请输入对方的称呼，如：亲爱的老婆、敬爱的恩师..."
                  className="w-full p-4 bg-red-950/60 border-2 border-yellow-500 rounded-2xl text-yellow-100 placeholder-yellow-800 focus:outline-none shadow-inner"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold text-yellow-500 mt-12 mb-8 flex items-center gap-3">
              <span className="bg-yellow-600 text-red-900 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              选择表达风格
            </h2>
            <div className="flex flex-wrap gap-4">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setConfig(prev => ({ ...prev, style: s.id as any }))}
                  className={`px-8 py-3 rounded-full border-2 font-bold transition-all ${config.style === s.id ? 'bg-yellow-600 border-yellow-400 text-red-900 shadow-lg' : 'bg-red-950/60 border-yellow-900/30 text-yellow-600 hover:border-yellow-600'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Custom Style Input - Only shows if 'other' style is selected */}
            {config.style === 'other' && (
              <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <input
                  type="text"
                  value={config.customStyle}
                  onChange={(e) => setConfig(prev => ({ ...prev, customStyle: e.target.value }))}
                  placeholder="请输入您想要的风格，如：赛博朋克风、粤语方言、土味情话风格..."
                  className="w-full p-4 bg-red-950/60 border-2 border-yellow-500 rounded-2xl text-yellow-100 placeholder-yellow-800 focus:outline-none shadow-inner"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold text-yellow-500 mt-12 mb-6 flex items-center gap-3">
              <span className="bg-yellow-600 text-red-900 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              个性化备注 (选填)
            </h2>
            <div className="relative">
              <textarea
                value={config.remarks}
                onChange={(e) => setConfig(prev => ({ ...prev, remarks: e.target.value }))}
                placeholder="例如：提到去年的合作愉快、升职加薪、或是特别的感谢... AI 会将这些信息巧妙融入祝福语中。"
                className="w-full h-32 p-4 bg-red-950/60 border-2 border-yellow-900/30 rounded-2xl text-yellow-100 placeholder-yellow-800 focus:border-yellow-500 focus:ring-0 transition-all resize-none font-serif"
              />
              <div className="absolute bottom-3 right-4 text-yellow-900/40 text-sm">
                让祝福更懂人心
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="group relative px-16 py-6 bg-red-600 border-4 border-yellow-500 rounded-full overflow-hidden hover:bg-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(234,179,8,0.3)] active:scale-95"
              >
                <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-100"></div>
                <div className="relative flex items-center gap-4">
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-yellow-500 text-2xl font-black">生成中...</span>
                    </>
                  ) : (
                    <span className="text-yellow-500 text-2xl font-black">生成马年祝福</span>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Result Section */}
          {result && (
            <div className="bg-red-900/60 p-10 rounded-3xl border-2 border-yellow-500 shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold text-yellow-500 text-center sm:text-left">新春祝福语</h3>
                <button 
                  onClick={handleCopy}
                  className="w-full sm:w-auto px-8 py-4 bg-yellow-600 text-red-900 rounded-2xl font-bold hover:bg-yellow-500 transition shadow-lg transform active:scale-95 flex items-center justify-center gap-2"
                >
                  {copied ? '✅ 复制成功' : '📄 复制文案'}
                </button>
              </div>

              <div className="bg-red-950/50 p-8 rounded-2xl border border-yellow-600/20 mb-8 relative">
                 <div className="absolute bottom-4 right-4 opacity-10">
                    <HorseIcon />
                 </div>
                 <p className="text-yellow-100 text-2xl md:text-3xl leading-relaxed font-serif tracking-wide whitespace-pre-wrap">
                    {result.text}
                 </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                 {result.idioms.map((idiom, idx) => (
                   <div key={idx} className="px-3 py-1 bg-yellow-900/40 border border-yellow-600/30 rounded text-yellow-500/80 text-xs sm:text-sm">
                      #{idiom}
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="mt-20 py-10 border-t border-yellow-600/30 text-center">
        <p className="text-yellow-600/60 text-sm tracking-widest px-4">
          © 2026 丙午马年 · 恭贺新禧 · 策马扬鞭 · 马到成功
        </p>
      </footer>
    </div>
  );
};

export default App;
