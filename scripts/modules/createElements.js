import { loadAuthor } from './fetchLoad.js';

const createUl = () => {  
  const ul = document.createElement('ul');
  ul.classList.add('blog');
  return ul;
};

const createElementsBlog = ({ title, body, id }) => {      
  const blogItem = document.createElement('li');
  blogItem.classList.add('blog-item');

  const linkHref = `./article.html?id=${id}`;
  blogItem.insertAdjacentHTML('afterbegin', 
  `  
    <a class="blog-item__link" href=${linkHref}>
      <img class="blog-item__image" src="./assets/img/Rectangle.jpg" alt="">
    </a> 
    <div class="blog-item__content">
      <a class="blog-item__link" href=${linkHref}>
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
  
  return blogItem
}

const createBlog = (posts) => {
  const ul = createUl();
  const data = posts.map(elem => createElementsBlog(elem));
  ul.append(...data);  
  const section = document.querySelector('section');  
  section.prepend(ul);  

  // =============  ИЛИ ==================
  // posts.forEach(element => {
  //   ul.append(createElementsBlog(element));    
  // });
}

//  ============== ARTICLE =======================

const bodyArticle = document.querySelector('body');

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
        <a href="blog.html">Блог</a>
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

const createFooter = (author) => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footer.insertAdjacentHTML('afterbegin', 
  `
    <a class="footer__back" href="blog.html">К списку статей</a>
      <div class="footer__about">
      <div class="footer__author">
        ${author}
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
  bodyArticle.append(footer);
};

const createElementsArticle = (articleData) => {  
  const {
    data: {title},
    data: {body},
    data: {user_id}
  } = articleData;  

  const header = createHeader(title);
  const main = createMain(title, body);

  loadAuthor(user_id);
 
  bodyArticle.append(header, main);
}

export {createBlog, createElementsBlog, createElementsArticle, createFooter};