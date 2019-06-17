const showSuccessModalAddNewPost = (curElm, successMsg) => {
  curElm.attr('data-toggle', 'modal');
  curElm.attr('data-target', '#success__modal');
  $('#success__modal').modal('show');
  $('#success__modalContent').html(successMsg);

  $('.success__modal button').click(function () {
    curElm.removeAttr('data-toggle');
    curElm.removeAttr('data-target');
    location.reload();
  });

  $(document).mouseup(function (e) {
    var container = $(".success__modal");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      curElm.removeAttr('data-toggle');
      curElm.removeAttr('data-target');
    }

    location.reload();
  });
};

var quill = new Quill('#editor', {
  theme: 'snow'
});

$('.flexdatalist').flexdatalist({
  minLength: 1
});

CKEDITOR.replace('editor', {
  "extraPlugins": 'imagebrowser',
  "imageBrowser_listUrl": "/actions/files"
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

const getArticleCategories = () => {
  let result = [];
  const categoryListElm = $("#edit_article__categories-input input:checked").parent();

  for (let categoryElm of categoryListElm) {
    result.push(categoryElm.id);
  }

  return result;
}

// $(window).bind("load", function() {
//   CKEDITOR.instances.editor.setData($('#articleContent').text())
// });