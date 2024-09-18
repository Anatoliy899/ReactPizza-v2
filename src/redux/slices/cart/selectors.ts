import { RootState } from '../../store';

export const cartSelector = (state: RootState) => state.cartSliceReducer;
export const cartItemSelectorById = (id: string) => (state: RootState) =>
  state.cartSliceReducer.items.find((obj) => obj.id === id);
