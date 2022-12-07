import { createPageBlog } from './createElements.js';

const loadPosts = async (startPage, currentPage) => {
  document.body.innerHTML = '';
  console.log('currentPage: ', currentPage);

  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${currentPage}`);
  const postList = await response.json();
  // const limitPages = postList.meta.pagination.limit;

  const {paginationWrap, pagination} = createPageBlog(postList, startPage, currentPage);

  const getCurrentPageNumber = (target) => target.dataset.number;

  const getStartPage = (pagination) => pagination.firstElementChild.dataset.number;


  const openNewWindow = () => {
    pagination.addEventListener('click', (e) => {
      e.preventDefault();
      const currentPage = getCurrentPageNumber(e.target);
      const startPage = getStartPage(pagination);
      const link = `blog.html?page=${currentPage}`;
      console.log('currentPage: ', currentPage);
      window.open(link);

      loadPosts(startPage, currentPage);
    });
  };


  openNewWindow();

};



export {loadPosts};
