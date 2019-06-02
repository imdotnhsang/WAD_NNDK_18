
$('#btn_publish').click(function (e) {
    e.preventDefault();

    var data = CKEDITOR.instances['textarea_content'].getData();
    var imgList = document.querySelectorAll('.easyimage');
    alert(imgList.length);
});

var quill = new Quill('#editor', {
    theme: 'snow'
  });


CKEDITOR.replace('editor', {
    "extraPlugins": 'imagebrowser',
    "imageBrowser_listUrl": "/writer/files",
});

// CKEDITOR.config.filebrowserImageUploadUrl = '/api/writer/upload';
CKEDITOR.config.height = "500";

