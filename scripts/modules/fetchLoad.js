import { createBlog, createElementsBlog } from './createElements.js';

const loadPosts = async () => {  
  const response = await fetch ('https://gorest.co.in/public-api/posts');
  const posts = (await response.json()).data;    
  createBlog(posts);  
}




export {loadPosts};
