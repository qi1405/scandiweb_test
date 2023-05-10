import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import ProductDataService from "../services/ProductServices";

const initialState = [];

export const createProduct = createAsyncThunk(
    "products/create",
    async ({ name, price, type, sku, size, weight, height, width, length }) => {
        const res = await ProductDataService.createProduct ({ name, price, type, sku, size, weight, height, width, length });
        return res.data;
    }
);

export const retrieveProducts = createAsyncThunk(
    "products/retrieve",
    async () => {
        const res = await ProductDataService.getAllProducts();
        return res.data;
    }
);


const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: {
        [createProduct.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [retrieveProducts.fulfilled]: (state, action) => {
            return [...action.payload];
        },
    },
});

const { reducer } = productSlice;
export default reducer;