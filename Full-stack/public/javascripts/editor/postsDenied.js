$('.view-reason__btn').click(function(){
    $('#contentReason').empty();
    $('#contentReason').append($(this).attr('reasonDenied'))
})