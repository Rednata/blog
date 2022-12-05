import { createPageBlog, createElementsArticle, createFooter } from './createElements.js';
import { onArrowClick, onPaginationClick, goHistoryBack, onBlogItemClick, onGoBackFromArticleClick, onFooterBackClick } from './paginationFunction.js';

const loadPosts = async (startPage, currentPage, link) => {  
  const response = await fetch (link);
  const data = await response.json();
  const posts = data.data;
  document.body.innerHTML = '';  
  const pagination = createPageBlog(posts, startPage, currentPage);
  
  onArrowClick(pagination);
  onPaginationClick(pagination);
  onBlogItemClick();
}

const loadArticle = async (idPost) => {
  document.body.innerHTML = '';  
  const response = await fetch (`https://gorest.co.in/public-api/posts/${idPost}`);
  const post = await response.json();

  const header = createElementsArticle(post);
  onGoBackFromArticleClick(header);

}

const loadAuthor = async (user_id) => {  
  const response = await fetch(`https://gorest.co.in/public-api/users/${user_id}`);
  const author = await response.json();
  const footer = createFooter(author.data.name);
  onFooterBackClick();
}
goHistoryBack();

export {loadPosts, loadArticle, loadAuthor};