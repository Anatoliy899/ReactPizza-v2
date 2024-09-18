import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sortType: number;
  currentPage: number;
  sort: string;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sortType: 0,
  currentPage: 1,
  sort: 'rating',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },

    setSortType(state, action: PayloadAction<number>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = Number(action.payload.sortType);
    },
  },
});

// Action creators are generated for each case reducer function
export const filterSliceSelector = (state: RootState) =>
  state.filterSliceReducer;
export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
