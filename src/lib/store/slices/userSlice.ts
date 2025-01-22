import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { usersApi } from '@/lib/api/userApi';
import { User } from '@/lib/api/userApi';
import { RootState } from '..';

interface UserState {
  data: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  isLoading: false,
  error: null,
};

const { name, actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getUserProfile.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      }
    );

    builder.addMatcher(
      usersApi.endpoints.getUserProfile.matchPending,
      (state) => {
        state.isLoading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      usersApi.endpoints.getUserProfile.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch user profile';
      }
    );

    builder.addMatcher(
      usersApi.endpoints.updateUserProfile.matchFulfilled,
      (state, action) => {
        state.data = { ...state.data, ...action.payload };
        state.error = null;
      }
    );
  },
});

export default reducer;

export const { clearUser, setUser } = actions;

const sliceSelector = (state: RootState) => state[name] || initialState;

export const selectUser = createSelector(sliceSelector, (state) => state.data);

export const selectUserLoading = createSelector(
  sliceSelector,
  (state) => state.isLoading
);

export const selectUserError = createSelector(
  sliceSelector,
  (state) => state.error
);
