$('#js-user-type-select').change(function () {
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

$('#js-right-addUser-select').change(function(){
    if($(this).val()==="writer"){
        $('#js-pseudonym-addUser-input').removeAttr('disabled');
    }else{
        $('#js-pseudonym-addUser-input').attr('disabled','true');
    }
});

$('#js-add-user').click(function () {
    $('#addUser__modal-background').css('display', 'block');
})

$("#btn_addUser_fail").click(function () {
    $('#addUser__modal-background').css('display', 'none');
});

$("#btn_addUser_success").click(function (e) {
    e.preventDefault();
    
    const email = $('#js-email-addUser-input').val();
    const fullname = $('js-fullname-addUser-input').val()
    console.log(email,fullname);

    $('#addUser__modal-background').css('display', 'none');
});
$(document).ready(function () {
    $("#js-birthday-input").datepicker({});
  });