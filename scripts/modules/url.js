const getURLSearch = () => {
  return window.location.search.slice(4);
}

const getWindowURL = () => {
  window.addEventListener('load', () => {
    const urlSearch = getURLSearch()    
    return urlSearch;    
  })



}

const loadArticle = async (urlSearch) => {
  const response = await fetch (`https://gorest.co.in/public-api/posts/${urlSearch}`);
  const articleData = await response.json();
  console.log(urlSearch);
  // createElementsArticle(articleData);
}



export { getWindowURL };