export const addItemToCart = (cartItem, cartItemToAdd) => {
  const existingCartItem = cartItem.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItem.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItem, { ...cartItemToAdd, quantity: 1 }];
};
//if not last item them -1 only, else if last item then remove the whole thing
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  //if last then remove it
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (item) => item.id !== cartItemToRemove.id //remain those that are not we wanna remove
    );
  }
  //if not last then -1 from quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
