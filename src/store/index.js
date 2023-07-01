import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import { stockReducer } from "./stock/stockSlice";
import { uiReducer } from "./uiSlice";

const store = configureStore({reducer:{auth: authReducer, ui: uiReducer, stock: stockReducer}});

export default store 