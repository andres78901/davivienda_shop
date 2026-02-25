/**
 * Slice Redux del idioma de la app (español / inglés).
 * localeId se persiste en AsyncStorage vía localeStorage.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { LocaleId } from './localeStorage';
import { getStoredLocale, setStoredLocale } from './localeStorage';

export const loadLocaleThunk = createAsyncThunk(
  'locale/load',
  async (): Promise<LocaleId> => {
    const stored = await getStoredLocale();
    return stored ?? 'es';
  }
);

export interface LocaleState {
  localeId: LocaleId;
}

const initialState: LocaleState = {
  localeId: 'es',
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action: { payload: LocaleId }) => {
      state.localeId = action.payload;
      void setStoredLocale(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadLocaleThunk.fulfilled, (state, action) => {
      state.localeId = action.payload;
    });
  },
});

export const { setLocale } = localeSlice.actions;
export const localeReducer = localeSlice.reducer;

export const selectLocaleId = (state: { locale: LocaleState }) =>
  state.locale.localeId;
