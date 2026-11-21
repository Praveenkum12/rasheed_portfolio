import { useSyncExternalStore } from 'react';

type State = { loaded: boolean; sceneReady: boolean; progress: number; menuOpen: boolean; cursor: '' | 'hover' | 'view' };
let state: State = { loaded: false, sceneReady: false, progress: 0, menuOpen: false, cursor: '' };
const subs = new Set<() => void>();

export const store = {
  get: () => state,
  set(patch: Partial<State>) { state = { ...state, ...patch }; subs.forEach((f) => f()); },
  subscribe(f: () => void) { subs.add(f); return () => subs.delete(f); },
};

export function useStore<K extends keyof State>(key: K): State[K] {
  return useSyncExternalStore(store.subscribe, () => state[key], () => state[key]);
}
