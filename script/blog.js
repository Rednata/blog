import { loadPosts } from './modules/fetch.js';

const init = () => {
  const currentPage = 1;
  loadPosts(currentPage);
};

init();
