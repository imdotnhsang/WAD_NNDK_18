$('#denyArticle-btn').click(function (e) {
    e.preventDefault();
    $('#deny__modal-background').css('display', 'block');
})

$("#btn_deny_fail").click(function () {
    $('#deny__modal-background').css('display', 'none');
});

$("#btn_deny_success").click(function (e) {
    e.preventDefault();
    const reason = $('#js-reason-deny-textarea').val();

    console.log(reason);

    const id = $(this).attr('articleid').trim();
    const editor = $(this).attr('editorId').trim();

    const categories = getArticleCategories();
    const tagListInput = $('.flexdatalist').flexdatalist('value');

    let tagListOld = [];
    let tagListNew = [];

    let idSelect;

    for (let tag of tagListInput) {
        idSelect = $('#edit_tagList').find('option').filter(function () {
            return $(this).html() === tag
        }).val();

        if (idSelect) {
            tagListOld.push(idSelect)
        } else {
            tagListNew.push(tag);
        }
    }

    const isInvalid = !categories.length || !id || !reason;

    if (isInvalid) {
        console.log("isInvalid: ", isInvalid);
        return;
    }

    console.log('tagListOld: ', tagListOld);
    console.log('tagListNew: ', tagListNew);
    console.log('tagListInput: ', tagListInput);

    postData('/api/article/update', { 
        tagListOld, 
        tagListNew, 
        categories, 
        id, 
        reasonDenied: reason,
        editor
    })
        .then(res => {
            const statusCode = res.status;

            switch (statusCode) {
                case 200:
                    res.json().then(article => {
                        console.log(article);
                        showSuccessModalPublishPost($(this), 'Denied post successfully.');
                        window.location = "/editor/posts-unapproved";
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

$('#publishArticle-btn').click(function () {
    $('#publish__modal-background').css('display', 'block');
})

$("#btn_publish_fail").click(function () {
    $('#publish__modal-background').css('display', 'none');
});

const getArticleCategories = () => {
    let result = [];
    const categoryListElm = $("#edit_article__categories-input input:checked").parent();

    for (let categoryElm of categoryListElm) {
        result.push(categoryElm.id);
    }

    return result;
}

const showSuccessModalPublishPost = (curElm, successMsg) => {
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
$("#btn_publish_success").click(function (e) {
    e.preventDefault();
    let errors = { id: '', date: '', time: '' };

    const id = $(this).attr('articleid').trim();
    const editor = $(this).attr('editorId').trim();

    var publishedAt = 0;

    if ($('#js-publish-date-select').find(":selected").val() === 'datenow') {
        publishedAt = Date.now();
    } else {
        publishedAt = new Date($('#js-datePublish-input').val() + " " + $('#js-timePublish-input').val()).getTime();
    }
    console.log(id, publishedAt);

    const categories = getArticleCategories();
    const tagListInput = $('.flexdatalist').flexdatalist('value');

    let tagListOld = [];
    let tagListNew = [];

    let idSelect;

    for (let tag of tagListInput) {
        idSelect = $('#edit_tagList').find('option').filter(function () {
            return $(this).html() === tag
        }).val();

        if (idSelect) {
            tagListOld.push(idSelect)
        } else {
            tagListNew.push(tag);
        }
    }

    const isInvalid = !categories.length || !id || !publishedAt;

    if (isInvalid) {
        console.log("isInvalid: ", isInvalid);
        return;
    }

    console.log('tagListOld: ', tagListOld);
    console.log('tagListNew: ', tagListNew);
    console.log('tagListInput: ', tagListInput);

    postData('/api/article/update', { 
        tagListOld, 
        tagListNew, 
        categories, 
        id, 
        publishedAt, 
        process: "published" ,
        editor
    })
        .then(res => {
            const statusCode = res.status;

            switch (statusCode) {
                case 200:
                    res.json().then(article => {
                        console.log(article);
                        showSuccessModalPublishPost($(this), 'Published post successfully.');
                        window.location = "/editor/posts-unapproved";
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

$('#js-publish-date-select').change(function () {
    if ($(this).val() === 'selectdate') {
        $('#input_datePublish').show();
    } else {
        $('#input_datePublish').removeAttr("style").hide();
    }
});

$(document).ready(function () {
    $("#js-datePublish-input").datepicker({});
});

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