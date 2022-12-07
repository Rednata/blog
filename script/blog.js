import { loadPosts } from './modules/fetch.js';

const init = () => {
  const startPage = 1;
  const currentPage = 1;
  loadPosts(startPage, currentPage);
};

init();
