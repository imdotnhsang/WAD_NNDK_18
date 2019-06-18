$('.postDenied__btnEdit').click(function () {
    // window.location.assign('edit-post');
    window.location = `/writer/edit-post?id=${$(this).attr('articleid')}`;
});

$('.view-reason__btn').click(function(){
    $('#contentReason').empty();
    $('#contentReason').append($(this).attr('reasonDenied'))
})