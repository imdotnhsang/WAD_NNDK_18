$('#postDenied__btnEdit').click(function(){
// window.location.assign('edit-post');
window.location = `/writer/edit-post?id=${$(this).attr('articleId')}`;
});