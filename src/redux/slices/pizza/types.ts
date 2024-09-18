export type FetchPizzasArgs = {
  typeOfSort: string;
  category: string;
  search: string;
  currentPage: number;
  sortType: number;
};

export type Pizza = {
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

export interface pizzaSliceState {
  items: Pizza[];
  status: Status;
  error: string;
}
