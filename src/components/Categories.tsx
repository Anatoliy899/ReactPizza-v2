import React from 'react';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

import { useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filter/slice';

type CategoriesProps = {
  value: number;
};

const Categories: React.FC<CategoriesProps> = React.memo(({ value }) => {
  useWhyDidYouUpdate('categories', { value });
  console.log('Перересовка "Сategories"');
  const dispatch = useDispatch();

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categotyName, index) => {
          return (
            <li
              key={index}
              onClick={() => dispatch(setCategoryId(index))}
              className={value === index ? 'active' : ''}
            >
              {categotyName}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
