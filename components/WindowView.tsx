
import React, { useEffect, useState } from 'react';
import { GamePhase, LifeStage } from '../types';

interface Props {
  phase: GamePhase;
  stage: LifeStage;
  onChildLeave: () => void;
  isDenizPresent: boolean;
  shootingStar?: boolean;
  onSkyClick?: () => void;
}

const WindowView: React.FC<Props> = ({ phase, stage, onChildLeave, isDenizPresent, shootingStar, onSkyClick }) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (phase === GamePhase.MORNING) {
      const timer = setTimeout(() => {
        setLeaving(true);
        setTimeout(() => {
          onChildLeave();
        }, 4000);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setLeaving(false);
    }
  }, [phase, onChildLeave]);

  const getDestinationLabel = () => {
    switch(stage) {
      case LifeStage.ELEMENTARY: return "Elementary";
      case LifeStage.MIDDLE_SCHOOL: return "Middle School";
      case LifeStage.HIGH_SCHOOL: return "High School";
      case LifeStage.UNIVERSITY: return "University";
      case LifeStage.JOB: return "Office";
      case LifeStage.MARRIAGE: return "Home";
      case LifeStage.HOSPITAL: return "Hospital";
      case LifeStage.GRANDKIDS_ELEMENTARY: return "Primary (Gen 2)";
      case LifeStage.GRANDKIDS_UNI: return "University (Gen 2)";
      default: return "School";
    }
  };

  const isGrandkids = stage.startsWith('GRANDKIDS');

  return (
    <div className="mb-8 w-full group">
      <label className="text-[10px] uppercase text-slate-600 tracking-[0.4em] block mb-3">Svensk Road</label>
      <div 
        onClick={onSkyClick}
        className="w-full aspect-video bg-black rounded-3xl border-2 border-slate-800 relative overflow-hidden cursor-crosshair"
      >
        
        {/* Sky / Time passing */}
        <div className={`absolute inset-0 transition-colors duration-[5000ms] ${stage.includes('GRANDKIDS') ? 'bg-indigo-950' : 'bg-slate-900'}`}></div>
        
        {/* Shooting Star Egg */}
        {shootingStar && (
          <div className="absolute top-4 left-0 w-2 h-0.5 bg-white shadow-[0_0_10px_white] rotate-[15deg] animate-star pointer-events-none"></div>
        )}

        {/* Road to destination */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-full bg-slate-950 -skew-x-6 border-x border-slate-800/50 opacity-40"></div>

        {/* Departure Animation */}
        {leaving && (
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center animate-out">
              <div className="flex gap-1 items-end">
                <div className={`w-3 h-3 rounded-full bg-indigo-300`}></div>
                {isGrandkids && <div className="w-2 h-2 rounded-full bg-blue-300"></div>}
              </div>
              <div className="w-4 h-6 bg-blue-600 rounded-t-sm"></div>
              <span className="text-[5px] text-white/50 uppercase mt-1">{getDestinationLabel()}</span>
           </div>
        )}

        {/* Arrival / Present State */}
        {(phase === GamePhase.ARRIVAL || phase === GamePhase.INTERACTION) && (
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 items-end">
              <div className="flex flex-col items-center transition-all duration-700">
                 <div className="w-3 h-3 rounded-full bg-indigo-300 mb-0.5"></div>
                 <div className={`w-4 bg-blue-600 rounded-t-sm transition-all duration-700 ${stage === LifeStage.UNIVERSITY || stage === LifeStage.JOB ? 'h-10' : 'h-6'}`}></div>
              </div>
              {isDenizPresent && (
                <div className="flex flex-col items-center animate-fade-in transition-all duration-700">
                   <div className="w-3 h-3 rounded-full bg-orange-200 mb-0.5"></div>
                   <div className={`w-4 bg-orange-600 rounded-t-sm transition-all duration-700 ${stage === LifeStage.UNIVERSITY || stage === LifeStage.JOB ? 'h-10' : 'h-6'}`}></div>
                </div>
              )}
              {stage === LifeStage.MARRIAGE && (
                <div className="flex flex-col items-center animate-fade-in">
                   <div className="w-3 h-3 rounded-full bg-pink-300 mb-0.5"></div>
                   <div className="w-4 bg-pink-500 h-8 rounded-t-sm"></div>
                </div>
              )}
           </div>
        )}

        {stage === LifeStage.HOSPITAL && (
            <div className="absolute top-4 right-4 text-red-500 text-xl animate-pulse">✚</div>
        )}
      </div>
      <style>{`
        @keyframes window-out {
          from { transform: translate(-50%, 0) scale(1); opacity: 1; }
          to { transform: translate(-50%, -120px) scale(0); opacity: 0; }
        }
        @keyframes star-move {
          0% { left: 0; top: 10%; opacity: 1; width: 0; }
          50% { width: 50px; opacity: 1; }
          100% { left: 100%; top: 40%; opacity: 0; width: 0; }
        }
        .animate-out {
          animation: window-out 4s forwards linear;
        }
        .animate-star {
          animation: star-move 1.5s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default WindowView;
