import {createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { deleteProduct,getProductById, getProducts } from '../../services/api';

export type ProductState = {
      products: Product[];
      currentProduct: Product
};

const initialState: ProductState = {
      products: [],
      currentProduct: {} as Product
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
export const getProductByIdData = createAsyncThunk(
  'auth/getProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getProductById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue("An error occurred");
    }
  }
);

export const deleteProductData = createAsyncThunk(
  'auth/deleteProductData',
  async (id: string, { rejectWithValue }) => {
    try {
      const pro = await deleteProduct(id);
      return pro.data;
      
    } catch (error) {
      return rejectWithValue("An error occurred");
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
      .addCase(getProductByIdData.fulfilled, (state, action)=>{
          state.currentProduct=action.payload
      })
      .addCase(deleteProductData.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id!== action.payload.id)
      })
    }
});


const selectSelf = (state: RootState) => state.product;





export const selectPublishedProducts= createSelector(selectSelf, (productStore) => {
  return productStore.products.filter(product => product.isPublish)
});
export const selectAllProducts= createSelector(selectSelf, (productStore) => {
  return productStore.products
});

export const getProductIdSelector= createSelector(selectSelf, (productStore) => {
  return productStore.currentProduct
});


export const productReducer = productSlice.reducer;
