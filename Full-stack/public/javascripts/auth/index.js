// auth
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

const saveJWToken = (isRembember) => {
    if (isRembember) {

    } else {

    }
};

$('#login-tab').click(function () {
    clearSignInErrors();
})

$('#signup-tab').click(function () {
    clearSignUpErrors();
})

$('#signin__btn').click(function (e) {
    e.preventDefault();

    let errors = { usernameOrEmail: '', password: '' };
    let usernameOrEmail = $('#signin__usernameOrEmail').val().trim(),
        password = $('#signin__password').val();

    if (!validateEmail(usernameOrEmail) && !validateUsername(usernameOrEmail)) {
        errors.usernameOrEmail = 'Invalid username or email.'
    }

    if (!validatePassword(password)) {
        errors.password = 'Password must contain at least 8 characters including uppercase, lowercase and numbers.'
    }

    if (usernameOrEmail === undefined || usernameOrEmail.length === 0) {
        errors.usernameOrEmail = 'Username or Email field is required.'
    }

    if (password === undefined || password.length === 0) {
        errors.password = 'Password field is required.'
    }

    const isInvalid = errors.usernameOrEmail || errors.password;
    if (isInvalid) {
        updateSignInErrors(errors)
    } else {
        clearSignInErrors();

        const payload = { usernameOrEmail, password };

        postData(`${window.location.origin}/api/user/login`, payload)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            console.log('Login success: ', data);
                            const isRembember = ($('#signin__remember').prop("checked") === true)
                            saveJWToken(isRembember);

                            showAuthSuccessModal(
                                $(this),
                                `
                                    <p>Login successfully!</p>
                                    <a href="/">Click here to go Home Page</a>
                                `
                            );
                        })
                } else {
                    res.json()
                        .then(err => {
                            let errors = { usernameOrEmail: '', password: '' };

                            if (err.confirmed) {
                                showAuthErrorsModal($(this),
                                    `
                                        <p>${err.confirmed}</p>
                                        <a href="/auth/activation">Click here to Activation.</a>
                                    `
                                );
                            } else {
                                updateSignInErrors({ ...errors, ...err });
                            }
                        })
                }
            })
            .catch(err => {
                console.log(err);
                showAuthErrorsModal($(this), 'Login has failed.');
            });
    }
});

$('#signup__btn').click(function (e) {
    e.preventDefault();
    let errors = { fullname: '', username: '', email: '', password: '', retypePassword: '' };

    let username = $('#signup__username').val().trim(),
        password = $('#signup__password').val(),
        retypePassword = $('#signup__pwdRepeat').val(),
        email = $('#signup__email').val().trim(),
        fullname = $('#signup__fullname').val().trim();

    if (fullname.length < 6) {
        errors.fullname = 'Fullname must contain at least 6 characters.'
    }

    if (!validateUsername(username)) {
        errors.username = 'Username must contain at least 4 characters and cannot contain spaces.';
    }

    if (!validateEmail(email)) {
        errors.email = 'Email must be vaild.'
    }

    if (!validatePassword(password)) {
        errors.password = 'Password must contain at least 8 characters including uppercase, lowercase and numbers.'
    }

    if (retypePassword !== password) {
        errors.retypePassword = 'Retype password must be correct.'
    }

    errors = {
        ...errors,
        ...validateIsEmpty(
            { fullname, username, email, password },
            ['fullname', 'username', 'email', 'password']
        )
    };

    const isInvalid = errors.fullname || errors.username || errors.email || errors.password || errors.retypePassword;
    if (isInvalid) {
        updateSignUpErrors(errors);
    } else {
        const payload = { fullname, username, email, password, userType: 'subscriber' };

        postData(`${window.location.origin}/api/user/register`, payload)
            .then(res => {
                clearSignUpErrors();

                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            console.log(data);

                            showAuthSuccessModal(
                                $(this),
                                `
                                    <p>Register successfully!</p>
                                    <a href="/auth">Click here to Login</a>
                                `
                            );
                        })
                } else {
                    res.json()
                        .then(err => {
                            let errors = { fullname: '', username: '', email: '', password: '', retypePassword: '' };
                            updateSignUpErrors({ ...errors, ...err });
                        })
                }
            })
            .catch(err => {
                console.log(err);
                showAuthErrorsModal($(this), 'Register has failed.');
            });
    }
});

// forgotten-password
var emailReset;
$('#forgotPwd__btn').click(function (e) {
    e.preventDefault();
    var contentCode;
    if ($('#forgotPwd__code').val().trim().length > 0) {
        contentCode = $('#forgotPwd__code').val();
        console.log(contentCode);
        $(this).attr('data-toggle', 'modal');
        $(this).attr('data-target', '#forgotPwd-success__modal');
        $('.forgotPwd-success__modal button').click(function () {
            $('#forgotPwd__btn').removeAttr('data-toggle');
            $('#forgotPwd__btn').removeAttr('data-target');
            window.location = '/auth';
        });
        $(document).mouseup(function (e) {
            var container = $(".forgotPwd-success__modal");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('#forgotPwd__btn').removeAttr('data-toggle');
                $('#forgotPwd__btn').removeAttr('data-target');
            }
            window.location = '/auth';
        });
        emailUser = "";
    } else {
        $(this).attr('data-toggle', 'modal');
        $(this).attr('data-target', '#forgotPwd__modal');
        $('.forgotPwd__modal button').click(function () {
            $('#forgotPwd__btn').removeAttr('data-toggle');
            $('#forgotPwd__btn').removeAttr('data-target');
        });
        $(document).mouseup(function (e) {
            var container = $(".forgotPwd__modal");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('#forgotPwd__btn').removeAttr('data-toggle');
                $('#forgotPwd__btn').removeAttr('data-target');
            }
        });
    }
});

$('#emailForgotPwd__btn').click(function (e) {
    e.preventDefault();
    var contentEmail;
    if (validateEmail($('#emailForgotPwd__input').val())) {
        contentEmail = $('#emailForgotPwd__input').val();
        emailUser = contentEmail;
        $('.forgotPwd').fadeIn(500);
        $('.emailForgotPwd').css('display', 'none');
        $('#emailForgotPwd__text').text(emailUser);
    } else {
        $(this).attr('data-toggle', 'modal');
        $(this).attr('data-target', '#emailForgotPwd__modal');
        $('.emailForgotPwd__modal button').click(function () {
            $('#emailForgotPwd__btn').removeAttr('data-toggle');
            $('#emailForgotPwd__btn').removeAttr('data-target');
        });
        $(document).mouseup(function (e) {
            var container = $(".forgotPwd__modal");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('#emailForgotPwd__btn').removeAttr('data-toggle');
                $('#emailForgotPwd__btn').removeAttr('data-target');
            }
        });
    }
});

// activation

$('#emailActivation__btn').click(function (e) {
    e.preventDefault();
    var emailUser = $('#emailActivation__input').val().trim();

    if (validateEmail(emailUser)) {
        postData(
            `${window.location.origin}/api/user/send-OTP`,
            { email: emailUser, actionType: 'activation' }
        )
            .then(res => {
                if (res.status === 200) {
                    $('.codeActivation').fadeIn(500);
                    $('.emailActivation').css('display', 'none');
                    $('#emailActivation__text').text(emailUser);
                } else {
                    res.json().then(err => showAuthErrorsModal($(this), err.email))
                }
            })
            .catch(err => {
                console.log(err);
                showAuthErrorsModal($(this), 'Fail to send OTP.');
            })
    } else {
        showAuthErrorsModal($(this), 'Your email is invalid.');
    }
});

$('#codeActivation__btn').click(function (e) {
    e.preventDefault();

    let OTPCode = $('#codeActivation__input').val().trim(),
        emailUser = $('#emailActivation__text').text(),
        actionType = 'activation';

    if (OTPCode.length > 0) {
        const payload = { OTPCode, email: emailUser, actionType };

        postData(`${window.location.origin}/api/user/validate-OTP`, payload)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            console.log('Activation success: ', data);
                            showAuthSuccessModal(
                                $(this),
                                `
                                    <p>Activation successfully!</p>
                                    <a href="/auth">Click here to Login.</a>
                                `
                            );
                        })
                } else {
                    res.json()
                        .then(err => {
                            console.log('Activation fail: ', err);

                            const errMsg = err.confirmed || err.email || err.OTPcode || err.expiredAt;
                            showAuthErrorsModal($(this), errMsg);
                        })
                }
            })
            .catch(err => {
                console.log(err);
                showAuthErrorsModal($(this), 'Fail to activation account.');
            });

    } else {
        showAuthErrorsModal($(this), 'OTP code is invalid.')
    }
});