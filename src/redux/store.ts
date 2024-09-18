import { configureStore } from '@reduxjs/toolkit';

import filterSliceReducer from './slices/filterSlice';
import cartSliceReducer from './slices/cartSlice';
import pizzaSlice from './slices/pizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filterSliceReducer,
    cartSliceReducer,
    pizzaSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
