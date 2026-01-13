
import React from 'react';
import { GamePhase, Activity, GameState, LifeStage } from '../types';

interface Props {
  state: GameState;
  onAction: (activity: Activity) => void;
  onNextDay: () => void;
  onOpenMenu: () => void;
  isSwedish?: boolean;
}

const UIOverlay: React.FC<Props> = ({ state, onAction, onNextDay, onOpenMenu, isSwedish }) => {
  const isLegacy = state.phase === GamePhase.LEGACY;
  const isGraduation = state.phase === GamePhase.GRADUATION;
  
  const getStageLabel = () => {
    const isTR = state.language === 'TR';
    switch(state.stage) {
      case LifeStage.ELEMENTARY: return isTR ? "İlkokul" : "Elementary";
      case LifeStage.MIDDLE_SCHOOL: return isTR ? "Ortaokul" : "Middle School";
      case LifeStage.HIGH_SCHOOL: return isTR ? "Lise" : "High School";
      case LifeStage.UNIVERSITY: return isTR ? "Üniversite" : "University";
      case LifeStage.JOB: return isTR ? "İşe Başladı" : "Started Working";
      case LifeStage.MARRIAGE: return isTR ? "Evlendi" : "Married";
      case LifeStage.HOSPITAL: return isTR ? "Hastane (Doğum)" : "Hospital (Birth)";
      case LifeStage.GRANDKIDS_ELEMENTARY: return isTR ? "Torun İlkokul" : "Grandkids Elementary";
      case LifeStage.GRANDKIDS_MIDDLE: return isTR ? "Torun Ortaokul" : "Grandkids Middle";
      case LifeStage.GRANDKIDS_HIGH: return isTR ? "Torun Lise" : "Grandkids High";
      case LifeStage.GRANDKIDS_UNI: return isTR ? "Torun Üniversite" : "Grandkids Uni";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-6">
        <div className={`pb-4 border-b ${isSwedish ? 'border-yellow-500/30' : 'border-slate-800'}`}>
          <h2 className={`nordic-title text-3xl mb-2 transition-colors ${isSwedish ? 'text-yellow-400' : 'text-indigo-100'}`}>Who is Door</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`text-[9px] px-3 py-1 rounded border uppercase font-bold transition-colors ${isSwedish ? 'bg-yellow-500 text-blue-900 border-yellow-400' : 'bg-indigo-900/50 text-indigo-300 border-indigo-800'}`}>
              {getStageLabel()}
            </span>
            {!isLegacy && (
              <span className={`text-[9px] px-3 py-1 rounded border uppercase font-bold ${isSwedish ? 'bg-blue-700 text-yellow-400 border-yellow-500' : 'bg-red-900/40 text-red-400 border-red-800'}`}>
                {state.language === 'TR' ? "Yaşınız" : "Your Age"}: {state.parentAge}
              </span>
            )}
            {state.stage === LifeStage.JOB && (
              <span className="text-[9px] bg-emerald-900/40 text-emerald-400 px-3 py-1 rounded border border-emerald-800 uppercase font-bold">
                {state.language === 'TR' ? "Bütçe" : "Budget"}: {state.childWealth} SEK
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {state.phase === GamePhase.WAITING && (
            <button 
              onClick={() => onAction(Activity.IRONING)}
              disabled={state.ironingProgress >= 100}
              className={`w-full py-4 rounded-2xl font-bold transition-all disabled:opacity-20 ${isSwedish ? 'bg-yellow-500 text-blue-900 hover:bg-yellow-400' : 'bg-indigo-700 hover:bg-indigo-600 text-white'}`}
            >
              {state.language === 'TR' ? "Ütü Yap" : "Iron Clothes"}
            </button>
          )}

          {isLegacy && state.stage === LifeStage.JOB && !state.interactionDone && (
             <button 
               onClick={() => onAction(Activity.WORKING)}
               className={`w-full py-4 rounded-2xl font-bold transition-all ${isSwedish ? 'bg-emerald-600 text-white' : 'bg-emerald-700 text-white'}`}
             >
               {state.language === 'TR' ? "İşe Git (Para Al)" : "Go to Work (Earn)"}
             </button>
          )}

          {(state.interactionDone || isLegacy || isGraduation) && (
            <button 
              onClick={onNextDay}
              className={`w-full py-5 rounded-2xl font-black text-xl shadow-2xl transition-all transform active:scale-95 ${isSwedish ? 'bg-yellow-500 text-blue-900' : 'bg-gradient-to-br from-indigo-600 to-blue-700 text-white'}`}
            >
              {state.language === 'TR' ? "Sonraki Gün" : "Next Day"}
            </button>
          )}

          {isLegacy && (
            <div className={`mt-8 p-4 rounded-2xl space-y-3 border transition-colors ${isSwedish ? 'bg-blue-800 border-yellow-500/30' : 'bg-zinc-900 border-zinc-800'}`}>
               <p className={`text-[10px] uppercase tracking-widest text-center font-bold ${isSwedish ? 'text-yellow-500' : 'text-zinc-500'}`}>Mağaza / Memory Shop</p>
               <button className={`w-full py-2 text-[10px] rounded border transition-colors ${isSwedish ? 'bg-blue-700 text-yellow-400 border-yellow-500 hover:bg-blue-600' : 'bg-zinc-800 text-indigo-400 border-indigo-900/20 hover:bg-zinc-700'}`}>
                 {state.language === 'TR' ? "Anıları Satın Al" : "Buy Memories"}
               </button>
            </div>
          )}
        </div>
      </div>

      <button onClick={onOpenMenu} className={`text-[10px] uppercase transition-colors py-4 ${isSwedish ? 'text-yellow-500/50 hover:text-yellow-400' : 'text-zinc-600 hover:text-white'}`}>
        Menu
      </button>
    </div>
  );
};

export default UIOverlay;
