
$('#btn_publish').click(function (e) {
    e.preventDefault();

    var data = CKEDITOR.instances['editor'].getData();
    
    alert(data);
});

$("#radioP1_C1").change(function(){
  $(this).attr('checked','true');
  var p = '#'+ $(this).attr("nameParent");
  $(p).attr('checked','true');
})

var quill = new Quill('#editor', {
    theme: 'snow'
  });


CKEDITOR.replace('editor', {
    "extraPlugins": 'imagebrowser',
    "imageBrowser_listUrl": "/writer/files",
});

var category = [ 'tech', 'aa', 'bb'];

// CKEDITOR.config.filebrowserImageUploadUrl = '/api/writer/upload';
CKEDITOR.config.height = "500";

