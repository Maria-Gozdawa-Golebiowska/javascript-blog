'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optAuthorsListSelector = '.authors'; // New selector for authors list

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
  const activeArticles = document.querySelectorAll('.post.active');
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

function generateTitleLinks(customSelector = '') {
  // Remove contents of titleList
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  // For each article
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for (const article of articles) {
    // Get the article id
    const articleId = article.getAttribute('id');

    // Find the title element
    // Get the title from the title element
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    // Create HTML of the link
    const linkHTML = `<li><a href="#${articleId}">${articleTitle}</a></li>`;

    // Insert link into titleList
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
}
generateTitleLinks();

function generateTags() {
  // Find all articles
  const articles = document.querySelectorAll(optArticleSelector);

  // START LOOP: for every article
  for (const article of articles) {
    // Find tags wrapper
    const tagWrapper = article.querySelector(optArticleTagSelector);

    // Check if the tag wrapper exists before proceeding
    if (tagWrapper) {
      // Initialize html variable with empty string
      let html = '';

      // Get tags from data-tags attribute
      const articleTags = article.getAttribute('data-tags');

      // Split tags into array
      const articleTagsArray = articleTags.split(' ');

      // START LOOP: for each tag
      for (const tag of articleTagsArray) {
        // Generate HTML of the link
        const tagHTML = `<li><a href="#tag-${tag}"><span>${tag}</span></a></li>`;

        // Add generated code to html variable
        html += tagHTML;
      } /* END LOOP: for each tag */

      // Insert HTML of all the links into the tags wrapper
      tagWrapper.innerHTML = html;
    }
  } /* END LOOP: for every article */
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', ''); // Correcting tag extraction

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (const activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
  } /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (const tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
  } /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

const addClickListenersToTags = function () {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (const tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  } /* END LOOP: for each link */
};

const links = document.querySelectorAll('.titles a');
for (const link of links) {
  link.addEventListener('click', titleClickHandler);
}

function generateAuthors() {
  // Find all articles
  const articles = document.querySelectorAll(optArticleSelector);

  // Find author list wrapper
  const authorsListWrapper = document.querySelector(optAuthorsListSelector);

  // Initialize an object to store authors and their article counts
  const authorsData = {};

  // START LOOP: for every article
  for (const article of articles) {
    // Get author from data-author attribute
    const articleAuthor = article.getAttribute('data-author');

    // If author is not already in authorsData, add it with count 1, otherwise increment the count
    if (!authorsData.hasOwnProperty(articleAuthor)) {
      authorsData[articleAuthor] = 1;
    } else {
      authorsData[articleAuthor]++;
    }
  } /* END LOOP: for every article */

  // Generate author links and counts
  for (const author in authorsData) {
    // Generate HTML of the link with author's name and article count
    const authorHTML = `<li><a href="#author-${author}"><span>${author} (${authorsData[author]})</span></a></li>`;
    // Insert link into authorsListWrapper
    authorsListWrapper.insertAdjacentHTML('beforeend', authorHTML);
  }
}

function generateAuthorLinks() {
  // Find all articles
  const articles = document.querySelectorAll(optArticleSelector);

  // START LOOP: for every article
  for (const article of articles) {
    // Find author wrapper
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    if (authorWrapper) {
      // Get author from data-author attribute
      const articleAuthor = article.getAttribute('data-author');
      // Generate HTML of the link with author's name and article count
      const authorHTML = `<li><a href="#author-${articleAuthor}"><span>by ${articleAuthor}</span></a></li>`;
      // Insert link into authorWrapper
      authorWrapper.insertAdjacentHTML('beforeend', authorHTML);
    }
  } /* END LOOP: for every article */
}

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all authors links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (const activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');
  } /* END LOOP: for each active tag link */

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (const authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
  } /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (const authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

generateAuthors();
generateAuthorLinks(); // Call to generate author links
addClickListenersToTags();
addClickListenersToAuthors();
