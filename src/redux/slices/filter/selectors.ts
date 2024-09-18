import { RootState } from '../../store';

export const filterSliceSelector = (state: RootState) =>
  state.filterSliceReducer;
