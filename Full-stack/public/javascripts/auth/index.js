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
}

const updateSignUpErrors = (errors) => {
    $('#signup__fullname-errmsg').text(errors.fullname);
    $('#signup__username-errmsg').text(errors.username);
    $('#signup__email-errmsg').text(errors.email);
    $('#signup__password-errmsg').text(errors.password);
    $('#signup__pwdRepeat-errmsg').text(errors.retypePassword);
}

const clearSignInErrors = () => {
    let errors = { usernameOrEmail: '', password: '' };
    updateSignInErrors(errors);
}

const clearSignUpErrors = () => {
    let errors = { fullname: '', username: '', email: '', password: '', retypePassword: '' };
    updateSignUpErrors(errors);
}

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
//        console.log(payload);
        
        postData(`${window.location.origin}/api/user/login`, payload)
            .then(res => {                       
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            console.log('Login success: ', data);
                            // window.location = "/";
                            if ($('#signin__remember').prop("checked") === true) {
                                // save localStorage

                            } else {
                                // save sessionStorage

                            }
                        })
                } else {
                    res.json()
                        .then(err => {
                            let errors = { usernameOrEmail: '', password: '' };

                            if (err.confirmed) {                                
                                $(this).attr('data-toggle', 'modal');
                                $(this).attr('data-target', '#auth-errors__modal');
                                $('#auth-errors__modal').modal('show');
                                $('#auth-errors__modalContent').text(err.confirmed);

                                $('.auth-errors__modal button').click(function () {
                                    $('#signin__btn').removeAttr('data-toggle');
                                    $('#signin__btn').removeAttr('data-target');
                                });

                                $(document).mouseup(function (e) {
                                    var container = $(".auth-errors__modal");

                                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                                        $('#signin__btn').removeAttr('data-toggle');
                                        $('#signin__btn').removeAttr('data-target');
                                    }
                                });
                            } else {
                                updateSignInErrors({ ...errors, ...err });
                            }
                        })
                }
            })
            .catch(err => {
                console.log(err);
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
