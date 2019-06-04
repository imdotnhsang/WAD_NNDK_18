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
  editor.execCommand('source', true);

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
      categories =  [categoriesElm[0].id, categoriesElm[1].getAttribute("parentid")]
  }

  console.log(`title: ${title}.`);
  console.log(`abstract: ${abstract}.`);
  console.log(`tags: ${tags}.`);
  console.log(`categories: ${categories}.`);
  console.log(`coverImage: ${coverImage}.`);
  console.log(`content: ${content}.`);
});