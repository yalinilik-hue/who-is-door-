
import React from 'react';
import { Language } from '../types';

interface Props {
  language: Language;
  onBack: () => void;
  onBuyDog: () => void;
}

const SecretShop: React.FC<Props> = ({ language, onBack, onBuyDog }) => {
  const isTR = language === 'TR';

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-10 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-indigo-900/20 opacity-40"></div>
      
      <div className="z-10 text-center space-y-8 max-w-lg">
        <h1 className="text-6xl font-black text-red-500 tracking-tighter animate-pulse italic">
          {isTR ? "GİZLİ MAĞAZA" : "SECRET SHOP"}
        </h1>
        <p className="text-zinc-500 text-sm tracking-widest uppercase">
          {isTR ? "Hile kodları aktif edildi..." : "Cheat codes activated..."}
        </p>

        <div className="bg-zinc-900/80 border border-red-900/50 p-10 rounded-[3rem] shadow-2xl space-y-6 group hover:border-red-500 transition-all">
          <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">🐕</div>
          <h2 className="text-3xl font-bold text-white">
            {isTR ? "Sadık Bir Dost" : "A Loyal Friend"}
          </h2>
          <p className="text-zinc-400">
            {isTR ? "Bu köpek her zaman yanında olacak. Susturmak için S tuşuna bas." : "This dog will stay by your side. Press S to silence it."}
          </p>
          <button 
            onClick={() => {
              onBuyDog();
              onBack();
            }}
            className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95"
          >
            {isTR ? "KÖPEĞİ AL" : "GET THE DOG"}
          </button>
        </div>

        <button 
          onClick={onBack}
          className="text-zinc-600 hover:text-white uppercase tracking-widest text-xs transition-colors"
        >
          {isTR ? "GİZLİ KAL" : "STAY HIDDEN"}
        </button>
      </div>

      <div className="absolute bottom-10 left-10 text-red-900/30 text-[8px] font-mono leading-tight">
        DEBUG::CH_ACTIVATE_DOG<br/>
        EN_CHEAT_MODE_ON<br/>
        RENDER_SEC_SHOP_V1
      </div>
    </div>
  );
};

export default SecretShop;
