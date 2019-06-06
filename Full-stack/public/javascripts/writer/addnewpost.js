var quill = new Quill('#editor', {
  theme: 'snow'
});


CKEDITOR.replace('editor', {
  "extraPlugins": 'imagebrowser',
  "imageBrowser_listUrl": "/writer/files"
});

CKEDITOR.config.height = "500";

$('.container_input').click(function () {
  $('.container_input input:checked').prop('checked', false);

  $(this).children('input').prop('checked', true);

  const parentId = $(this).attr('parentId');
  if (parentId) {
    $(`#${parentId}`).children('input').prop('checked', true);
  }
});

$('.flexdatalist').flexdatalist({
  minLength: 1
});

const getArticleCategories = () => {
  let result = [];
  const categoryListElm = $("#article__categories-input input:checked").parent();

  for (let categoryElm of categoryListElm) {
    result.push(categoryElm.id);
  }
  
  return result;
}

const getArticleCoverImage = (content) => {
  const contentElms = $(content);
  const coverImage = $('img:first-child', contentElms).attr('src');

  return coverImage;
}

const getArticleTags = () => {
  let result = [];
  const tagsElm = $('.flexdatalist-multiple').find("li");

  for (let i = 0; i < tagsElm.length - 1; i++) {
    result.push(tagsElm[i].firstChild.textContent);
  }

  return result;
}

$('#saveArticle-btn').click(function () {
  const content =  CKEDITOR.instances.editor.getData();
  const title = $('#article__title-input').val().trim();
  const abstract = $('#article__abstract-input').val().trim();
  const categories = getArticleCategories();
  const coverImage = getArticleCoverImage(content);
  const tags = getArticleTags();

  console.log(`title: ${title}.`);
  console.log(`abstract: ${abstract}.`);
  console.log(`tags: ${tags}.`);
  console.log(`categories: ${categories}.`);
  console.log(`coverImage: ${coverImage}.`);
  console.log(`content: ${content}.`);

  const isInvalid = !title || !abstract || !categories.length || !coverImage || !content;
  console.log("isInvalid: ", isInvalid);

  // if (!isInvalid) {
  //   postData('/api/article/create', { title, abstract, tags, categories, coverImage, content })
  //     .then(res => {
  //       const statusCode = res.status;

  //       switch (statusCode) {
  //         case 200:
  //           res.json().then(article => {
  //             console.log(article);
  //           })

  //           break;
  //         case 500:
  //           break;

  //         default:
  //           res.json().then(err => {
  //             console.log(err);
  //           })
  //           break;
  //       }
  //     })
  // } else {
  //   console.log('isInvalid');
  // }

});