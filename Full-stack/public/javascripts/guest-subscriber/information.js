const showInformationErrorsModal = (curElm, errMsg) => {
    curElm.attr('data-toggle', 'modal');
    curElm.attr('data-target', '#information-errors__modal');
    $('#information-errors__modal').modal('show');
    $('#information-errors__modalContent').html(errMsg);

    $('.information-errors__modal button').click(function () {
        curElm.removeAttr('data-toggle');
        curElm.removeAttr('data-target');
    });

    $(document).mouseup(function (e) {
        var container = $(".information-errors__modal");

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            curElm.removeAttr('data-toggle');
            curElm.removeAttr('data-target');
        }
    });
};

$('#renew__subscriber-btn').click(function (e) {
    e.preventDefault();
    var emailUser = $('#renew__subscriber-email').html();
    console.log(emailUser);
    const payload = { email: emailUser, renewTime: 604800000 };
    postData(`/api/user/renew-premium`, payload)
        .then(res => {
            if (res.status === 200) {
                window.location = '/information';
            } else if (res.status === 500) {
                showInformationErrorsModal('Server Error. Please try again!');
            } else {
                res.json().then(err => showInformationErrorsModal($(this), err.email))
            }
        })
});

$("#btn_changeAvatar_success").click(function (e) {
    e.preventDefault();
    var reader = new FileReader();
    reader.onload = function (e) {
        $('#profile-avatar').attr('src', e.target.result);
    }
    reader.readAsDataURL(image_change);

    const email = $('#updateInf__email').val();
    const formData = new FormData();

    formData.append('avatar', image_change);
    formData.append('email', email);

    fetch(
        '/api/user/upload-avatar', {
            method: 'POST',
            body: formData,
        })
        .then(res => {
            const statusCode = res.status;

            switch (statusCode) {
                case 200:
                    res.json().then(account => {
                        $('.img-avatar img').attr('src', account.avatar);
                        $('#btn-open-informationUser img').attr('src', account.avatar);
                    })
                    break;

                default:
                    console.log('fail');

                    break;
            }
        })

    $('#changeAvatar__modal-background').css('display', 'none');
});

$('#updatePwd__btn').click(function (e) {
    e.preventDefault();
    let errors = { oldPassword: '', newPassword: '', retypePassword: '' };

    let oldPassword = $('#updatePwd__pwdOld').val(),
        newPassword = $('#updatePwd__pwdNew').val(),
        retypePassword = $('#updatePwd__pwdNewRe').val();
    var emailUser = $('#renew__subscriber-email').html();

    if (!validatePassword(oldPassword)) {
        errors.oldPassword = 'Password must contain at least 8 characters including uppercase, lowercase and numbers.'
    }

    if (!validatePassword(newPassword)) {
        errors.newPassword = 'Password must contain at least 8 characters including uppercase, lowercase and numbers.'
    }
    if (newPassword === oldPassword) {
        errors.newPassword = "New password must be different from old password."
    }
    if (retypePassword !== newPassword) {
        errors.retypePassword = 'Retype password must be correct.'
    }

    errors = {
        ...errors,
        ...validateIsEmpty(
            { oldPassword, newPassword, retypePassword },
            ['oldPassword', 'newPassword', 'retypePassword']
        )
    };
    const isInvalid = errors.oldPassword || errors.newPassword || errors.retypePassword;
    if (isInvalid) {
        updateChangePasswordErrors(errors);
    } else {
        const payload = { email: emailUser, currentPassword: oldPassword, newPassword };
        postData(`/api/user/change-password`, payload)
            .then(res => {
                clearChangePasswordErrors();
                if (res.status === 200) {
                    $('#information-success__modal').attr('data-toggle', 'modal');
                    $('#information-success__modal').attr('data-target', '#information-success__modal');
                    $('#information-success__modal').modal('show');
                    $('#information-success__modalContent').html('Changed password succesfully!!!');
                    $('.information-success__modal button').click(function () {
                        $('#information-success__modal').removeAttr('data-toggle');
                        $('#information-success__modal').removeAttr('data-target');
                    });

                    $(document).mouseup(function (e) {
                        var container = $(".information-success__modal");

                        if (!container.is(e.target) && container.has(e.target).length === 0) {
                            $('#information-success__modal').removeAttr('data-toggle');
                            $('#information-success__modal').removeAttr('data-target');
                        }
                    });
                    document.getElementById('updatePwd__pwdOld').value = '';
                    document.getElementById('updatePwd__pwdNew').value = '';
                    document.getElementById('updatePwd__pwdNewRe').value = '';
                } else if (res.status === 500) {
                    showInformationErrorsModal('Server Error. Please try again!');
                } else {
                    res.json().then(err => {
                        const errMsg = err.email || err.currentPassword || 'Anything error.';
                        showInformationErrorsModal($(this), errMsg);
                    });
                }
            })
    }
});

$('#updateInf__btn').click(function (e) {
    e.preventDefault();

    let errors = { fullname: '', gender: '', birthOfday: '' };

    let gender = $('#updateInf__gender').val(),
        birthOfday = $('#updateInf__bod').val(),
        fullname = $('#updateInf__fullname').val(),
        email = $('#updateInf__email').val();

    if (fullname.length < 6 && fullname.length <= 23) {
        errors.fullname = 'Fullname must be between 6 and 23 characters long.'
    }

    if (gender >= 2) {
        errors.gender = 'You must choose a gender.'
    }

    if (new Date(birthOfday).getTime() < 0) {
        errors.birthOfday = "You must choose your birthday."
    }
    errors = {
        ...errors,
        ...validateIsEmpty(
            { fullname, gender, birthOfday },
            ['fullname', 'gender', 'birthOfday']
        )
    };

    const isInvalid = errors.fullname || errors.gender || errors.birthOfday;
    if (isInvalid) {
        updateEditProfileErrors(errors);
    } else {

        const payload = { email, fullname, gender, birthday: new Date(birthOfday).getTime() };
        switch (gender) {
            case '0':
                payload.gender = false;
                break;

            case '1':
                payload.gender = true;
            default:
                break;
        }
        postData(`/api/user/update`, payload)
            .then(res => {
                clearEditProfileErrors();
                if (res.status === 200) {
                    $('#information-success__modal').attr('data-toggle', 'modal');
                    $('#information-success__modal').attr('data-target', '#information-success__modal');
                    $('#information-success__modal').modal('show');
                    $('#information-success__modalContent').html('Changed information succesfully!!!');
                    $('.information-success__modal button').click(function () {
                        $('#information-success__modal').removeAttr('data-toggle');
                        $('#information-success__modal').removeAttr('data-target');
                    });

                    $(document).mouseup(function (e) {
                        var container = $(".information-success__modal");

                        if (!container.is(e.target) && container.has(e.target).length === 0) {
                            $('#information-success__modal').removeAttr('data-toggle');
                            $('#information-success__modal').removeAttr('data-target');
                        }
                    });
                    res.json().then(account => {
                        $('#fullname_account').html(account.fullname);
                        $('#gend_acccount').html(account.gender ? 'Female' : 'Male');
                        $('#bod_acccount').html(account.birthday);
                        $('#bod_acccount').html(formatDateTypeBOD($('#bod_acccount').html()));
                    })
                } else if (res.status === 500) {
                    showInformationErrorsModal('Server Error. Please try again!');
                } else {
                    res.json().then(err => {
                        const errMsg = err.email || err.fullname || err.gender || err.birthday || 'Anything error.';
                        showInformationErrorsModal($(this), errMsg);
                    });
                }
            })
    }
});