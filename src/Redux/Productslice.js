import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {url} from "./api.js";
export const productFetch = createAsyncThunk(
  "products/productFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(productFetch.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export default productsSlice.reducer;
