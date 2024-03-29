'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagSelector = '.post .tags-list';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  // Remove class 'active' from all article links
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (const activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  // Add class 'active' to the clicked link
  clickedElement.classList.add('active');

  // Remove class 'active' from all articles
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for (const activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  // Get 'href' attribute from the clicked link
  const articleSelector = clickedElement.getAttribute('href');
  
  // Find the correct article using the selector (value of 'href' attribute)
  const targetArticle = document.querySelector(articleSelector);

  // Add class 'active' to the correct article
  targetArticle.classList.add('active');
};

function generateTitleLinks() {
  // Remove contents of titleList
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  // For each article
  const articles = document.querySelectorAll(optArticleSelector);
  for (const article of articles) {
    // Get the article id
    const articleId = article.getAttribute('id');
  
    // Find the title element
    // Get the title from the title element
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    let HTML = '';

    // Create HTML of the link
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = `<li><a href="#${articleId}">${articleTitle}</a></li>`

    // Insert link into titleList
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    HTML += linkHTML;
  }

  const links = document.querySelectorAll('.titles a');
  for (const link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
  generateTitleLinks();


function generateTags (){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles)

  /* START LOOP: for every article: */
  for (let article of articles);

    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    /* get tags from data-tags attribute */

    /* split tags into array */

  const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

      /* generate HTML of the link */

      /* add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
}

generateTags();
