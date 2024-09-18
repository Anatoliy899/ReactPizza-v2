import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { list } from '../../pages/Home';
import { RootState } from '../store';

type FetchPizzasArgs = {
  typeOfSort: string;
  category: string;
  search: string;
  currentPage: number;
  sortType: number;
};

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface pizzaSliceState {
  items: Pizza[];
  status: Status;
  error: string;
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArgs, thunkAPI) => {
    try {
      const { typeOfSort, category, search, currentPage, sortType } = params;

      const response = await axios.get<Pizza[]>(
        `https://666826aff53957909ff6cc5c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${list[
          sortType
        ].sort.replace('-', '')}&order=${typeOfSort}${search}`
      );

      // if (!response.statusText === 'OK') {
      //   throw new Error('Server Error!!!!');
      // }

      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState: pizzaSliceState = {
  items: [],
  status: Status.LOADING,
  error: '',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = Status.ERROR;

        // @ts-ignore
        state.error = action.payload;
        state.items = [];
      });
  },

  // extraReducers: {
  //   [fetchPizzas.pending]: (state, action) => {
  //     state.status = 'loading';
  //     console.log(state, 'Отправка');
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     console.log(state, 'Все OK!');
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     console.log('Ошибка');
  //   },
  // },
});

// Action creators are generated for each case reducer function 2

export const pizzaSliceSelector = (state: RootState) => state.pizzaSlice;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
