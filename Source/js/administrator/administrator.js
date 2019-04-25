$('.js-edit-input').click(function() {
    let inputTag = $(this).parent().parent().children('input');

    if (inputTag.attr('disabled')) {
        inputTag.removeAttr('disabled')
        $(this).children().removeClass('far fa-edit');
        $(this).children().addClass('fas fa-check');
    } else {
        inputTag.prop('disabled', 'true')
        $(this).children().removeClass('fas fa-check');
        $(this).children().addClass('far fa-edit');
    }
});

$('.js-delete-input').click(function() {
    let liTag = $(this).parent().parent().parent();
    liTag.remove();
});


$('#js-user-type-select').change(function() {
    let valSelected = $(this).val();
    
    switch (valSelected) {
        case "subscriber":
            $('#js-writer-table').removeAttr("style").hide();
            $('#js-editor-table').removeAttr("style").hide();
            $('#js-subscriber-table').show();
            break;
        case "writer":
            $('#js-subscriber-table').removeAttr("style").hide();
            $('#js-editor-table').removeAttr("style").hide();
            $('#js-writer-table').show();
            break;
        case "editor":
            $('#js-subscriber-table').removeAttr("style").hide();
            $('#js-writer-table').removeAttr("style").hide();
            $('#js-editor-table').show();
            break;
    }
});



