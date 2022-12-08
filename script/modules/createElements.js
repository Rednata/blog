import { loadAuthor } from './fetch.js';
// ===================== BLOG ==========================

const createSection = () => {
  const section = document.createElement('section');
  section.classList.add('section', 'container');

  return section;
};

const createUl = () => {
  const ul = document.createElement('ul');
  ul.classList.add('blog');

  return ul;
};

const createPost = ({title, id}) => {
  const li = document.createElement('li');
  li.classList.add('blog-item');

  // const linkPost = `article.html?id=${id}`;
  li.insertAdjacentHTML('afterbegin',
      `
        <a class="blog-item__link" href="article.html?id=${id}" target="_blank">
          <img class="blog-item__image" src="./assets/img/Rectangle.jpg" alt="">
        </a> 
        <div class="blog-item__content">
          <a class="blog-item__link" href="article.html?id=${id}" target="_blank">
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
  return li;
};

const renderPost = (postList) => {
  const data = postList.map(post => createPost(post));

  return data;
};

// ================  PAGINATION  ========================
const createPaginationWrap = () => {
  const paginationWrap = document.createElement('div');
  paginationWrap.classList.add('pagination');
  paginationWrap.insertAdjacentHTML('afterbegin',
      `    
        <a class="arrow arrow_left"></a>
        <div class="pagination-group">
        </div>
        <a class="arrow arrow_right"></a>    
      `);
  return paginationWrap;
};

const createPaginationNumber = (paginationWrap, currentPage, startPage) => {
  startPage ||= currentPage;
  const pagination = paginationWrap.querySelector('.pagination-group');
  pagination.innerHTML = '';
  const pages = [];
  for (let i = startPage; i < startPage + 3; i++) {
    const link = document.createElement('a');
    link.className = 'pagination__page';
    if (i === currentPage) {
      link.classList.add('active');
    }
    link.setAttribute('data-number', `${i}`);
    link.href = `blog.html?page=${i}`;
    link.textContent = i;
    pages.push(link);
  }
  pagination.append(...pages);
  return pagination;
};

const createBlogPage = (postList, currentPage) => {
  console.log('postList: ', postList);

  const section = createSection();
  const blog = createUl();
  blog.append(...renderPost(postList.data));
  section.append(blog);
  document.body.append(section);

  const paginationWrap = createPaginationWrap();
  const pagination = createPaginationNumber(paginationWrap, currentPage);
  section.append(paginationWrap);
  document.body.append(section);
  return {pagination};
};

// ============  ARTICLE ================
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
};

const createMain = (title, body) => {
  const main = document.createElement('main');
  main.classList.add('main');
  main.insertAdjacentHTML('afterbegin',
      `
        <article class="article">
          <h1 class="title article__title">${title}</h1>
          <p class="article__text">${body}</p>
        </article>
      `);
  return main;
};

const createAside = () => {
  const aside = document.createElement('aside');
  aside.className = 'aside';
  aside.insertAdjacentHTML('afterbegin',
      `
        <img src="./assets/img/add.jpg" alt="" class="article__img">
        <img src="./assets/img/add.jpg" alt="" class="article__img">
      `);
  return aside;
};

const createFooter = (author) => {
  console.log('author: ', author);
  const nameAuthor = author.data.name;
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footer.insertAdjacentHTML('afterbegin',
      `
        <a class="footer__back" href="">К списку статей</a>
          <div class="footer__about">
          <div class="footer__author">
            ${nameAuthor}
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
      `);
  articleWrap.append(footer);
  return footer;
};

const createArticlePage = (articleData) => {
  const {
    title,
    body,
    user_id,
  } = articleData;

  const header = createHeader(title);
  const main = createMain(title, body);
  const aside = createAside();

  loadAuthor(user_id);
  articleWrap.append(aside, header, main);
  document.body.append(articleWrap);
};

export {createBlogPage, createArticlePage, createPaginationNumber, createFooter};
