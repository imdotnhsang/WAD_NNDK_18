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
//check validate information update
const addUserErrors = (errors) => {
    $('#js-fullname-addUser-errmsg').text(errors.fullname);
    $('#js-username-addUser-errmsg').text(errors.username);
    $('#js-email-addUser-errmsg').text(errors.email);
    $('#js-password-addUser-errmsg').text(errors.password);
    $('#js-retypePassword-addUser-errmsg').text(errors.retypePassword);
    $('#js-right-addUser-errmsg').text(errors.typeUser);
    $('#js-pseudonym-addUser-errmsg').text(errors.pseudonym);
};

const clearAddUserErrors = () => {
    let errors = { fullname: '', username: '', email: '', password: '', retypePassword: '', typeUser: '', pseudonym: '' };
    addUserErrors(errors);
};
const showAddUserErrorsModal = (curElm, errMsg) => {
    curElm.attr('data-toggle', 'modal');
    curElm.attr('data-target', '#adduser-errors__modal');
    $('#adduser-errors__modal').modal('show');
    $('#adduser-errors__modalContent').html(errMsg);

    $('.adduser-errors__modal button').click(function () {
        curElm.removeAttr('data-toggle');
        curElm.removeAttr('data-target');
    });

    $(document).mouseup(function (e) {
        var container = $(".adduser-errors__modal");

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            curElm.removeAttr('data-toggle');
            curElm.removeAttr('data-target');
        }
    });
};
const validateIsEmpty = (data, keys) => {
    let errors = {};

    for (const key of keys) {
        if (data[key] === undefined || data[key].length === 0) {
            errors[key] = key.charAt(0).toUpperCase() + key.slice(1) + " field is required.";
        }
    }

    return errors;
};

$('#js-user-type-select').change(function () {
    let valSelected = $(this).val();

    switch (valSelected) {
        case "subscriber":
            $('#js-writer-table').removeAttr("style").hide();
            $('#js-editor-table').removeAttr("style").hide();
            $('#js-subscriber-table').show();
            window.location="/administrator/users?right=subscriber"
        
            break;
        case "writer":
            $('#js-subscriber-table').removeAttr("style").hide();
            $('#js-editor-table').removeAttr("style").hide();
            $('#js-writer-table').show();
            window.location="/administrator/users?right=writer"
            break;
        case "editor":
            $('#js-subscriber-table').removeAttr("style").hide();
            $('#js-writer-table').removeAttr("style").hide();
            $('#js-editor-table').show();
            window.location="/administrator/users?right=editor"
            break;
    }
});

$('#js-right-addUser-select').change(function () {
    $('#js-pseudonym-addUser-input').val('');

    if ($(this).val() === "writer") {
        $('#js-pseudonym-form').show();
        $('#js-categoryManage-form').removeAttr("style").hide();
    } else if($(this).val() === "editor"){
        $('#js-pseudonym-form').removeAttr("style").hide();
        $('#js-categoryManage-form').show()
    }else{
        $('#js-pseudonym-form').removeAttr("style").hide();
        $('#js-categoryManage-form').removeAttr("style").hide();    
    }

});

$('#js-add-user').click(function () {
    $('#addUser__modal-background').css('display', 'block');
})

$("#btn_addUser_fail").click(function () {
    $('#addUser__modal-background').css('display', 'none');
});

$("#btn_addUser_success").click(function (e) {
    e.preventDefault();
    let errors = { fullname: '', username: '', email: '', password: '', retypePassword: '', pseudonym: '', typeUser: '' };
    const fullname = $('#js-fullname-addUser-input').val()
    const email = $('#js-email-addUser-input').val();
    const username = $('#js-username-addUser-input').val()
    const password = $('#js-password-addUser-input').val()
    const retypePassword = $('#js-retypePassword-addUser-input').val()
    const pseudonym = $('#js-pseudonym-addUser-input').val()
    const typeUser = $('#js-right-addUser-select').find(":selected").val();
    const categoryManage = $('#js-categoryManage-addUser-select').find(":selected").val();
    console.log(email, fullname, username, password, retypePassword, pseudonym, typeUser, categoryManage);

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

    if (typeUser === "") {
        errors.typeUser = "You must choose a type."
    }

    if (typeUser === "writer") {
        if (pseudonym.length < 6 && pseudonym.length <= 23) {
            errors.pseudonym = "Pseudonym must be between 6 and 23 characters long."
        }
    }

    errors = {
        ...errors,
        ...validateIsEmpty(
            { fullname, username, email, password, typeUser, pseudonym },
            ['fullname', 'username', 'email', 'password', 'typeUser', 'pseudonym']
        )
    };
    const isInvalid=errors.fullname || errors.username || errors.email || errors.password || errors.retypePassword || errors.typeUser;
    if (typeUser === "writer") {
        isInvalid = errors.fullname || errors.username || errors.email || errors.password || errors.retypePassword || errors.typeUser || errors.pseudonym;
    }
    if (isInvalid) {
        addUserErrors(errors);
    } else {
        const payload = { fullname, username, email, password, userType: typeUser, pseudonym, categoriesManagement:categoryManage };

        postData(`/api/user/register`, payload)
            .then(res => {
                clearAddUserErrors();
                if (res.status === 200) {
                    $('#adduser-success__modal').attr('data-toggle', 'modal');
                    $('#adduser-success__modal').attr('data-target', '#adduser-success__modal');
                    $('#adduser-success__modal').modal('show');
                    $('#adduser-success__modalContent').html('Added successfully!!!');
                    $('.adduser-success__modal button').click(function () {
                        $('#adduser-success__modal').removeAttr('data-toggle');
                        $('#adduser-success__modal').removeAttr('data-target');
                    });

                    $(document).mouseup(function (e) {
                        var container = $(".adduser-success__modal");
                        if (!container.is(e.target) && container.has(e.target).length === 0) {
                            $('#adduser-success__modal').removeAttr('data-toggle');
                            $('#adduser-success__modal').removeAttr('data-target');
                        }
                    });
                    $('#addUser__modal-background').css('display', 'none');
                }
                else if (res.status === 500) {
                    showAddUserErrorsModal($(this), 'Server Error. Please try again!');
                } else {
                    res.json().then(err => {
                        const errMsg = err.email || err.fullname || 'Anything error.';
                        showAddUserErrorsModal($(this), errMsg);
                    });
                }
            })
            .catch(err => {
                console.log(err);
                showAddUserErrorsModal($(this), 'Register has failed.');
            });
    }
});
// $(document).ready(function () {
//     $("#js-birthday-input").datepicker({});
// });
// function formatDateTypeAbstract(msDate) {
//     var temp = new Date(Number(msDate));
//     return ((temp.getMonth() + 1) + '/' + temp.getDate() + '/' + (temp.getFullYear()));

// }
// var formatDateBod = document.querySelectorAll('.date_bod');
// for (j = 0; j < formatDateBod.length; j++) {
//     formatDateBod[j].innerHTML = formatDateTypeAbstract(formatDateBod[j].innerHTML);
// };
// var formatDateBod = document.querySelectorAll('.date_expired');
// for (j = 0; j < formatDateBod.length; j++) {
//     formatDateBod[j].innerHTML = formatDateTypeAbstract(formatDateBod[j].innerHTML);
// };

$('.btn-renew-mangageuser').click(function(e){
    e.preventDefault();
    
    var emailUser = $(this).attr('email');
    console.log(emailUser);
    const payload = { email: emailUser, renewTime: 604800000 };
    postData(`/api/user/renew-premium`, payload)
        .then(res => {
            if (res.status === 200) {
                // window.location = '/administrator/user';
                $(this).hide();
            } else if (res.status === 500) {
                showAddUserErrorsModal($(this), 'Server Error. Please try again!');
            } else {
                res.json().then(err =>  showAddUserErrorsModal($(this), err.email))
            }
        })
})