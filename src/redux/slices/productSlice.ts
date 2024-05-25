import {createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getProducts } from '../../services/api';

export type ProductState = {
      products: Product[];
};

const initialState: ProductState = {
      products: [],
};

export const getProductsData = createAsyncThunk(
  'auth/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(" error occured");
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsData.fulfilled, (state, action) => {
          state.products= action.payload
      })
    }
});


const selectSelf = (state: RootState) => state.product;

export const selectPublishedProducts= createSelector(selectSelf, (productStore) => {
  return productStore.products.filter(product => product.isPublish)
});

export const productReducer = productSlice.reducer;
