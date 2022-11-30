import { createBlog } from './modules/createElements.js';
import { loadPosts } from './modules/fetchLoad.js';

const init = () => {
  loadPosts();    
}

init();