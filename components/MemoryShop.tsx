
import React from 'react';
import { Language } from '../types';

interface Props {
  language: Language;
  onBack: () => void;
}

const MemoryShop: React.FC<Props> = ({ language, onBack }) => {
  const isTR = language === 'TR';

  const milestones = [
    { id: 1, label: isTR ? "İlk Okul Günü" : "First Day of School", desc: isTR ? "Küçücüktü..." : "They were so small...", icon: "🎒" },
    { id: 2, label: isTR ? "Ortaokul Arkadaşları" : "Middle School Friends", desc: isTR ? "Deniz ile ilk oyunlar." : "First games with Deniz.", icon: "🛹" },
    { id: 3, label: isTR ? "Lise Yılları" : "High School Years", desc: isTR ? "Gelecek planları." : "Future plans.", icon: "📚" },
    { id: 4, label: isTR ? "Üniversite Mezuniyeti" : "University Graduation", desc: isTR ? "Gurur duyduk." : "We were so proud.", icon: "🎓" },
    { id: 5, label: isTR ? "İş Hayatı" : "First Job", desc: isTR ? "Kendi ayakları üzerinde." : "Standing on their own feet.", icon: "💼" },
    { id: 6, label: isTR ? "Kendi Evi ve Ailesi" : "Their Own Family", desc: isTR ? "Döngü yeniden başlıyor." : "The cycle starts again.", icon: "🏠" },
  ];

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center p-10 overflow-auto">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
          <h1 className="nordic-title text-5xl text-indigo-200">
            {isTR ? "Çocuğunun Hayatı" : "Your Child's Life"}
          </h1>
          <button 
            onClick={onBack}
            className="px-6 py-2 border border-slate-700 rounded-full text-slate-400 hover:text-white hover:border-white transition-all uppercase text-xs tracking-widest"
          >
            {isTR ? "Geri Dön" : "Go Back"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {milestones.map((m) => (
            <div key={m.id} className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-indigo-500/50 transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{m.icon}</div>
              <h3 className="text-xl font-bold text-indigo-100 mb-2">{m.label}</h3>
              <p className="text-slate-500 text-sm italic">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-slate-700 text-xs italic uppercase tracking-[0.5em]">
          Life is a door that always remains open.
        </div>
      </div>
    </div>
  );
};

export default MemoryShop;
