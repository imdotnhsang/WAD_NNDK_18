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

        const payload = { usernameOrEmail, password };

        postData(`/api/user/login`, payload)
            .then(res => {
                if (res.status != 200) {
                    res.json()
                        .then(err => {
                            console.log(err);

                            let errors = { usernameOrEmail: '', password: '' };

                            if (err.confirmed) {
                                showAuthErrorsModal($(this), 'Login has failed.');
                            }
                            else {
                                updateSignInErrors({ ...errors, ...err });
                            }
                        })
                }
                else if (res.status === 500) {
                    showAuthErrorsModal('Server Error. Please try again!');
                }
                else {
                    res.json().then(account => {
                        switch (account.userType) {
                            case 'administrator':
                                window.location = '/administrator';
                                break;
                            case 'writer':
                                window.location = '/writer';
                                break;
                            case 'editor':
                                window.location = '/editor';
                                break;
                            default:
                                window.location = '/home';
                                break;
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