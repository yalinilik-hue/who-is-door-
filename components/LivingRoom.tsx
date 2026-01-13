
import React, { useState } from 'react';
import { GamePhase, Activity, GameState, LifeStage } from '../types';

interface Props {
  state: GameState;
  onAction: (activity: Activity) => void;
  isSwedish?: boolean;
}

const LivingRoom: React.FC<Props> = ({ state, onAction, isSwedish }) => {
  const [ghostMessage, setGhostMessage] = useState<string | null>(null);
  const [denizClicks, setDenizClicks] = useState(0);
  const [pcClicks, setPcClicks] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [abandonedSecret, setAbandonedSecret] = useState(false);

  const isInteraction = state.phase === GamePhase.ARRIVAL || state.phase === GamePhase.INTERACTION;
  const isWaiting = state.phase === GamePhase.WAITING;
  const isLegacy = state.isHouseAbandoned;

  const handleGhostClick = () => {
    if (!isLegacy) return;
    const quotes = ["Seni izliyorum...", "Ütüleri yaptın mı?", "Çok büyüdün.", "Memories stay.", "Hej då."];
    setGhostMessage(quotes[Math.floor(Math.random() * quotes.length)]);
    setTimeout(() => setGhostMessage(null), 3000);
  };

  const handleDenizClick = () => {
    setDenizClicks(prev => prev + 1);
    if (denizClicks + 1 >= 3) {
      setGhostMessage("BFF Forever! ❤️");
      setTimeout(() => { setGhostMessage(null); setDenizClicks(0); }, 2000);
    }
  };

  const handlePcClick = () => {
    setPcClicks(prev => prev + 1);
    if (pcClicks + 1 >= 5) {
      setIsGlitching(true);
      setTimeout(() => { setIsGlitching(false); setPcClicks(0); }, 3000);
    }
  };

  const handleAbandonedClick = () => {
    setAbandonedSecret(true);
    setTimeout(() => setAbandonedSecret(false), 3000);
  };

  const getCharacterScale = () => {
    if (state.stage === LifeStage.ELEMENTARY) return 'scale-100';
    if (state.stage === LifeStage.MIDDLE_SCHOOL) return 'scale-105';
    if (state.stage === LifeStage.HIGH_SCHOOL) return 'scale-115';
    return 'scale-125';
  };

  const getCharacterHeight = () => {
    if (state.stage === LifeStage.ELEMENTARY) return 'h-32';
    if (state.stage === LifeStage.MIDDLE_SCHOOL) return 'h-40';
    if (state.stage === LifeStage.HIGH_SCHOOL) return 'h-48';
    return 'h-56';
  };

  return (
    <div className={`w-full h-full relative flex items-center justify-center p-8 transition-all duration-[3000ms] ${isLegacy ? 'bg-black' : isSwedish ? 'bg-blue-900/40' : 'bg-slate-900'}`}>
      
      <div className={`w-full h-full rounded-[3rem] shadow-2xl border transition-all duration-[3000ms] overflow-hidden relative 
        ${isLegacy 
          ? 'bg-zinc-950 border-zinc-900 grayscale brightness-50' 
          : isSwedish ? 'bg-blue-800/40 border-yellow-500/40' : 'bg-slate-800/40 border-slate-700'}`}>
        
        {isLegacy && (
          <>
            <div className="absolute inset-0 opacity-60 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dust.png')]"></div>
            <div className="absolute top-10 right-10 w-48 h-48 border-t-2 border-r-2 border-zinc-800 rounded-tr-[5rem] opacity-20"></div>
          </>
        )}

        {/* Father Shadow / Ghost Egg */}
        <div 
          onClick={handleGhostClick}
          className={`absolute bottom-10 right-20 flex flex-col items-center transition-opacity duration-1000 ${isLegacy ? 'opacity-5 cursor-pointer hover:opacity-10' : 'opacity-20'}`}
        >
             <div className="w-24 h-40 bg-slate-600 rounded-t-full"></div>
             <span className="text-[10px] mt-2 uppercase tracking-tighter">Baba / Father</span>
        </div>

        {/* Ghost Message Float */}
        {ghostMessage && (
          <div className="absolute bottom-60 right-20 text-white/60 italic text-xl animate-bounce pointer-events-none">
            {ghostMessage}
          </div>
        )}

        {/* Dog Render */}
        {state.hasDog && (
          <div className={`absolute bottom-10 left-20 transition-all duration-500 ${state.isDogSilenced ? 'opacity-40 grayscale scale-75' : 'animate-bounce'}`}>
            <div className="relative">
              <span className="text-4xl">🐕</span>
              {state.isDogSilenced && <span className="absolute -top-4 -right-2 text-xs">💤</span>}
              {!state.isDogSilenced && <span className="absolute -top-4 -right-2 text-xs animate-pulse font-bold text-blue-400">Woof!</span>}
            </div>
            <span className="text-[8px] uppercase block text-center mt-1 text-slate-500">Press S to silence</span>
          </div>
        )}

        {/* Characters - Deniz grows too! */}
        {!isLegacy && isInteraction && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-end gap-12">
            <div className={`flex flex-col items-center transition-all duration-700 ${getCharacterScale()}`}>
              <div className={`w-16 h-16 rounded-full mb-3 border-2 border-white/40 ${state.stage === LifeStage.UNIVERSITY || state.stage === LifeStage.JOB ? 'bg-indigo-300' : 'bg-blue-300'}`}></div>
              <div className={`w-20 rounded-t-3xl shadow-xl transition-all duration-700 ${getCharacterHeight()} bg-blue-500`}></div>
            </div>
            
            {state.isDenizPresent && (
              <div 
                onClick={handleDenizClick}
                className={`flex flex-col items-center transition-all duration-700 cursor-help ${getCharacterScale()}`}
              >
                <div className="w-16 h-16 rounded-full mb-3 border-2 border-white/40 bg-orange-300"></div>
                <div className={`w-20 bg-orange-500 rounded-t-3xl shadow-xl transition-all duration-700 ${getCharacterHeight()}`}></div>
              </div>
            )}
          </div>
        )}

        {/* PC Glitch Egg */}
        {!isLegacy && (
          <div 
            onClick={handlePcClick}
            className={`absolute bottom-32 left-32 w-40 h-24 bg-slate-900 border-2 rounded-lg cursor-pointer overflow-hidden ${isGlitching ? 'border-green-500 shadow-[0_0_20px_green]' : 'border-slate-700'}`}
          >
            {isGlitching && (
              <div className="w-full h-full bg-black text-green-500 font-mono text-[8px] p-1 overflow-hidden leading-tight">
                {Array(20).fill("010101_GLITCH_").join(" ")}
              </div>
            )}
          </div>
        )}

        {/* Action Options */}
        {!isLegacy && isInteraction && !state.interactionDone && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex flex-col gap-4 items-center">
            {!state.isDenizPresent ? (
              <button onClick={() => onAction(Activity.PLAYING_PC)} className={`${isSwedish ? 'bg-yellow-600' : 'bg-blue-700'} hover:scale-110 text-white px-10 py-4 rounded-full font-bold shadow-2xl transition-all`}>
                💻 Play PC
              </button>
            ) : (
              <div className="flex gap-4">
                <button onClick={() => onAction(Activity.PLAYING_VR)} className="bg-purple-700 hover:bg-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl transition-all">🕶️ VR Play</button>
                <button onClick={() => onAction(Activity.ADVENTURE)} className="bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl transition-all">🌲 Adventure</button>
              </div>
            )}
          </div>
        )}

        {isLegacy && (
          <div 
            onClick={handleAbandonedClick}
            className="absolute inset-0 flex items-center justify-center opacity-5 select-none cursor-pointer"
          >
            <h1 className="text-[12rem] font-serif uppercase tracking-tighter transition-all duration-500">
              {abandonedSecret ? "Never Forgotten" : "Abandoned"}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivingRoom;
