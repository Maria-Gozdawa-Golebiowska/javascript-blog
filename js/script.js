'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  // Remove class 'active' from all article links
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  // Add class 'active' to the clicked link
  clickedElement.classList.add('active');

  // Remove class 'active' from all articles
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  // Get 'href' attribute from the clicked link
  const articleSelector = clickedElement.getAttribute('href');
  
  // Find the correct article using the selector (value of 'href' attribute)
  const targetArticle = document.querySelector(articleSelector);

  // Add class 'active' to the correct article
  targetArticle.classList.add('active');
};

function generateTitleLinks(){
  // Remove contents of titleList
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  // For each article
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    // Get the article id
    const articleId = article.getAttribute('id');
  
    // Find the title element
    // Get the title from the title element
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    let HTML = '';

    // Create HTML of the link
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    // Insert link into titleList
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    HTML = HTML + linkHTML;
  
  }

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  generateTitleLinks ();
}
