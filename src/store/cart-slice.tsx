import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
        changed: false,
    },
    reducers: {
        changeProductQuantity(state: any, action) {

            const changeItem = action.payload;
            const findItem = state.items.find((product: any) => product.item.id === changeItem.id);
            if (findItem) {
                findItem.quantity = changeItem.quantity;
                findItem.itemPrice = changeItem.quantity * findItem.item.price;
            }
            let calPrice = 0;

            for (const item of state.items) {
                calPrice = calPrice + item.itemPrice;
            }
            state.totalPrice = calPrice;

        },
        replacrCart(state, action) {

            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        deleteItem(state: any, action) {
            console.log(state.items.length);

            const productId = action.payload;
            console.log(productId);
            state.items = state.items.filter((product: any) => product.item.id !== productId);
            state.totalQuantity--;
            let calPrice = 0;

            for (const item of state.items) {
                calPrice = calPrice + item.itemPrice;
            }
            state.totalPrice = calPrice;


        },
        addItemToCart(state: any, action) {

            const newItem = action.payload;
            const existingItem = state.items.find((product: any) => product.item.id === newItem.item.id);
            state.changed = true;
            if (!existingItem) {
                state.items.push(newItem);
                state.totalQuantity++;
            } else {
                existingItem.item.quantity = newItem.quantity;
                existingItem.itemPrice = newItem.itemPrice;
            }

            let calPrice = 0;

            for (const item of state.items) {
                calPrice = calPrice + item.itemPrice;
            }
            state.totalPrice = calPrice;
            console.log('Total price: ', state.totalPrice);
        },

        removeItemFromCart(state: any, action) {

            const id = action.payload;
            const existingItem = state.items.find((product: any) => product.item.id === id);
            console.log(existingItem.quantity);
            state.totalQuantity--;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter((product: any) => product.item.id !== id);
            } else {

                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }


        }
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice;