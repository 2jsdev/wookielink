import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { themes } from '@/data/themes';
import type {
  BackgroundStyleType,
  BackgroundType,
  ButtonType,
  FontFamily,
  Theme,
} from '@/interfaces/theme';

interface ThemeStore {
  theme?: Theme;
  setTheme: (theme: Theme) => void;
  customTheme: Theme;
  // Background
  setBackgroundType: (type: BackgroundType) => void;

  setBackgroundStyle: (style: BackgroundStyleType) => void;
  removeBackgroundStyle: () => void;

  setBackgroundColor: (color: string) => void;
  setBackgroundImageUrl: (imageUrl: string) => void;
  setBackgroundVideoUrl: (videoUrl: string) => void;

  setButtonType: (type: ButtonType) => void;
  setButtonColor: (color: string) => void;
  setButtonTextColor: (color: string) => void;
  setButtonShadowColor: (color: string) => void;

  setFontFamily: (fontFamily: FontFamily) => void;
  setFontColor: (color: string) => void;
}

const themeStore: StateCreator<ThemeStore> = (set) => ({
  theme: themes[0],
  setTheme: (theme) => set({ theme }),
  customTheme: themes[0],

  setBackgroundType: (type) => {
    set((state) => ({
      customTheme: {
        ...state.customTheme,
        background: {
          ...state.customTheme?.background,
          type,
        },
      },
    }));
  },
  setBackgroundStyle: (style) => {
    set((state) => ({
      customTheme: {
        ...state.customTheme,
        background: {
          ...state.customTheme?.background,
          style,
        },
      },
    }));
  },
  removeBackgroundStyle: () => {
    set((state) => ({
      customTheme: {
        ...state.customTheme,
        background: {
          ...state.customTheme?.background,
          style: undefined,
        },
      },
    }));
  },
  setBackgroundColor: (color) => {
    set((state) => ({
      customTheme: {
        ...state.customTheme,
        background: {
          ...state.customTheme?.background,
          color,
        },
      },
    }));
  },
  setBackgroundImageUrl: (imageUrl) => {
    set((state) => ({
      customTheme: {
        ...state.customTheme,
        background: {
          ...state.customTheme?.background,
          imageUrl,
        },
      },
    }));
  },
  setBackgroundVideoUrl: (videoUrl) => {
    set((state) => ({
      customTheme: {
        ...state.customTheme,
        background: {
          ...state.customTheme?.background,
          videoUrl,
        },
      },
    }));
  },

  setButtonType: (type) => {
    set((state) => ({
      customTheme: {
        ...state.customTheme,
        buttonStyle: {
          ...state.customTheme?.buttonStyle,
          type,
        },
      },
    }));
  },
  setButtonColor: (backgroundColor) => {
    set((state) => ({
      customTheme: {
        ...state.customTheme,
        buttonStyle: {
          ...state.customTheme?.buttonStyle,
          backgroundColor,
        },
      },
    }));
  },
  setButtonTextColor: (textColor) => {
    set((state) => ({
      customTheme: {
        ...state.customTheme,
        buttonStyle: {
          ...state.customTheme?.buttonStyle,
          textColor,
        },
      },
    }));
  },
  setButtonShadowColor: (shadowColor) => {
    set((state) => ({
      customTheme: {
        ...state.customTheme,
        buttonStyle: {
          ...state.customTheme?.buttonStyle,
          shadowColor,
        },
      },
    }));
  },

  setFontFamily: (fontFamily) => {
    set((state) => ({
      customTheme: {
        ...state.customTheme,
        fontStyle: {
          ...state.customTheme?.fontStyle,
          fontFamily,
        },
      },
    }));
  },
  setFontColor: (color) => {
    set((state) => ({
      customTheme: {
        ...state.customTheme,
        fontStyle: {
          ...state.customTheme?.fontStyle,
          color,
        },
      },
    }));
  },
});

const useThemeStore = create<ThemeStore>()(
  persist(themeStore, {
    name: 'theme-storage',
  })
);

export default useThemeStore;
