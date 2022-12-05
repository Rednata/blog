import { createPaginationNumber } from './createElements.js';
import { loadPosts, loadArticle } from './fetch.js';

const getStartPageNumber = () => {
  const startPageNumber = document.querySelector('.pagination__page');
  return +startPageNumber.dataset.number;
};

const getCurrentPageNumber = (target) => {  
  return Number(target.dataset.number);  
};

const writeHistory = ( link, currentPage, startPage, linkBrowser) => {
  history.pushState(
    { link: link,
      currentPage: currentPage,
      startPage: startPage }, 
    '', linkBrowser);  
    console.warn(history.state);
    
}

const onArrowClick = (pagination) => {
  let startPageNumber = getStartPageNumber();
  const url = new URL(location.href);
  const currentPage = +(url.search.slice(6));
  
  
  
  pagination.addEventListener('click', ({ target }) => {
    if (target.classList.contains('arrow_right')) {      
      createPaginationNumber(pagination, ++startPageNumber, +currentPage)
    }    
    if (target.classList.contains('arrow_left')) {  
      startPageNumber = (startPageNumber > 1)? --startPageNumber : 1;
      createPaginationNumber(pagination, startPageNumber, +currentPage);
    }  
    
  })
  
}

const onPaginationClick = (pagination) => {  
  pagination.addEventListener('click', ( e ) => {
    if (e.target.classList.contains('pagination__page')) {
      e.preventDefault();
      const currentPage = getCurrentPageNumber(e.target);
      const ttt = document.querySelector('.pagination__page');
      const startPage = +ttt.dataset.number;

      const linkBrowser = `blog.html?page=${currentPage}`;    
      const link = `https://gorest.co.in/public-api/posts?page=${currentPage}`;
      console.log(link);

      writeHistory(link, currentPage, startPage, linkBrowser);
  
    loadPosts(getStartPageNumber(), getCurrentPageNumber(e.target), link);
    }
  })

}

const goHistoryBack = () => {  
  window.addEventListener('popstate', e => {    
    e.preventDefault();         
    if (e.state) {      
      const {
        startPage,
        currentPage,
        link
      } = e.state;    
      
        loadPosts(startPage, currentPage, link)      
    } 

  })
}

const onBlogItemClick = () => {  

  const blog = document.querySelector('.blog');

      blog.addEventListener('click', e => {
      e.preventDefault();
        if (e.target.parentElement.classList.contains('blog-item__link')) {
          const urlArticle = new URL (e.target.parentElement.href);
          const idArticle = urlArticle.search.slice(4);
                    
          const url = new URL(location.href);
          const currentPage = +(url.search.slice(6)) || 1;
          
          const startPage = getStartPageNumber();
          const linkBrowser = `article.html?id=${idArticle}`;
          
          
          const link = `https://gorest.co.in/public-api/posts?page=${currentPage}`;
          console.warn(link, linkBrowser);
    
          writeHistory( link, currentPage, startPage, linkBrowser);
          
          loadArticle(idArticle);
        }

    })
  }

  const onGoBackFromArticleClick = () => {
    const goBlogBack = document.querySelector('.goBlog');
    goBlogBack.addEventListener('click', (e) => {
      e.preventDefault();

      const {link, startPage, currentPage } = history.state;
      console.log( link, startPage, currentPage);
       
       loadPosts(startPage, currentPage, link)   
    })
  }

  const onFooterBackClick = () => {
    const footerBack = document.querySelector('.footer__back');
    footerBack.addEventListener('click', e => {
      e.preventDefault();
      
      const {link, startPage, currentPage } = history.state;
     console.log( link, startPage, currentPage);
      
      loadPosts(startPage, currentPage, link)
      
      
    })    
  }
  



export {onArrowClick, onPaginationClick, goHistoryBack, onBlogItemClick, onGoBackFromArticleClick, onFooterBackClick};
