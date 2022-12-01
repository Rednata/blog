import { createBlog, createElementsArticle, createFooter, createPageNumbers } from './createElements.js';

const loadPosts = async (pageStart) => {  
  const response = await fetch ('https://gorest.co.in/public-api/posts');  
  const posts = await response.json();      
  
  createBlog(posts.data, pageStart);
  
  const pagination = document.querySelector('.pagination');
  
  pagination.addEventListener('click', ({ target }) => {
    const pages = document.querySelectorAll('.pagination__page');
    let start = pages[0].dataset.number;
    if (target.classList.contains('arrow_right')) {                    
      createPageNumbers(Number(++start));
    } else if (target.classList.contains('arrow_left')) {    
      if (+start === 1) {
        createPageNumbers(1);
      } else {
      
        createPageNumbers(Number(start) - 1);
      }
    
    
    }

    
})




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
