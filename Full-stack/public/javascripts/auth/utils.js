function checkSpaceInString(sSen) {
    var patt = /\s/g;
    if (sSen.match(patt)) {
        return true;
    }
    return false;
}

function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}

function validateUsername(sUsername) {
    var filter = /^(?=.*[a-z])(?=.{1,})/;
    if (filter.test(sUsername) && checkSpaceInString(sUsername) == false) {
        return true;
    }
    else {
        return false;
    }
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

const validateIsEmpty = (data, keys) => {
    let errors = {};

    for (const key of keys) {
        if (data[key] === undefined || data[key].length === 0) {
            errors[key] = key.charAt(0).toUpperCase() + key.slice(1) + " field is required.";
        }
    }

    return errors;
};

const updateSignInErrors = (errors) => {
    $('#signin__usernameOrEmail-errmsg').text(errors.usernameOrEmail);
    $('#signin__password-errmsg').text(errors.password);
};

const updateSignUpErrors = (errors) => {
    $('#signup__fullname-errmsg').text(errors.fullname);
    $('#signup__username-errmsg').text(errors.username);
    $('#signup__email-errmsg').text(errors.email);
    $('#signup__password-errmsg').text(errors.password);
    $('#signup__pwdRepeat-errmsg').text(errors.retypePassword);
};

const clearSignInErrors = () => {
    let errors = { usernameOrEmail: '', password: '' };
    updateSignInErrors(errors);
};

const clearSignUpErrors = () => {
    let errors = { fullname: '', username: '', email: '', password: '', retypePassword: '' };
    updateSignUpErrors(errors);
};

const showAuthErrorsModal = (curElm, errMsg) => {
    curElm.attr('data-toggle', 'modal');
    curElm.attr('data-target', '#auth-errors__modal');
    $('#auth-errors__modal').modal('show');
    $('#auth-errors__modalContent').html(errMsg);

    $('.auth-errors__modal button').click(function () {
        curElm.removeAttr('data-toggle');
        curElm.removeAttr('data-target');
    });

    $(document).mouseup(function (e) {
        var container = $(".auth-errors__modal");

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            curElm.removeAttr('data-toggle');
            curElm.removeAttr('data-target');
        }
    });
};

const showAuthSuccessModal = (curElm, successMsg) => {
    curElm.attr('data-toggle', 'modal');
    curElm.attr('data-target', '#auth-success__modal');
    $('#auth-errors__modal').modal('show');
    $('#auth-errors__modalContent').html(successMsg);

    $('.auth-success__modal button').click(function () {
        curElm.removeAttr('data-toggle');
        curElm.removeAttr('data-target');
    });

    $(document).mouseup(function (e) {
        var container = $(".auth-success__modal");

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            curElm.removeAttr('data-toggle');
            curElm.removeAttr('data-target');
        }
    });
};