import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

export const CURRENT_ACTION = {
  confirmation: 'confirmation',
  layout: 'layout',
  thumbnail: 'thumbnail',
  prioritize: 'prioritize',
  analytics: 'analytics',

  permanentElimination: 'permanentElimination',
  restoreLink: 'restoreLink',
} as const;

export type CurrentAction =
  | (typeof CURRENT_ACTION)[keyof typeof CURRENT_ACTION]
  | null;

interface UIStore {
  viewArchived: boolean;
  setViewArchived: (value: boolean) => void;
  currentLinkId: string | null;
  setCurrentLinkId: (id: string | null) => void;
  currentAction: CurrentAction;
  setCurrentAction: (action: CurrentAction) => void;
  isAnyCardOpen: () => boolean;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
  triggerError: (msg: string) => void;
  isBlurred: boolean;
  highlightedLink: string | null;
  setHighlightedLink: (linkId: string | null) => void;
}

const uiStore: StateCreator<UIStore> = (set, get) => ({
  viewArchived: false,
  setViewArchived: (value: boolean) => set({ viewArchived: value }),
  currentLinkId: null,
  setCurrentLinkId: (id: string | null) => set({ currentLinkId: id }),
  currentAction: null,
  setCurrentAction: (action: CurrentAction) => set({ currentAction: action }),
  isAnyCardOpen: () => {
    const { currentLinkId, currentAction } = get();
    return currentLinkId !== null && currentAction !== null;
  },
  errorMessage: null,
  setErrorMessage: (msg: string | null) => set({ errorMessage: msg }),
  triggerError: (msg: string) => {
    set({ errorMessage: msg });
    setTimeout(() => {
      set({ errorMessage: null });
    }, 3000);
  },
  isBlurred: false,
  highlightedLink: null,
  setHighlightedLink: (linkId: string | null) => {
    set({ highlightedLink: linkId, isBlurred: !!linkId });

    if (linkId) {
      setTimeout(() => {
        const element = document.getElementById(`link-${linkId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);

      setTimeout(() => {
        set({ isBlurred: false });
      }, 2000);
    }
  },
});

const useUiStore = create<UIStore>()(
  persist(uiStore, {
    name: 'ui-storage',
  })
);

export default useUiStore;
