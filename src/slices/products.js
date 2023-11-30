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

export const deleteProducts = createAsyncThunk(
    "products/delete",
    async (productIds) => {
        try {
            const res = await ProductDataService.deleteProductsByIds(productIds);
            // success message
            return { success: res.data.success };
        } catch (error) {
            // error message
            return { error: error.message };
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Define other reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(retrieveProducts.fulfilled, (state, action) => {
                return action.payload.data;
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                // Assuming your API returns a success message or updated product list
                console.log("Products deleted successfully:", action.payload);
                // Optionally, refresh the product list or show a success message
                return action.payload.data;
            })
            .addCase(deleteProducts.rejected, (state, action) => {
                // Handle the rejected case, e.g., log the error
                console.error("Error deleting products:", action.error.message);
            });
    },
});

const { reducer } = productSlice;
export default reducer;