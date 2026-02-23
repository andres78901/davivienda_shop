/**
 * Slice Redux para productos: lista desde DummyJSON vía capa global de servicios (serviceCalls).
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../types/product';
import { products as productsService, ApiError } from './serviceCalls';

export const fetchProductsThunk = createAsyncThunk(
  'products/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await productsService.fetchProducts();
      return data.products;
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'No se pudo cargar la lista de productos';
      return rejectWithValue(message);
    }
  }
);

/** Busca productos por término (DummyJSON /products/search?q=...). */
export const searchProductsThunk = createAsyncThunk(
  'products/search',
  async (q: string, { rejectWithValue }) => {
    try {
      const data = await productsService.searchProducts(q);
      return data.products;
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'No se pudo buscar productos';
      return rejectWithValue(message);
    }
  }
);

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'No se pudo cargar la lista de productos';
      })
      .addCase(searchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(searchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'No se pudo buscar productos';
      });
  },
});

export const { clearProductsError } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: { products: ProductsState }) => state.products.items;
export const selectProductsLoading = (state: { products: ProductsState }) =>
  state.products.loading;
export const selectProductsError = (state: { products: ProductsState }) =>
  state.products.error;
