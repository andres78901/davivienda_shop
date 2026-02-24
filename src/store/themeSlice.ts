/**
 * Slice Redux del tema de visualización.
 * themeId se persiste en AsyncStorage vía themeStorage.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ThemeId } from '../theme/colors';
import { getStoredThemeId, setStoredThemeId } from './themeStorage';

export const loadThemeThunk = createAsyncThunk(
  'theme/load',
  async (): Promise<ThemeId> => {
    const stored = await getStoredThemeId();
    return stored ?? 'default';
  }
);

export interface ThemeState {
  themeId: ThemeId;
}

const initialState: ThemeState = {
  themeId: 'default',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: { payload: ThemeId }) => {
      state.themeId = action.payload;
      void setStoredThemeId(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadThemeThunk.fulfilled, (state, action) => {
      state.themeId = action.payload;
    });
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;

export const selectThemeId = (state: { theme: ThemeState }) => state.theme.themeId;
