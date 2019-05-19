$(document).ready(function() {
    $("#js-birthday-input").datepicker({});
  });
  
  $(document).on('click', '#js-button-change-password', function(){
    console.log();
  
    if ($('#js-form-change-password').attr("style")) {
      $('#js-form-change-password').show();
  
      $(this).children().removeClass('far fa-edit');
      $(this).children().addClass('fas fa-check');
    } else {
      $('#js-form-change-password').removeAttr("style").hide();
  
      $(this).children().removeClass('fas fa-check');
      $(this).children().addClass('far fa-edit');
    }
  })
  