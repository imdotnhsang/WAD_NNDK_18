$(document).ready(function() {
  $("#js-birthday-input").datepicker({});
});

$(document).on('click', '#js-button-change-password', function(){
  clearChangePasswordErrors();

  if ($('#js-form-change-password').attr("style")) {
    $('#js-form-change-password').show();

    $('#js-currentPassword-input').val('');
    $('#js-newPassword-input').val('');
    $('#js-retypeNewPassword-input').val('');

    $(this).children().removeClass('far fa-edit');
    $(this).children().addClass('fas fa-check');
  } else {
    const errors = {
      currentPassword: '',
      newPassword: '',
      retypeNewPassword: ''
    }

    const currentPassword = $('#js-currentPassword-input').val(),
      newPassword = $('#js-newPassword-input').val(),
      retypeNewPassword = $('#js-retypeNewPassword-input').val();

    if (!currentPassword && !newPassword && !retypeNewPassword) {
      $('#js-form-change-password').removeAttr("style").hide();

      $(this).children().removeClass('fas fa-check');
      $(this).children().addClass('far fa-edit');

      return;
    }

    if (!validatePassword(currentPassword)) {
      errors.currentPassword = 'Password must contain at least 8 characters including uppercase, lowercase and numbers.'
    }

    if (!validatePassword(newPassword)) {
      errors.newPassword = 'Password must contain at least 8 characters including uppercase, lowercase and numbers.'
    }

    if (retypeNewPassword !== newPassword) {
      errors.retypeNewPassword = 'Retype new password must be correct.'
    }

    if(!newPassword || newPassword.length === 0) {
      errors.newPassword = 'New password is required.';
    }

    const isInvalid = errors.currentPassword || errors.newPassword || errors.retypeNewPassword;
    if (isInvalid) {
        updateChangePasswordErrors(errors);
    } else {
      const payload = { 
        email: $('#js-email-input').val(),
        currentPassword,
        newPassword
      }

      postData('/api/user/change-password', payload)
        .then(res => {
          if (res.status === 200) {
            showSuccessModal($(this), 'Change password succesfully.');

            $('#js-form-change-password').removeAttr("style").hide();

            $(this).children().removeClass('fas fa-check');
            $(this).children().addClass('far fa-edit');
          } else if (res.status === 500) {
            showErrorsModal($(this), 'Server Error. Please try again!')
          } else {
            res.json()
              .then(err => {
                if (err.email) {
                  showErrorsModal($(this), 'Fail to change password.');
                } else {
                  updateChangePasswordErrors({...errors, ...err});
                }
              })
          }
        })
    
    }
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
              showErrorsModal($(this), 'Fail to update account.');
            } else {
              updateAccountErrors({...errors, ...err});
            }
          })
      }
    })
});