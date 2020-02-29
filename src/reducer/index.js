import {
  ADD_CART,
  REMOVE_CART,
  TOTAL,
  LOGIN,
  SIGN_OUT,
  ADMIN_LOGIN,
  REMOVE_ALL_CART
} from "../actions";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  cart: [],
  total: 0,
  user: "",
  token: "",
  isLogin: false,
  isAdmin: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    case REMOVE_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item !== action.payload)
      };
    case REMOVE_ALL_CART:
      return {
        ...state,
        cart: [],
        total: 0
      };
    case TOTAL:
      return {
        ...state,
        total: action.payload
      };
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isLogin: true
      };
    case ADMIN_LOGIN:
      return {
        ...state,
        token: action.payload,
        isAdmin: true
      };
    case SIGN_OUT:
      return {
        ...state,
        user: "",
        isLogin: false,
        isAdmin: false
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);
export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
