'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorsListLink: Handlebars.compile(document.querySelector('#template-authors-list-link').innerHTML),

}

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.list.tags';
const optCloudClassCount = '5';
const optCloudClassPrefix = "tag-size-";
const optAuthorsListSelector = ".list.authors ";

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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData)

    // Insert link into titleList
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
}
generateTitleLinks();

function calculateTagsParams(tags){
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
console.log(calculateTagClass)
  return optCloudClassPrefix + classNumber;
  
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  const allTags = {};

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
        //const tagHTML = `<li><a href="#tag-${tag}"><span>${tag}</span></a></li>`;//

        const tagHTMLData = {id:tag, tag: tag};
        const tagHTML = templates.articleTagLink(tagHTMLData);


        // Add generated code to html variable
        html += tagHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }/* END LOOP: for each tag */

      // Insert HTML of all the links into the tags wrapper
      tagWrapper.innerHTML = html;
    }/* END LOOP: for every article */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  
  const tagsParams = calculateTagsParams(allTags);
  console.log(tagsParams)
  
  /* [NEW] create variable for all links HTML code */
  const allTagsData = {tags: []}

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
      //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';//
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
  }/* END LOOP: for each active tag link */
  
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (const tagLink of tagLinks) { 
    /* add class active */
    tagLink.classList.add('active');
  }/* END LOOP: for each found tag link */
  
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};
  
const addClickListenersToTags = function (){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (const tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  }/* END LOOP: for each link */
};

const links = document.querySelectorAll('.titles a');
for (const link of links) {
  link.addEventListener('click', titleClickHandler);
}

function generateAuthors() {
  // NEW create new variable allAuthors with an empty object 
  let allAuthors = {};
  
  // Find all articles
  const articles = document.querySelectorAll(optArticleSelector);

  // START LOOP: for every article
  for (let article of articles) {
    // Find author wrapper
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* generate HTML of the link */
    //const authorHTML = `<li><a href="#author-${articleAuthor}"><span>by ${articleAuthor}</span></a></li>`;
    const authorLinkData = {id: articleAuthor, author: articleAuthor};
    const authorLink = templates.articleAuthorLink(authorLinkData);

    /* add generated code to html variable */
    html += authorLink

    /* insert HTML of all the links into the author wrapper */
    if (authorWrapper) {
      authorWrapper.innerHTML = html;
    }

    //* [NEW] check if this link is NOT already in allAuthors */
  if (!allAuthors[articleAuthor]) {
  /* [NEW] add generated code to allAuthors array */
  allAuthors[articleAuthor] = 1;
  } else {
  allAuthors[articleAuthor]++;
  }

  } /* END LOOP: for every article */

   /* [NEW] find list of tags in right column */
   const authorList = document.querySelector(optAuthorsListSelector);

   /* [NEW] create variable for all links HTML code */
   const allAuthorsData = {authors: []};
 
   /* [NEW] START LOOP: for each tag in allTags: */
   for(let author in allAuthors){
 
     /* [NEW] generate code of a link and add it to allTagsHTML */
     //allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ') ' + '</a></li>';
     allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
 
   /* [NEW] END LOOP: for each tag in allTags: */
   }
 
   /*[NEW] add HTML from allTagsHTML to tagList */
   authorList.innerHTML = templates.authorsListLink(allAuthorsData);
 
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
  for (let activeAuthor of activeAuthors){

    /* remove class active */
    activeAuthor.classList.remove('active');
  }/* END LOOP: for each active tag link */

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks){

    /* add class active */
    authorLink.classList.add('active');

  }/* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]'); 
  }

  function addClickListenersToAuthors() {
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    for (let authorLink of authorLinks) {
      authorLink.addEventListener('click', authorClickHandler);
    }
  }

generateAuthors();
addClickListenersToTags();
addClickListenersToAuthors();
