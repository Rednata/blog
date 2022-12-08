import { createBlogPage, createArticlePage, createFooter } from './createElements.js';
import {onClickArrow } from './paginationFunc.js';

const loadPosts = async (currentPage) => {
  document.body.innerHTML = '';

  const url = new URL(window.location);
  const queryParams = url.search;
  currentPage = +queryParams.slice(6) || 1;

  const response = await fetch(`https://gorest.co.in/public-api/posts${queryParams}`);
  const postList = await response.json();

  createBlogPage(postList, currentPage);

  onClickArrow(queryParams);
};

const loadArticle = async() => {
  const url = new URL(window.location);
  const queryParams = url.search.slice(4);
  const response = await fetch(`https://gorest.co.in/public-api/posts/${queryParams}`);

  const articleData = await response.json();
  console.log(articleData);
  createArticlePage(articleData.data);
};

const loadAuthor = async(userID) => {
  const response = await fetch(`https://gorest.co.in/public-api/users/${userID}`);

  const author = await response.json();
  createFooter(author);
};




export {loadPosts, loadArticle, loadAuthor};
