export const ADD_CART = "ADD_CART";
export const REMOVE_CART = "CART_REMOVE";
export const REMOVE_ALL_CART = "REMOVE_ALL_CART";
export const TOTAL = "TOTAL";
export const LOGIN = "LOGIN";
export const SIGN_OUT = "SIGN_OUT";
export const ADMIN_LOGIN = "ADMIN_LOGIN";

export const addCart = payload => ({
  type: ADD_CART,
  payload
});

export const removeCart = payload => ({
  type: REMOVE_CART,
  payload
});

export const removeAllCart = payload => ({
  type: REMOVE_ALL_CART,
  payload
});

export const totalCart = payload => ({
  type: TOTAL,
  payload
});

export const loginUser = payload => ({
  type: LOGIN,
  payload
});

export const adminLogin = payload => ({
  type: ADMIN_LOGIN,
  payload
});

export const signOut = payload => ({
  type: SIGN_OUT,
  payload
});
