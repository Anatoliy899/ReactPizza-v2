import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

import { setCurrentPage } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

type PaginstionProps = { currentPage: number };

const Paginstion: React.FC<PaginstionProps> = ({ currentPage }) => {
  const dispatch = useDispatch();
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </>
  );
};

export default Paginstion;
