import { createPageBlog } from './createElements.js';
import { openNewWindow, onClickArrow } from './paginationFunc.js';

const loadPosts = async (currentPage) => {
  document.body.innerHTML = '';

  const url = new URL(window.location);
  const queryParams = url.search;
  currentPage = +queryParams.slice(6) || 1;

  const response = await fetch(`https://gorest.co.in/public-api/posts${queryParams}`);
  const postList = await response.json();

  createPageBlog(postList, currentPage, currentPage);

  openNewWindow();
  onClickArrow(queryParams);
};

export {loadPosts};
