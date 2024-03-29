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

$('#saveArticle-btn').click(function () {
  const content = CKEDITOR.instances.editor.getData();
  const title = $('#article__title-input').val().trim();
  const abstract = $('#article__abstract-input').val().trim();
  const categories = getArticleCategories();
  const coverImage = getArticleCoverImage(content);
  const tagListInput = $('.flexdatalist').flexdatalist('value');

  let tagListOld = [];
  let tagListNew = [];
  let idSelect;
  for (let tag of tagListInput) {
    idSelect = $('#tagList').find('option').filter(function () {
      return $(this).html() === tag
    }).val();

    if (idSelect) {
      tagListOld.push(idSelect)
    } else {
      tagListNew.push(tag);
    }
  }

  console.log(`title: ${title}.`);
  console.log(`abstract: ${abstract}.`);
  console.log(`tagListOld: ${tagListOld}.`);
  console.log(`tagListNew: ${tagListNew}.`);
  console.log(`categories: ${categories}.`);
  console.log(`coverImage: ${coverImage}.`);
  console.log(`content: ${content}.`);

  const isInvalid = !title || !abstract || !categories.length || !coverImage || !content;

  if (isInvalid) {
    console.log("isInvalid: ", isInvalid);
    return;
  }

  postData('/api/article/create', { title, abstract, tagListOld, tagListNew, categories, coverImage, content })
    .then(res => {
      const statusCode = res.status;

      switch (statusCode) {
        case 200:
          res.json().then(article => {
            console.log(article);
            showSuccessModalAddNewPost($(this), 'Add new post successfully.');
          })

          break;
        case 500:
          showErrorsModal($(this), 'Server Error. Please try again!');
          break;

        default:
          res.json().then(err => {
            console.log(err);
          })
          break;
      }
    })
    .catch(err => {
      console.log(err);
    })
});

$('#clearArticle-btn').click(function () {
  document.getElementById('article__title-input').value = "";
  document.getElementById('article__abstract-input').value = "";
  $('ul.flexdatalist-multiple li.value').remove();
  CKEDITOR.instances.editor.setData(null);
  $('input:checked').prop('checked', false)
})