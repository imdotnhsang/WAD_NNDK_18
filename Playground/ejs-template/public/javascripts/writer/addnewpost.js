CKEDITOR.replace('textarea_content');
CKEDITOR.config.height = "500";

$('#btn_publish').click(function (e) {
    e.preventDefault();

    var data = CKEDITOR.instances['textarea_content'].getData();
    alert(data);
});


CKEDITOR.replace('textarea_content', {
    "extraPlugins": 'imagebrowser',
    "imageBrowser_listUrl": "/files"
});
