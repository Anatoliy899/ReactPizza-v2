import React from 'react';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Index from '../components/PizzaBlock/Index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Paginstion from '../components/Pagination/index';
import { setFilters, filterSliceSelector } from '../redux/slices/filterSlice';
import {
  fetchPizzas,
  pizzaSliceSelector,
  // SearchPizzaParams,
} from '../redux/slices/pizzaSlice';

import { useDispatch, useSelector } from 'react-redux';
// import { useAppDispatch } from 'redux/store';

// type SortItem = {
//   id: number;
//   name: string;
//   sort: string;
// };

export const list = [
  { id: 0, name: 'популярности возр', sort: '-rating' },
  { id: 1, name: 'популярности убыв', sort: 'rating' },
  { id: 2, name: 'цене возр', sort: '-price' },
  { id: 3, name: 'цене убыва', sort: 'price' },
  { id: 4, name: 'алфавиту А-Я', sort: '-title' },
  { id: 5, name: 'алфавиту Я-А', sort: 'title' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(pizzaSliceSelector);
  const [isLoading, setIsLoading] = React.useState(true);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(filterSliceSelector);

  const getPizzas = async () => {
    setIsLoading(true);

    const typeOfSort = list[sortType].sort.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      dispatch(
        // @ts-ignore
        fetchPizzas({
          typeOfSort,
          category,
          search,
          currentPage,
          sortType,
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: list[sortType].sort,
        categoryId,
        currentPage,
        sortType,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, searchValue, currentPage, sortType]);

  // Если был первый рендер, то проверяем url-параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        // @ts-ignore
        setFilters({
          ...params,
        })
      );

      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <Index key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} />
        <Sort sortIndex={sortType} list={list} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loading' ? skeletons : pizzas}
        {error && <h3>An error: {error}</h3>}
      </div>

      <Paginstion currentPage={currentPage} />
    </>
  );
};

export default Home;
