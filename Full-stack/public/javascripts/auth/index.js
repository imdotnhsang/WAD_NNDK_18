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
        postData(`${window.location.origin}/api/user/login`, { usernameOrEmail, password })
            .then(data => {
                console.log(data);
                clearSignInErrors();
            })
            .catch(err => [
                console.log(err)
            ]);
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