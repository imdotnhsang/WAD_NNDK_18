$('#btn_publish').click(function (e) {
  e.preventDefault();

  var title = $('#title').val();
  var summary = $('#summary').val();
  var data = CKEDITOR.instances['editor'].getData();

  console.log(title, summary, data);
});

var quill = new Quill('#editor', {
  theme: 'snow'
});


CKEDITOR.replace('editor', {
  "extraPlugins": 'imagebrowser',
  "imageBrowser_listUrl": "/writer/files"
});

CKEDITOR.config.height = "500";

$('.container_input').click(function() {
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

$('#saveArticle-btn').click(function() {
  editor.execCommand('source', true);

  const content = editor.getData();
  const title = $('#article__title-input').val();
  const abstract = $('#article__abstract').val();

  $('#contentElm').html(content);
  const listImgElm = $('#contentElm img');

  if (listImgElm.length === 0) {
    console.log('Img');
    return;
  }

  const coverImage = listImgElm.eq(0).attr('src');

  console.log(title);
  console.log(abstract);
  console.log(coverImage);
  console.log(content);  

})