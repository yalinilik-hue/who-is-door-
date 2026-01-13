
import React from 'react';
import { GameState, Language } from '../types';

interface Props {
  state: GameState;
  onBack: () => void;
  isLegacy?: boolean;
  onNextDay?: () => void;
}

const WatchChild: React.FC<Props> = ({ state, onBack, isLegacy, onNextDay }) => {
  const isTR = state.language === 'TR';

  const getStageName = () => {
    switch(state.stage) {
      case 'ELEMENTARY': return isTR ? "İlkokul" : "Elementary";
      case 'MIDDLE_SCHOOL': return isTR ? "Ortaokul" : "Middle School";
      case 'HIGH_SCHOOL': return isTR ? "Lise" : "High School";
      case 'UNIVERSITY': return isTR ? "Üniversite" : "University";
      case 'JOB': return isTR ? "İş Hayatı" : "Career";
      case 'MARRIAGE': return isTR ? "Evlilik" : "Marriage";
      case 'HOSPITAL': return isTR ? "Torun Geliyor" : "Grandchild Incoming";
      case 'GRANDKIDS_ELEMENTARY': return isTR ? "Torun İlkokulda" : "Grandchild in School";
      default: return state.stage;
    }
  };

  return (
    <div className={`w-full h-screen flex flex-col items-center justify-center p-10 relative overflow-hidden font-mono transition-colors duration-[2000ms] ${isLegacy ? 'bg-indigo-950/20' : 'bg-slate-950'}`}>
      {/* Surveillance Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]"></div>
      
      {isLegacy && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/5 backdrop-blur px-8 py-2 rounded-full border border-white/10 animate-pulse">
           <span className="text-white text-[10px] tracking-[0.6em] font-light uppercase">Spirit Observer Mode</span>
        </div>
      )}

      <div className="z-10 w-full max-w-3xl flex flex-col items-center">
        <div className="flex justify-between w-full mb-8 items-end border-b border-indigo-900/50 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-3 h-3 rounded-full animate-pulse ${isLegacy ? 'bg-cyan-400 shadow-[0_0_10px_cyan]' : 'bg-red-600'}`}></div>
              <span className={`font-bold tracking-widest uppercase text-xs ${isLegacy ? 'text-cyan-400' : 'text-red-500'}`}>
                {isLegacy ? (isTR ? "RUH GÖZÜ" : "SPIRIT VISION") : "LIVE FEED"}
              </span>
            </div>
            <h1 className="text-4xl text-indigo-100 font-black tracking-tighter italic">{isLegacy ? "CH_LEGACY_WATCH" : "CH_MONITOR_01"}</h1>
          </div>
          <button 
            onClick={onBack}
            className="text-[10px] text-slate-500 hover:text-white transition-colors uppercase tracking-[0.4em] border border-slate-800 px-6 py-2 rounded-full"
          >
            {isTR ? "Çıkış (ESC)" : "Exit (ESC)"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {/* Virtual Camera View */}
          <div className={`aspect-square bg-black border-2 rounded-[2rem] relative overflow-hidden flex items-center justify-center group transition-all duration-1000 ${isLegacy ? 'border-cyan-900/50 shadow-[0_0_40px_rgba(34,211,238,0.1)]' : 'border-indigo-900/30'}`}>
             <div className="absolute top-6 left-6 text-[10px] text-indigo-500/50">{isLegacy ? "POV_GHOST_PARENT" : "CAM_01_LIVING_ROOM"}</div>
             <div className="absolute top-6 right-6 text-[10px] text-indigo-500/50 font-bold">{new Date().toLocaleTimeString()}</div>
             
             {/* Character Silhouette */}
             <div className={`relative flex flex-col items-center opacity-80 group-hover:opacity-100 transition-opacity ${isLegacy ? 'brightness-125' : ''}`}>
                <div className={`w-16 h-16 rounded-full border-2 mb-2 blur-[1px] ${isLegacy ? 'bg-cyan-500/30 border-cyan-400' : 'bg-indigo-500/20 border-indigo-400'}`}></div>
                <div className={`w-20 h-32 border-x-2 border-t-2 rounded-t-xl blur-[1px] ${isLegacy ? 'bg-cyan-600/30 border-cyan-400' : 'bg-indigo-600/20 border-indigo-400'}`}></div>
                {state.isDenizPresent && (
                  <div className="absolute -right-16 bottom-0 flex flex-col items-center opacity-40">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-400 mb-1 blur-[1px]"></div>
                    <div className="w-16 h-24 bg-orange-600/20 border-x-2 border-t-2 border-orange-400 rounded-t-xl blur-[1px]"></div>
                  </div>
                )}
             </div>

             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[8px] tracking-widest text-indigo-400/30 uppercase">
                {isLegacy ? "Observation: LEGACY_PHASE_01" : "Subject Identified: CHILD_ALPHA"}
             </div>
          </div>

          {/* Stats Display */}
          <div className="flex flex-col justify-center space-y-6">
            <div className={`border p-6 rounded-3xl transition-all ${isLegacy ? 'bg-cyan-950/10 border-cyan-900/30' : 'bg-indigo-950/20 border-indigo-900/30'}`}>
               <label className={`text-[10px] uppercase tracking-widest block mb-2 ${isLegacy ? 'text-cyan-500' : 'text-indigo-500'}`}>{isTR ? "GÜNCEL EVRE" : "CURRENT STAGE"}</label>
               <p className="text-2xl text-white font-bold">{getStageName()}</p>
            </div>

            <div className={`border p-6 rounded-3xl transition-all ${isLegacy ? 'bg-emerald-950/10 border-emerald-900/30' : 'bg-indigo-950/20 border-indigo-900/30'}`}>
               <label className={`text-[10px] uppercase tracking-widest block mb-2 ${isLegacy ? 'text-emerald-500' : 'text-indigo-500'}`}>{isTR ? "BÜTÇE" : "BUDGET"}</label>
               <p className="text-2xl text-emerald-400 font-bold">{state.childWealth} SEK</p>
            </div>

            {isLegacy && onNextDay && (
              <button 
                onClick={onNextDay}
                className="w-full py-6 rounded-3xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xl shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all transform active:scale-95 animate-pulse"
              >
                {isTR ? "DÖNGÜYE DEVAM ET" : "CONTINUE CYCLE"}
              </button>
            )}

            {!isLegacy && (
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border transition-colors ${state.isDenizPresent ? 'border-orange-900/50 bg-orange-950/10' : 'border-slate-900 bg-slate-900/20 opacity-30'}`}>
                  <span className="text-[10px] uppercase block mb-1">Deniz</span>
                  <span className="font-bold text-xs">{state.isDenizPresent ? (isTR ? "YAKINDA" : "NEARBY") : (isTR ? "YOK" : "NONE")}</span>
                </div>
                <div className={`p-4 rounded-2xl border transition-colors ${state.hasDog ? 'border-blue-900/50 bg-blue-950/10' : 'border-slate-900 bg-slate-900/20 opacity-30'}`}>
                  <span className="text-[10px] uppercase block mb-1">Dog</span>
                  <span className="font-bold text-xs">{state.hasDog ? (isTR ? "AKTİF" : "ACTIVE") : (isTR ? "YOK" : "NONE")}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-slate-800 text-[8px] text-center space-y-1">
          <p>SYSTEM_UPTIME: {Math.floor(state.day * 24)}H</p>
          <p>ENCRYPTION: AES_256_V_SWEDISH</p>
          {isLegacy && <p className="text-cyan-900/50">SPIRIT_SYNC: ACTIVE</p>}
        </div>
      </div>
    </div>
  );
};

export default WatchChild;
