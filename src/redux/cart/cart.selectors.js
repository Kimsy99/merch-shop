import { createSelector } from "reselect";

/*
2 types of selector
1. Input selector -> doesnt use create selector
2. Output selector -> use input and create selector to build itself
*/

const selectCart = (state) => state.cart; //input selector -> return a piece of state

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0)
);
