

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

const createPaginationNumber = (paginationWrap, startPage, currentPage) => {
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

const createPageBlog = (postList, startPage, currentPage) => {
  console.log('postList: ', postList);

  const section = createSection();
  const blog = createUl();
  blog.append(...renderPost(postList.data));
  section.append(blog);
  document.body.append(section);

  const paginationWrap = createPaginationWrap();
  const pagination = createPaginationNumber(paginationWrap, startPage, currentPage);
  section.append(paginationWrap);
  document.body.append(section);
  return {pagination};
};

export {createPageBlog, createPaginationNumber};
