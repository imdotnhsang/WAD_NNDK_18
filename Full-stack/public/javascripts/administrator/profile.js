const showSuccessModal = (curElm, successMsg) => {
  curElm.attr('data-toggle', 'modal');
  curElm.attr('data-target', '#success__modal');
  $('#success__modal').modal('show');
  $('#success__modalContent').html(successMsg);

  $('.success__modal button').click(function () {
      curElm.removeAttr('data-toggle');
      curElm.removeAttr('data-target');
  });

  $(document).mouseup(function (e) {
      var container = $(".success__modal");

      if (!container.is(e.target) && container.has(e.target).length === 0) {
          curElm.removeAttr('data-toggle');
          curElm.removeAttr('data-target');
      }
  });
};

const showErrorsModal = (curElm, errMsg) => {
  curElm.attr('data-toggle', 'modal');
  curElm.attr('data-target', '#errors__modal');
  $('#errors__modal').modal('show');
  $('#errors__modalContent').html(errMsg);

  $('.errors__modal button').click(function () {
      curElm.removeAttr('data-toggle');
      curElm.removeAttr('data-target');
  });

  $(document).mouseup(function (e) {
      var container = $(".errors__modal");

      if (!container.is(e.target) && container.has(e.target).length === 0) {
          curElm.removeAttr('data-toggle');
          curElm.removeAttr('data-target');
      }
  });
};

const updateAccountErrors = (errors) => {
  $('#js-fullname-errmsg').text(errors.fullname);
  $('#js-gender-errmsg').text(errors.gender);
  $('#js-birthday-errmsg').text(errors.birthday);
};

const clearAccountErrors = () => {
  $('#js-fullname-errmsg').text('');
  $('#js-gender-errmsg').text('');
  $('#js-birthday-errmsg').text('');
};


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

$('#js-update-account-btn').on('click', (e) => {
  e.preventDefault();
  clearAccountErrors();

  const payload = {};
  const errors = {
    fullname: '',
    gender: '',
    birthday: ''
  }

  let fullname = $('#js-fullname-input').val(),
    genderStr = $('#js-gender-select').val(),
    birthdayStr = $('#js-birthday-input').val(),
    email = $('#js-email-input').val();

  switch (genderStr) {
    case 'false':
      payload.gender = false;
      break;
  
    case 'true':
      payload.gender = true;

      default:
      break;
  }

  const birthdayMS = new Date(birthdayStr).getTime();
  if (birthdayMS !== NaN) {
    payload.birthday = birthdayMS;
  }
  
  payload.fullname = fullname;
  payload.email = email;

  postData('/api/user/update', payload)
    .then(res => {
      if (res.status === 200) {
        showSuccessModal($(this), 'Update account successfully!');
      }
      else if(res.status === 500) {
        showErrorsModal($(this), 'Server Error. Please try again!')
      }
      else {
        // console.log('Fail');
        res.json()
          .then(err => {
            if (err.email) {
              showErrorsModal('Fail to update account.');
            } else {
              updateAccountErrors({...errors, ...err});
            }
          })
      }
    })
});