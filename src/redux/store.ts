import { configureStore } from '@reduxjs/toolkit';

import filterSliceReducer from '../redux/slices/filter/slice';
import cartSliceReducer from '../redux/slices/cart/slice';
import pizzaSlice from '../redux/slices/pizza/slice';
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
