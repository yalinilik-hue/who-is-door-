
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GamePhase, Activity, GameState, LifeStage, Language } from './types';
import LivingRoom from './components/LivingRoom';
import UIOverlay from './components/UIOverlay';
import WindowView from './components/WindowView';
import Menu from './components/Menu';
import MemoryShop from './components/MemoryShop';
import SecretShop from './components/SecretShop';
import WatchChild from './components/WatchChild';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: GamePhase.MENU,
    stage: LifeStage.ELEMENTARY,
    day: 1,
    language: 'TR',
    isDenizPresent: false,
    ironingProgress: 0,
    interactionDone: false,
    message: "",
    parentAge: 30,
    childWealth: 0,
    isHouseAbandoned: false,
    hasDog: false,
    isDogSilenced: false
  });

  const [isSwedishTheme, setIsSwedishTheme] = useState(false);
  const [shootingStar, setShootingStar] = useState(false);
  const keysPressed = useRef<Set<string>>(new Set());

  const translations = {
    TR: {
      morning: "Sabah oldu, çocuk okula gidiyor. Onu uyandırma.",
      waiting: "Çocuk okulda. İşlerini yap ve bekle.",
      arrivalSolo: "Çocuk eve geldi.",
      arrivalDeniz: "Çocuk ve Deniz birlikte geldiler!",
      pcPlaying: "Çocuk bilgisayarda oyun oynuyor.",
      vrPlaying: "Çocuk ve Deniz VR oynuyorlar.",
      adventure: "Maceraya çıktılar!",
      graduation: "Çocuk üniversiteden mezun oldu. Artık senin vaktin doldu...",
      legacyStart: "Artık bir gözlemcisin. Çocuğunu izliyorsun.",
      job: "Çocuk işe girdi, para kazandı.",
      marriage: "Çocuk evlendi. Hayat devam ediyor.",
      hospital: "Torun doğuyor! Hastaneye gidildi.",
      grandkids: "Torunlar okula gidiyor. Döngü devam ediyor.",
      ironingDone: "Ütü bitti, gelmelerini bekle."
    },
    EN: {
      morning: "Morning. Child is going to school. Don't wake them.",
      waiting: "Child is at school. Do your chores.",
      arrivalSolo: "Child came home.",
      arrivalDeniz: "Child and Deniz arrived!",
      pcPlaying: "Child is playing PC games.",
      vrPlaying: "Child and Deniz are in VR.",
      adventure: "They went on an adventure!",
      graduation: "Child graduated. Your time is up...",
      legacyStart: "You are an observer now. Watching your child.",
      job: "Child went to work, earned money.",
      marriage: "Child got married. Life goes on.",
      hospital: "A grandchild is born! At the hospital.",
      grandkids: "Grandkids are going to school. The cycle continues.",
      ironingDone: "Ironing finished, wait for them."
    }
  };

  const t = translations[gameState.language];

  // Cheat Codes & Global Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed.current.add(key);

      // Global ESC logic
      if (e.key === 'Escape') {
        setGameState(prev => {
          if (prev.phase === GamePhase.SHOP || prev.phase === GamePhase.SECRET_SHOP || prev.phase === GamePhase.WATCH_CHILD) {
            return { ...prev, phase: GamePhase.MENU };
          }
          if (prev.phase !== GamePhase.MENU) {
            return { ...prev, phase: GamePhase.MENU };
          }
          return prev;
        });
      }

      // Cheat 1: B + H + 1 (Parent Age Jump)
      if (keysPressed.current.has('b') && keysPressed.current.has('h') && keysPressed.current.has('1')) {
        setGameState(prev => ({ ...prev, parentAge: prev.parentAge + 10 }));
      }

      // Cheat 2: M + Shift (Secret Shop)
      if (keysPressed.current.has('m') && e.shiftKey) {
        setGameState(prev => ({ ...prev, phase: GamePhase.SECRET_SHOP }));
      }

      // Cheat 3: T + Ü (Child & Deniz Age Jump)
      if (keysPressed.current.has('t') && keysPressed.current.has('ü')) {
        setGameState(prev => {
          const stages = Object.values(LifeStage);
          const currentIndex = stages.indexOf(prev.stage);
          const nextIndex = (currentIndex + 1) % stages.length;
          return { ...prev, stage: stages[nextIndex] };
        });
      }

      // Cheat 4: Ğ + 9 (Parent Age Decrease)
      if (keysPressed.current.has('ğ') && keysPressed.current.has('9')) {
        setGameState(prev => ({ ...prev, parentAge: Math.max(0, prev.parentAge - 10) }));
      }

      // Dog Silence: S
      if (key === 's') {
        setGameState(prev => ({ ...prev, isDogSilenced: !prev.isDogSilenced }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const startNewGame = (lang: Language) => {
    setGameState({
      phase: GamePhase.MORNING,
      stage: LifeStage.ELEMENTARY,
      day: 1,
      language: lang,
      isDenizPresent: false,
      ironingProgress: 0,
      interactionDone: false,
      parentAge: 30,
      childWealth: 0,
      isHouseAbandoned: false,
      hasDog: false,
      isDogSilenced: false,
      message: translations[lang].morning
    });
  };

  const handleChildDeparture = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: GamePhase.WAITING,
      message: t.waiting
    }));
  }, [t]);

  const triggerArrival = useCallback(() => {
    const withDeniz = Math.random() > 0.4;
    setGameState(prev => ({
      ...prev,
      phase: GamePhase.ARRIVAL,
      isDenizPresent: withDeniz,
      message: withDeniz ? t.arrivalDeniz : t.arrivalSolo
    }));
  }, [t]);

  useEffect(() => {
    if (gameState.phase === GamePhase.WAITING && gameState.ironingProgress >= 100) {
      const timer = setTimeout(triggerArrival, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState.phase, gameState.ironingProgress, triggerArrival]);

  const handleAction = (action: Activity) => {
    setGameState(prev => {
      let newMessage = prev.message;
      let newInteraction = prev.interactionDone;
      let newWealth = prev.childWealth;

      if (action === Activity.IRONING) {
        const progress = Math.min(prev.ironingProgress + 34, 100);
        return { ...prev, ironingProgress: progress, message: progress >= 100 ? t.ironingDone : prev.message };
      }
      if (action === Activity.WORKING) {
        newWealth += 1000;
        newInteraction = true;
        newMessage = t.job;
      }
      if (action === Activity.PLAYING_PC || action === Activity.PLAYING_VR || action === Activity.ADVENTURE) {
        newInteraction = true;
        newMessage = action === Activity.PLAYING_PC ? t.pcPlaying : action === Activity.PLAYING_VR ? t.vrPlaying : t.adventure;
      }

      return { ...prev, message: newMessage, interactionDone: newInteraction, childWealth: newWealth };
    });
  };

  const nextDay = () => {
    setGameState(prev => {
      const nextDay = prev.day + 1;
      let nextStage = prev.stage;
      let nextPhase = GamePhase.MORNING;
      let nextAge = prev.parentAge + 5;
      let houseAbandoned = prev.isHouseAbandoned;

      if (nextDay === 4) nextStage = LifeStage.MIDDLE_SCHOOL;
      else if (nextDay === 8) nextStage = LifeStage.HIGH_SCHOOL;
      else if (nextDay === 12) nextStage = LifeStage.UNIVERSITY;
      else if (nextDay === 16) {
        return { ...prev, phase: GamePhase.GRADUATION, message: t.graduation, parentAge: nextAge };
      }
      else if (nextDay === 17) {
        nextStage = LifeStage.JOB;
        nextPhase = GamePhase.LEGACY;
        houseAbandoned = true;
      }
      else if (nextDay === 19) nextStage = LifeStage.MARRIAGE;
      else if (nextDay === 21) nextStage = LifeStage.HOSPITAL;
      else if (nextDay === 23) nextStage = LifeStage.GRANDKIDS_ELEMENTARY;
      else if (nextDay === 26) nextStage = LifeStage.GRANDKIDS_MIDDLE;
      else if (nextDay === 29) nextStage = LifeStage.GRANDKIDS_HIGH;
      else if (nextDay === 32) nextStage = LifeStage.GRANDKIDS_UNI;

      if (nextPhase === GamePhase.LEGACY || houseAbandoned) {
        return {
          ...prev,
          day: nextDay,
          stage: nextStage,
          phase: GamePhase.LEGACY,
          isHouseAbandoned: true,
          message: t.legacyStart,
          parentAge: nextAge,
          interactionDone: true // Automatically allow next day in legacy mode
        };
      }

      return {
        ...prev,
        phase: GamePhase.MORNING,
        day: nextDay,
        parentAge: nextAge,
        stage: nextStage,
        isDenizPresent: false,
        ironingProgress: 0,
        interactionDone: false,
        message: t.morning
      };
    });
  };

  const triggerShootingStar = () => {
    setShootingStar(true);
    setTimeout(() => setShootingStar(false), 2000);
  };

  const openShop = () => {
    setGameState(prev => ({ ...prev, phase: GamePhase.SHOP }));
  };

  const openWatchChild = () => {
    setGameState(prev => ({ ...prev, phase: GamePhase.WATCH_CHILD }));
  };

  if (gameState.phase === GamePhase.MENU) {
    return (
      <Menu 
        onStart={startNewGame} 
        isSwedish={isSwedishTheme} 
        onToggleTheme={() => setIsSwedishTheme(!isSwedishTheme)} 
        showShop={gameState.parentAge >= 100}
        onOpenShop={openShop}
        onOpenWatchChild={openWatchChild}
        language={gameState.language}
      />
    );
  }

  if (gameState.phase === GamePhase.SHOP) {
    return (
      <MemoryShop 
        language={gameState.language} 
        onBack={() => setGameState(p => ({ ...p, phase: GamePhase.MENU }))} 
      />
    );
  }

  if (gameState.phase === GamePhase.SECRET_SHOP) {
    return (
      <SecretShop 
        language={gameState.language} 
        onBack={() => setGameState(p => ({ ...p, phase: GamePhase.MORNING }))}
        onBuyDog={() => setGameState(p => ({ ...p, hasDog: true }))}
      />
    );
  }

  if (gameState.phase === GamePhase.WATCH_CHILD || gameState.phase === GamePhase.LEGACY) {
    return (
      <WatchChild
        state={gameState}
        onBack={() => setGameState(p => ({ ...p, phase: GamePhase.MENU }))}
        isLegacy={gameState.phase === GamePhase.LEGACY}
        onNextDay={nextDay}
      />
    );
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden select-none text-slate-100 transition-colors duration-1000 ${isSwedishTheme ? 'bg-blue-900' : 'bg-slate-950'}`}>
      <div className="flex h-full flex-col md:flex-row">
        <div className="flex-1 relative">
          <LivingRoom 
            state={gameState} 
            onAction={handleAction}
            isSwedish={isSwedishTheme}
          />
        </div>
        
        <div className={`w-full md:w-80 border-l flex flex-col p-6 z-10 shadow-2xl transition-colors duration-1000 ${isSwedishTheme ? 'bg-blue-800/90 border-yellow-500/30' : 'bg-slate-900/95 border-slate-800'}`}>
          <WindowView 
            phase={gameState.phase} 
            stage={gameState.stage}
            onChildLeave={handleChildDeparture} 
            isDenizPresent={gameState.isDenizPresent}
            shootingStar={shootingStar}
            onSkyClick={triggerShootingStar}
          />
          
          <UIOverlay 
            state={gameState} 
            onAction={handleAction} 
            onNextDay={nextDay}
            onOpenMenu={() => setGameState(p => ({...p, phase: GamePhase.MENU}))}
            isSwedish={isSwedishTheme}
          />
        </div>
      </div>
      
      <div className={`absolute bottom-0 left-0 right-0 p-8 text-center border-t transition-colors duration-1000 ${isSwedishTheme ? 'bg-yellow-500/10 backdrop-blur-xl border-yellow-500/20' : 'bg-black/90 backdrop-blur-xl border-slate-800'}`}>
        <p className={`${isSwedishTheme ? 'text-yellow-400' : 'text-indigo-200'} text-2xl font-light italic tracking-wide`}>"{gameState.message}"</p>
      </div>
    </div>
  );
};

export default App;
