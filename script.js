// import { createElementArticle } from './article.js';

const createElementBlog = (data, date) => {
  
  const {title, } = data;

  const {due_on} = date;
  const dateStyle = new Date(due_on).toLocaleString('ru', { dateStyle: 'long'});    
  
  // const createHref = () => {
  //   console.warn(data.id);
  //   return 
  // }
  
  const liBlogItem = document.createElement('li');
  liBlogItem.classList.add('blog-item');
  const href = document.createElement('a');

  
  href.href = `./article.html?id=${data.id}`;
  // href.href = `./article.html`;
  
  href.rel="noopener noreferrer";
  href.target = '_blank';
  href.classList.add('link');
    
  href.insertAdjacentHTML('afterbegin', 
  `    
    <img class="blog-item__image" src="./assets/img/Rectangle 90.jpg" alt="">
    <div class="blog-item__content">
      <h2 class="blog-item__title">${title}</h2>
      <p class="blog-item__date">${dateStyle}</p>
      <div class="blog-item__info info">
        <div class="info__view">
          <span class="info__img info__img_view"></span>
          <p class="view__count">====</p>              
        </div>
        <div class="info__comments">
          <span class="info__img info__img_comments"></span>
          <p class="comments__count">=====</p>              
        </div>
      </div>
    </div>
    
  `
  );
  liBlogItem.append(href);

  return liBlogItem;
}

const ulBlog = document.querySelector('ul');

const loadPosts = async () => {
  const response = await fetch('https://gorest.co.in/public-api/posts');
  
  const posts = await response.json();

  const data = posts.data;
  console.log(data);
  // console.log(data);




  // document.body.append(article);
  const response2 = await fetch('https://gorest.co.in/public/v2/todos');
  
  const posts2 = await response2.json();

  for (let i = 0; i < data.length; i++) {
    const liBlogItem = createElementBlog(data[i], posts2[i]);
    ulBlog.append(liBlogItem);
    console.log('====');
  }
  
 const ul = document.querySelector('ul');
//  console.log(aHref);
 ul.addEventListener('click', (e) => {
   if (e.target.closest('.link')) {
    //  e.preventDefault();
    console.warn(e.target);
    const url = new URL(e.target.href);
    const urlSearch = url.search;
    console.warn(urlSearch.slice(4));



    loadArticle(urlSearch.slice(4));


   }
     

 })
 ul.addEventListener('contextmenu', (e) => {

  console.log('+++++');
   console.log(e.target);
 })

}

loadPosts();



// blog.html?page=24