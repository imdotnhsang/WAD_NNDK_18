import { resolveSoa } from "dns";

// auth
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
        updateSignInErrors(errors);
    } else {
        clearSignInErrors();

        const isRemember = ($('#signin__remember').prop("checked") === true)
        const payload = { usernameOrEmail, password, isRemember };

        postData(`/api/user/login`, payload)
            .then(res => {
                if (res.status == 200) {
                    window.location = '/home';

                }
                else if (res.status === 500) {
                    showAuthErrorsModal('Server Error. Please try again!');
                }
                else {
                    res.json()
                        .then(err => {
                            let errors = { usernameOrEmail: '', password: '' };

                            if (err.confirmed) {
                                $('.activation').css('display', 'block')
                                $('.emailActivation').fadeIn(500);
                                $('.sign-up_sign-in').css('display', 'none');
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

    if (fullname.length < 6 && fullname.length <= 23) {
        errors.fullname = 'Fullname must be between 6 and 23 characters long.'
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

        postData(`/api/user/register`, payload)
            .then(res => {
                clearSignUpErrors();

                if (res.status === 200) {
                    $('.activation').css('display', 'block')
                    emailActivation = $('#signup__email').val();
                    $('.codeActivation').fadeIn(500);
                    $('.sign-up_sign-in').css('display', 'none');
                    $('#emailActivation__text').text(emailActivation);
                    $('#title-page-sign').text('activation');
                }
                else if (res.status === 500) {
                    showAuthErrorsModal('Server Error. Please try again!');
                } else {
                    res.json()
                        .then(err => {
                            let errors = { fullname: '', username: '', email: '', password: '', retypePassword: '' };
                            updateSignUpErrors({ ...errors, ...err });
                        });
                }
            })
            .catch(err => {
                console.log(err);
                showAuthErrorsModal($(this), 'Register has failed.');
            });
    }
});


// activation
$('#emailActivation__btn').click(function (e) {
    e.preventDefault();
    var emailUser = $('#emailActivation__input').val().trim();

    if (validateEmail(emailUser)) {
        postData(
            `/api/user/send-OTP`,
            { email: emailUser, actionType: 'activation' }
        )
            .then(res => {
                if (res.status === 200) {
                    $('.codeActivation').fadeIn(500);
                    $('.emailActivation').css('display', 'none');
                    $('#emailActivation__text').text(emailUser);
                }
                else if (res.status === 500) {
                    showAuthErrorsModal('Server Error. Please try again!');
                }
                else {
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

        postData(`/api/user/validate-OTP`, payload)
            .then(res => {
                if (res.status === 200) {
                    window.location = '/auth';
                }
                else if (res.status === 500) {
                    showAuthErrorsModal('Server Error. Please try again!');
                }
                else {
                    res.json()
                        .then(err => {
                            console.log('Activation fail: ', err);

                            const errMsg = err.confirmed || err.email || err.OTPcode || err.expiredAt;
                            showAuthErrorsModal($(this), errMsg);
                        });
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

// forgotten-password
$('#emailForgotPwd__btn').click(function (e) {
    e.preventDefault();

    let emailUser = $('#emailForgotPwd__input').val().trim();

    if (validateEmail(emailUser)) {
        postData(
            `/api/user/send-OTP`,
            { email: emailUser, actionType: 'forgottenPassword' }
        )
            .then(res => {
                if (res.status === 200) {
                    $('.forgotPwd').fadeIn(500);
                    $('.emailForgotPwd').css('display', 'none');
                    $('#emailForgotPwd__text').text(emailUser);
                }
                else if (res.status === 500) {
                    showAuthErrorsModal('Server Error. Please try again!');
                }
                else {
                    res.json().then(err => showAuthErrorsModal($(this), err.email))
                }
            })
            .catch(err => {
                console.log(err);
                showAuthErrorsModal($(this), 'Fail to send OTP.');
            });
    } else {
        showAuthErrorsModal($(this), 'Your email is invalid.');
    }
});

$('#forgotPwd__btn').click(function (e) {
    e.preventDefault();
    const errors = {};
    let errMsg;

    let OTPCode = $('#forgotPwd__code').val().trim(),
        emailUser = $('#emailForgotPwd__text').text(),
        newPasssword = $('#forgotPwd__newPassword').val(),
        retypeNewPasssword = $('#forgotPwd__retypeNewPassword').val(),
        actionType = 'forgottenPassword'

    if (OTPCode.length !== 6) {
        errors.OTPcode = 'OTP code is invalid.'
    }

    if (!validatePassword(newPasssword)) {
        errors.newPasssword = 'New password must contain at least 8 characters including uppercase, lowercase and numbers.'
    }

    if (retypeNewPasssword !== newPasssword) {
        errors.retypeNewPasssword = 'Retype new password must be correct.'
    }

    const isInvalid = Object.keys(errors).length;

    if (isInvalid) {
        errMsg = errors.OTPcode || errors.newPasssword || errors.retypeNewPasssword;
        showAuthErrorsModal($(this), errMsg)
    } else {
        const payload = { OTPCode, email: emailUser, actionType, password: newPasssword };

        postData(`/api/user/validate-OTP`, payload)
            .then(res => {
                if (res.status === 200) {
                    window.location = '/auth';
                }
                else if (res.status === 500) {
                    showAuthErrorsModal('Server Error. Please try again!');
                }
                else {
                    res.json()
                        .then(err => {
                            errMsg = err.email || err.OTPcode || err.expiredAt || 'Recovery password fail.';
                            showAuthErrorsModal($(this), errMsg);
                        });
                }
            })
    }
});