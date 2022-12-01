import { createBlog, createElementsArticle, createFooter } from './createElements.js';

const loadPosts = async () => {  
  const response = await fetch ('https://gorest.co.in/public-api/posts');
  const posts = (await response.json()).data;    
  createBlog(posts);  
}

const getURLSearch = () => {
  return window.location.search.slice(4);
}

const onLoadWindow = () => {
  window.addEventListener('load', () => {
    const urlSearch = getURLSearch()  
    const loadArticle = async (urlSearch) => {
      const response = await fetch (`https://gorest.co.in/public-api/posts/${urlSearch}`);
      createElementsArticle(await response.json());      
    }
    loadArticle(urlSearch);  
  });
}

const loadAuthor = async (user_id) => {  
  const response = await fetch(`https://gorest.co.in/public-api/users/${user_id}`);
  const author = await response.json();
  createFooter(author.data.name);
}

export {loadPosts, onLoadWindow, loadAuthor};
