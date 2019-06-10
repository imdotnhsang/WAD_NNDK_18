function checkSpaceInString(sSen) {
  var patt = /\s/g;
  if (sSen.match(patt)) {
    return true;
  }
  return false;
}

function validatePassword(sPassword) {
  var filter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/;
  if (filter.test(sPassword) && checkSpaceInString(sPassword) == false) {
    return true;
  }
  else {
    return false;
  }
}

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
  $('#js-pseudonym-errmsg').text(errors.pseudonym);
};

const clearAccountErrors = () => {
  $('#js-fullname-errmsg').text('');
  $('#js-gender-errmsg').text('');
  $('#js-birthday-errmsg').text('');
  $('#js-pseudonym-errmsg').text('');
};

const updateChangePasswordErrors = (errors) => {
  $('#js-currentPassword-errmsg').text(errors.currentPassword);
  $('#js-newPassword-errmsg').text(errors.newPassword);
  $('#js-retypeNewPassword-errmsg').text(errors.retypeNewPassword);
}

const clearChangePasswordErrors = () => {
  $('#js-currentPassword-errmsg').text('');
  $('#js-newPassword-errmsg').text('');
  $('#js-retypeNewPassword-errmsg').text('');
}