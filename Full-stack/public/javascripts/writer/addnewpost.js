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


var editor = CKEDITOR.instances.editor;
var contentElm;

$('#saveArticle-btn').click(function () {
  const content = editor.getData();
  const title = $('#article__title-input').val().trim();
  const abstract = $('#article__abstract-input').val().trim();

  // coverImage
  $('#contentElm').html(content);
  const coverImage = $('#contentElm img').eq(0).attr('src');

  // tags
  let tags = [];
  const tagsElm = $('.flexdatalist-multiple').find("li");

  if (tagsElm.length - 1 !== 0) {
    for (i = 0; i < tagsElm.length - 1; i++) {
      tags[i] = tagsElm[i].children[0].textContent;
    }
  }

  // categories  
  let categories = [];
  const categoriesElm = $("#article__categories-input input:checked").parent();

  switch (categoriesElm.length) {
    case 0:
      console.log('Empty Cate');
      break;
    case 1:
      categories = [categoriesElm[0].id];
      break;
    default:
      categories =  [categoriesElm[1].getAttribute("id"), categoriesElm[1].getAttribute("parentid")]
  }

  console.log(`title: ${title}.`);
  console.log(`abstract: ${abstract}.`);
  console.log(`tags: ${tags}.`);
  console.log(`categories: ${categories}.`);
  console.log(`coverImage: ${coverImage}.`);
  console.log(`content: ${content}.`);

  const isInvalid = !title || !abstract || !categories.length || !coverImage || !content;
  if (!isInvalid) {
    postData('/api/article/create', {title, abstract, tags, categories, coverImage, content})
      .then(res => {
        const statusCode = res.status;

        switch (statusCode) {
          case 200:
            res.json().then(article => {
              console.log(article);
            })

            break;
          case 500:
            break;
            
          default:
            res.json().then(err => {
              console.log(err);
            })
            break;
        }

        // editor.execCommand('source');  
      })
  } else {
    console.log('isInvalid');
  }

});