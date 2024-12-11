import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/auth/authSlice";
import { apiSlice } from './services/apiSlice';
import infiniteScrollReducer from "./features-slices/infinite-scroll-slice";
import { postApiSlice } from "./services/booking/postApiSlice";
import { likeApiSlice } from "./services/booking/likeApiSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [likeApiSlice.reducerPath]: likeApiSlice.reducer,
  [postApiSlice.reducerPath]: postApiSlice.reducer,
  auth: authReducer,
  infiniteScroll: infiniteScrollReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      likeApiSlice.middleware,
      postApiSlice.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
