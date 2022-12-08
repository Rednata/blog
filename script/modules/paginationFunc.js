import { createPaginationNumber } from './createElements.js';

const getStartPage = (pagination) => +pagination.firstElementChild.dataset.number; 

const changePageNumber = (paginationWrap, startPage, currentPage, arrowDirect) => {
  if (arrowDirect === 'left') {
    if (startPage <= 1) {
      createPaginationNumber(paginationWrap, currentPage, 1);
    } else {
      createPaginationNumber(paginationWrap, currentPage, startPage - 1);
    }
  } else {
    createPaginationNumber(paginationWrap, currentPage, startPage + 1);
  }
};

const onClickArrow = (queryParams) => {
  const paginationWrap = document.querySelector('.pagination');
  const pagination = document.querySelector('.pagination-group');

  paginationWrap.addEventListener('click', (e) => {
    if (e.target.closest('.arrow_left')) {
      e.preventDefault();
      const startPage = getStartPage(pagination);
      const currentPage = +queryParams.slice(6);
      changePageNumber(paginationWrap, startPage, currentPage, 'left');
    }
    if (e.target.closest('.arrow_right')) {
      e.preventDefault();
      const startPage = getStartPage(pagination);
      const currentPage = +queryParams.slice(6);
      changePageNumber(paginationWrap, startPage, currentPage, 'right');
    }
  });
};

export {onClickArrow};
