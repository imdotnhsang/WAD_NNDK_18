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
  const title = $('#article__title-input').val();
  const abstract = $('#article__abstract-input').val();
  const tags = [];
  for (i = 0; i < $('.flexdatalist-multiple').find("li").length - 1; i++) {
    tags[i] = $('.flexdatalist-multiple').find("li")[i].children[0].textContent;
  }

  $('#contentElm').html(content);
  const coverImage = $('#contentElm img').eq(0).attr('src');

  if ($("#article__categories-input input:checked").parent().length == 2) {
    var category = { _id: $("#article__categories-input input:checked").parent()[0].id, parentId: $("#article__categories-input input:checked").parent()[1].getAttribute("parentid") };
  } else {
    var category = { _id: $("#article__categories-input input:checked").parent()[0].id, parentId: "" };
  }
  console.log(title);
  console.log(abstract);
  console.log(tags);
  console.log(category);
  console.log(coverImage);
  console.log(content);

})