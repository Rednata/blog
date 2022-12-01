import { loadPosts } from './modules/fetchLoad.js';

const init = () => {  
  let pageStart = 1;
  loadPosts(pageStart);    


}

init();