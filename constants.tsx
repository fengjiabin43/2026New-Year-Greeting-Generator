
import React from 'react';

export const RECIPIENTS = [
  { id: 'elder', label: '长辈', icon: '👴' },
  { id: 'leader', label: '领导', icon: '👔' },
  { id: 'friend', label: '好友', icon: '🤝' },
  { id: 'colleague', label: '同事', icon: '💻' },
  { id: 'junior', label: '晚辈', icon: '👦' },
  { id: 'customer', label: '客户', icon: '💼' },
  { id: 'other', label: '其他', icon: '✨' },
];

export const STYLES = [
  { id: 'traditional', label: '传统庄重' },
  { id: 'humorous', label: '幽默风趣' },
  { id: 'poetic', label: '文雅诗意' },
  { id: 'modern', label: '简约现代' },
  { id: 'other', label: '其他' },
];

export const LanternIcon = () => (
  <svg className="w-8 h-8 text-yellow-500 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);

export const HorseIcon = () => (
    <svg className="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699-7.33a14.86 14.86 0 00-4.463 3.08m3.646-5.603a14.903 14.903 0 011.53 1.157m-2.231-.563a14.883 14.883 0 011.53 1.157" />
    </svg>
);
