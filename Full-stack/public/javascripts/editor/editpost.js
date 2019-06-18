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

$('#js-publish-date-select').change(function(){
    if($(this).val()==='selectdate'){
        $('#input_datePublish').show();
    }else{
        $('#input_datePublish').removeAttr("style").hide();
    }
});

$(document).ready(function () {
    $("#js-datePublish-input").datepicker({});
  });