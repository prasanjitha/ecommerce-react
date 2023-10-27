import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({

    name: 'product',
    initialState: {
        products: [],
        searchProducts: [],
        allCategories: [],
        favorite: [],
        categoryProducts: [],

    },
    reducers: {
        replacrCart(state, action) {
            state.products = action.payload.items;
        },
        addSearchProducts(state, action) {
            state.searchProducts = action.payload.items;
        },
        addCategoryData(state, action) {
            state.categoryProducts = action.payload.items;
        },
        addCatgories(state: any, action) {
            const cateories = action.payload;
            state.allCategories = cateories;
        },
        addFavorite(state: any, action) {

            const faoriteProduct = action.payload;
            if (state.favorite.length === 0) {
                state.favorite.push(faoriteProduct);
            }

            const existingItem = state.favorite.find((product: any) => product.id === faoriteProduct.id);

            if (!existingItem) {
                state.favorite.push(faoriteProduct);
            }
        },
        removeFavorite(state: any, action) {

            const favProduct = action.payload;
            state.favorite = state.favorite.filter((product: any) => product.id !== favProduct.id);
        }
    }
});


export const productActions = productSlice.actions;
export default productSlice;