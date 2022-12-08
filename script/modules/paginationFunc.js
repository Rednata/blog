import { loadPosts } from './fetch.js';
import { createPaginationNumber } from './createElements.js';

const getCurrentPage = (target) => target.dataset.number;

const getStartPage = (pagination) => pagination.firstElementChild.dataset.number; 

const openNewWindow = () => {
  
  const pagination = document.querySelector('.pagination-group');
  pagination.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('e.target: ', e.target);
    const currentPage = getCurrentPage(e.target);
    

    const startPage = getStartPage(pagination);
    const link = `blog.html?page=${currentPage}`;


    window.open(link);
    loadPosts(startPage, currentPage);
  });
};

const changePageNumber = (paginationWrap, startPage, currentPage, arrowDirect) => {
  if (arrowDirect === 'left') {
    if (startPage <=0 ) {
      createPaginationNumber(paginationWrap, 1, Number(currentPage));
    } else {
      createPaginationNumber(paginationWrap, Number(startPage) - 1, Number(currentPage))
        
      }
    
    
  } else {
    createPaginationNumber(paginationWrap, Number(startPage) + 1, Number(currentPage));
  }
};

const onClickArrow = (queryParams) => {
  const paginationWrap = document.querySelector('.pagination');
  const pagination = document.querySelector('.pagination-group');
  const arrowLeft = document.querySelector('.arrow_left');
  
  arrowLeft.addEventListener('click', (e) => {
    e.preventDefault();
    const startPage = getStartPage(pagination);
    const currentPage = queryParams.slice(6);

    changePageNumber(paginationWrap, startPage, currentPage, 'left');
  })

  const arrowRight = document.querySelector('.arrow_right');
  arrowRight.addEventListener('click', (e) => {
    e.preventDefault();
    const startPage = getStartPage(pagination);
    const currentPage = queryParams.slice(6);
    changePageNumber(paginationWrap, startPage, currentPage, 'right');
  })
}



export {openNewWindow, onClickArrow};
