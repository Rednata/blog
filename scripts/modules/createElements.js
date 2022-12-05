import { loadAuthor } from './fetch.js';

const createSection = () => {
  const section = document.createElement('section');
  section.classList.add('section', 'container');

  return section;
}

const createUl = () => {  
  const ul = document.createElement('ul');
  ul.classList.add('blog');  

  return ul;
};

const createPost = ({title, id}) => {     
    const post = document.createElement('li');
    post.classList.add('blog-item');

    const linkPost = `article.html?id=${id}`;
    post.insertAdjacentHTML('afterbegin', 
    `
      <a class="blog-item__link" href=${linkPost} target="_blank">
        <img class="blog-item__image" src="./assets/img/Rectangle.jpg" alt="">
      </a> 
      <div class="blog-item__content">
        <a class="blog-item__link" href=${linkPost} target="_blank">
          <h2 class="blog-item__title">${title}</h2>
        </a>
        <p class="blog-item__date">22 октября 2021, 12:45</p>
        <div class="blog-item__info info">
          <div class="info__view">
            <span class="info__img info__img_view"></span>
            <p class="view__count">1.2K</p>              
          </div>
          <div class="info__comments">
            <span class="info__img info__img_comments"></span>
            <p class="comments__count">0</p>              
          </div>
        </div>
      </div>  
    `);   
    return post;
  };

const renderPost = (posts, blog) => {
  const data = posts.map(post => createPost(post));
  blog.append(...data);
};

const createPagination = () => {
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  pagination.insertAdjacentHTML('afterbegin', 
  `    
    <a class="arrow arrow_left"></a>
    <div class="pagination-group">
    </div>
    <a class="arrow arrow_right"></a>    
  `)
  return pagination;
};

const createPaginationNumber = (pagination, startPage, currentPage) => {  
  
  const paginationInner = pagination.querySelector('.pagination-group'); 
  paginationInner.innerHTML = '';
  const pages = [];  
  for (let i = startPage; i < startPage + 3; i++) {            
    const link = document.createElement('a');    
    link.className = 'pagination__page';
    if (i === currentPage) {
      link.classList.add('active');
    }
    link.setAttribute('data-number', `${i}`);
    link.href = '';
    link.textContent = i;
    pages.push(link);        
  }
  paginationInner.append(...pages);
};

const createPageBlog = (posts, startPage, currentPage) => {
  document.body.innerHTML = '';
  const section = createSection();  
  const blog = createUl();
  renderPost(posts, blog);    
  section.append(blog);
  const pagination = createPagination();
  createPaginationNumber(pagination, startPage, currentPage);
  section.append(pagination);
  document.body.append(section);
  return pagination;
}

//  ==============  ARTICLE  ======================

const articleWrap = document.createElement('div');
articleWrap.className = 'articleWrap';

const createHeader = (title) => {
  const header = document.createElement('header');
  header.classList.add('header');
  header.insertAdjacentHTML('afterbegin', 
  `
    <ul class="nav">
      <li class="nav__li">
        <a class="nav__main">Главная</a>
      </li>
      <li class="nav__li">
        <a class="goBlog" href="">Блог</a>
      </li>
      <li class="nav__title">${title}
      </li>      
    </ul>  
  `);
  return header;
}

const createMain = (title, body) => {
  const main = document.createElement('main');
  main.classList.add('main');  
  main.insertAdjacentHTML('afterbegin', 
  `
    <article class="article">
      <h1 class="title article__title">${title}</h1>
      <p class="article__text">${body}</p>
    </article>
  `
  );
  return main
}

const createAside = () => {
  const aside = document.createElement('aside');
  aside.className = 'aside';
  aside.insertAdjacentHTML('afterbegin', 
  `
    <img src="./assets/img/add.jpg" alt="" class="article__img">
    <img src="./assets/img/add.jpg" alt="" class="article__img">
  `);
  return aside;
}

const createFooter = (user_id) => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footer.insertAdjacentHTML('afterbegin', 
  `
    <a class="footer__back" href="">К списку статей</a>
      <div class="footer__about">
      <div class="footer__author">
        ${user_id}
      </div>
      <div class="footer__date">
        22 октября 2021, 12:45          
      </div>
      <div class="info footer__info">
        <div class="info__view">
        <span class="info__img info__img_view"></span>
        <p class="info__view_count">1.2K</p>              
      </div>
      <div class="info__comments">
        <span class="info__img info__img_comments"></span>
        <p class="info__comments_count">0</p>              
      </div>
      </div>
    </div>
  `
  )
  articleWrap.append(footer);
  return footer
};

const createElementsArticle = (articleData) => {  
  const {
    data: {title},
    data: {body},
    data: {user_id}
  } = articleData;  
  document.body.innerHTML = '';

  const header = createHeader(title);
  const main = createMain(title, body);
  const aside = createAside();

  loadAuthor(user_id);
 
  articleWrap.append(aside, header, main );
  document.body.append(articleWrap);
}

export {createPageBlog, createPaginationNumber, createElementsArticle, createFooter};