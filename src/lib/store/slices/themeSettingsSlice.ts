import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as tailwindColors from 'tailwindcss/colors';
import { getHSLValue } from '@/lib/utils';
import { RootState } from '@/lib/store';

const includeColors = [
  'stone',
  'amber',
  'lime',
  'emerald',
  'sky',
  'indigo',
  'purple',
  'fuchsia',
  'rose',
];

export const themeColors = Object.fromEntries(
  Object.entries(tailwindColors).reduce<[string, string][]>(
    (acc, [color, values]) => {
      if (
        typeof values === 'object' &&
        values['600'] &&
        includeColors.includes(color)
      ) {
        acc.push([color, getHSLValue(values['600'])]);
      }
      return acc;
    },
    []
  )
);

export const themeSettings = {
  fontFamily: {
    inter: 'Inter',
    roboto: 'Roboto',
    montserrat: 'Montserrat',
    poppins: 'Poppins',
    'overpass-mono': 'Overpass Mono',
  },
} as const;

export type ThemeColor = keyof typeof themeColors;
export type FontFamily = keyof typeof themeSettings.fontFamily;
export type ThemeDirection = 'ltr' | 'rtl';
export type ContentLayout = 'full' | 'centered';

interface SettingsState {
  fontFamily: FontFamily;
  themeColor: ThemeColor | 'default';
  layout: 'vertical' | 'horizontal';
  contentLayout: ContentLayout;
  direction: ThemeDirection;
  sidebarLayout: 'default' | 'rtl';
  contentContainer: boolean;
  roundedCorner: number;
}

const initialState: SettingsState = {
  fontFamily: 'inter',
  themeColor: 'purple',
  layout: 'vertical',
  contentLayout: 'centered',
  direction: 'ltr',
  sidebarLayout: 'default',
  contentContainer: false,
  roundedCorner: 0.5,
};

const { name, actions, reducer } = createSlice({
  name: 'themeSettings',
  initialState,
  reducers: {
    setThemeColor: (state, action: PayloadAction<ThemeColor>) => {
      state.themeColor = action.payload;
    },
    setContentLayout: (state, action: PayloadAction<ContentLayout>) => {
      state.contentLayout = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<FontFamily>) => {
      state.fontFamily = action.payload;
    },
    setRoundedCorner: (state, action: PayloadAction<number>) => {
      state.roundedCorner = action.payload;
    },
    setDirection: (state, action: PayloadAction<ThemeDirection>) => {
      state.direction = action.payload;
    },
    setContentContainer: (state, action: PayloadAction<boolean>) => {
      state.contentContainer = action.payload;
    },
    resetTheme: (state) => {
      state.fontFamily = initialState.fontFamily;
      state.themeColor = initialState.themeColor;
      state.layout = initialState.layout;
      state.contentLayout = initialState.contentLayout;
      state.direction = initialState.direction;
      state.sidebarLayout = initialState.sidebarLayout;
      state.contentContainer = initialState.contentContainer;
      state.roundedCorner = initialState.roundedCorner;
    },
  },
});

export default reducer;

export const {
  setThemeColor,
  setContentLayout,
  setFontFamily,
  setRoundedCorner,
  setDirection,
  setContentContainer,
  resetTheme,
} = actions;

export const selectInitialThemeSettings = (state: RootState) =>
  state[name] || initialState;
