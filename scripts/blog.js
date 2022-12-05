import { loadPosts } from './modules/fetch.js';

const init = () => {    
  const startPage = 1;
  const currentPage = 1;      
  const link = "https://gorest.co.in/public-api/posts";
  const linkBrowser = "blog.html";
  history.pushState(
    { link: link,
      currentPage: currentPage,
      startPage: startPage }, 
    '', linkBrowser);    
  loadPosts(startPage, currentPage, link);
};
init();