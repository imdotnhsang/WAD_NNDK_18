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
});

$('#publishArticle-btn').click(function (e) {
    e.preventDefault();
    $('#publish__modal-background').css('display', 'block');
})

$("#btn_publish_fail").click(function () {
    $('#publish__modal-background').css('display', 'none');
});

$("#btn_publish_success").click(function (e) {
    e.preventDefault();

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

const showSuccessModal = (curElm, successMsg) => {
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