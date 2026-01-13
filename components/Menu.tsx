
import React from 'react';
import { Language } from '../types';

interface Props {
  onStart: (lang: Language) => void;
  isSwedish?: boolean;
  onToggleTheme: () => void;
  showShop?: boolean;
  onOpenShop?: () => void;
  onOpenWatchChild: () => void;
  language: Language;
}

const Menu: React.FC<Props> = ({ onStart, isSwedish, onToggleTheme, showShop, onOpenShop, onOpenWatchChild, language }) => {
  const isTR = language === 'TR';

  return (
    <div className={`w-full h-screen flex flex-col items-center justify-center p-10 overflow-hidden relative transition-colors duration-1000 ${isSwedish ? 'bg-blue-900' : 'bg-slate-950'}`}>
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] transition-opacity duration-1000 ${isSwedish ? 'from-yellow-500/20' : 'from-blue-900/20'} via-transparent to-transparent opacity-50`}></div>
      
      <h1 
        onClick={onToggleTheme}
        className={`nordic-title text-7xl mb-2 z-10 tracking-tighter cursor-pointer select-none transition-colors duration-500 ${isSwedish ? 'text-yellow-400 hover:text-yellow-200' : 'text-white hover:text-blue-300'}`}
      >
        Who is Door
      </h1>
      <p className={`text-sm tracking-[0.4em] mb-12 uppercase z-10 transition-colors ${isSwedish ? 'text-yellow-500' : 'text-blue-400'}`}>Sweden • Life • Routine</p>

      <div className="flex flex-col gap-6 z-10 w-full max-w-xs">
        <button 
          onClick={() => onStart('TR')}
          className={`w-full py-4 rounded-2xl border transition-all font-semibold text-lg flex items-center justify-center gap-3 shadow-xl ${isSwedish ? 'bg-yellow-500 text-blue-900 border-yellow-400 hover:bg-yellow-400' : 'bg-slate-800 text-white border-slate-700 hover:bg-blue-700'}`}
        >
          Yeni Oyun (TR)
        </button>
        <button 
          onClick={() => onStart('EN')}
          className={`w-full py-4 rounded-2xl border transition-all font-semibold text-lg flex items-center justify-center gap-3 shadow-xl ${isSwedish ? 'bg-yellow-500 text-blue-900 border-yellow-400 hover:bg-yellow-400' : 'bg-slate-800 text-white border-slate-700 hover:bg-blue-700'}`}
        >
          New Game (EN)
        </button>

        <button 
          onClick={onOpenWatchChild}
          className={`w-full py-4 rounded-2xl border transition-all font-semibold text-lg flex items-center justify-center gap-3 shadow-xl ${isSwedish ? 'bg-blue-800 text-yellow-400 border-yellow-500/40 hover:bg-blue-700' : 'bg-slate-900 text-indigo-300 border-indigo-800 hover:bg-indigo-900'}`}
        >
          📡 {isTR ? "Çocuğu İzle" : "Watch Child"}
        </button>

        {showShop && (
          <button 
            onClick={onOpenShop}
            className="w-full py-4 rounded-2xl border-2 border-indigo-400 bg-indigo-900/40 text-indigo-200 font-bold text-lg flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(129,140,248,0.3)] hover:scale-105 transition-all animate-pulse"
          >
            ⭐ {isTR ? "Hafıza Mağazası" : "Memory Shop"}
          </button>
        )}
      </div>

      <div className="absolute bottom-10 text-slate-600 text-[10px] uppercase tracking-widest">
        Atmospheric Simulation Project • {isSwedish ? "Svenska Edition" : "Standard Edition"}
        {showShop && <span className="ml-4 text-indigo-500 animate-bounce block text-center mt-2">• {isTR ? "Hayatı Gözden Geçir" : "Review Life"} •</span>}
      </div>
    </div>
  );
};

export default Menu;
