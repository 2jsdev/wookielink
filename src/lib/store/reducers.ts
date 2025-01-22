import { combineReducers } from '@reduxjs/toolkit';
import { appApi } from '@/lib/api/app';
import links from '@/lib/store/slices/linksSlice';
import user from '@/lib/store/slices/userSlice';
import themeSettings from '@/lib/store/slices/themeSettingsSlice';

const rootReducer = combineReducers({
  links,
  user,
  themeSettings,
  [appApi.reducerPath]: appApi.reducer,
});

export default rootReducer;
