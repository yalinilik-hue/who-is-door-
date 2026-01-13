
export enum GamePhase {
  MENU = 'MENU',
  MORNING = 'MORNING',
  WAITING = 'WAITING',
  ARRIVAL = 'ARRIVAL',
  INTERACTION = 'INTERACTION',
  NIGHT = 'NIGHT',
  GRADUATION = 'GRADUATION',
  LEGACY = 'LEGACY', // Post-death phase
  SHOP = 'SHOP',
  SECRET_SHOP = 'SECRET_SHOP',
  WATCH_CHILD = 'WATCH_CHILD'
}

export enum LifeStage {
  ELEMENTARY = 'ELEMENTARY',
  MIDDLE_SCHOOL = 'MIDDLE_SCHOOL',
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  UNIVERSITY = 'UNIVERSITY',
  JOB = 'JOB',
  MARRIAGE = 'MARRIAGE',
  HOSPITAL = 'HOSPITAL',
  GRANDKIDS_ELEMENTARY = 'GRANDKIDS_ELEMENTARY',
  GRANDKIDS_MIDDLE = 'GRANDKIDS_MIDDLE',
  GRANDKIDS_HIGH = 'GRANDKIDS_HIGH',
  GRANDKIDS_UNI = 'GRANDKIDS_UNI'
}

export enum Activity {
  IDLE = 'IDLE',
  IRONING = 'IRONING',
  PLAYING_PC = 'PLAYING_PC',
  PLAYING_VR = 'PLAYING_VR',
  ADVENTURE = 'ADVENTURE',
  WORKING = 'WORKING'
}

export type Language = 'TR' | 'EN';

export interface GameState {
  phase: GamePhase;
  stage: LifeStage;
  day: number;
  language: Language;
  isDenizPresent: boolean;
  ironingProgress: number;
  interactionDone: boolean;
  message: string;
  parentAge: number;
  childWealth: number;
  isHouseAbandoned: boolean;
  hasDog: boolean;
  isDogSilenced: boolean;
}
