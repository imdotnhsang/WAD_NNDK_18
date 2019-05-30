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

const validateIsEmpty = (data, keys) => {
    let errors = {};

    for (const key of keys) {
        if (data[key] === undefined || data[key].length === 0) {
            errors[key] = key.charAt(0).toUpperCase() + key.slice(1) + " field is required.";
        }
    }

    return errors;
};

//navbar logo
$('.logo').click(function () {
    location.reload();
});

//check change of display
var currentWidth = $(window).width();
$(window).resize(function () {
    if ((currentWidth <= 993 & $(window).width() > 993) || (currentWidth > 993 & $(window).width() <= 993)) {
        location.reload();
    }
});

//menu responsive
var checkHamburger = false;
$('.hamburger').click(function () {
    if (checkHamburger == false) {
        $(this).addClass("toggle");
        $('.nav-link-custom').click(function () {
            $(this).parent().children('ul').slideToggle();
            var index = $(this).parent().val();
            var checkO = $(this).parent().attr("checkOpen");
            if (checkO == 'false') {
                $('.navbar-nav-custom li:nth-child(' + index + ') a.nav-link-custom i').css('color', '#fff');
                $('.navbar-nav-custom li:nth-child(' + index + ') a.nav-link-custom i').css('transform', 'rotate(-180deg)');
                $(this).parent().attr("checkOpen", "true");
            } else {
                $('.navbar-nav-custom li:nth-child(' + index + ') a.nav-link-custom i').css('color', '#e5127d');
                $('.navbar-nav-custom li:nth-child(' + index + ') a.nav-link-custom i').css('transform', 'rotate(0deg)');
                $(this).parent().attr("checkOpen", "false");
            }
        });
        checkHamburger = true;
    } else {
        $(this).removeClass("toggle");
        $('.nav-link-custom').off('click');
        checkHamburger = false;
    }
});

//open or close search box
$('#btn-open-searchBox').click(function () {
    var checkO = $(this).attr('checkOpen');
    if (checkO == 'false') {
        $('.search-bar').css('visibility', 'visible');
        $('.search-bar').css('opacity', '1');
        $('.search-bar').css('transform', 'translate(0,0)');
        $(this).children('.line-x').fadeIn(500);
        $(this).attr('checkOpen', 'true');

    } else {
        $('.search-bar').css('transform', 'translate(0,-50%)');
        $('.search-bar').css('visibility', 'hidden');
        $('.search-bar').css('opacity', '0');
        $(this).children('.line-x').fadeOut(500);
        $(this).attr('checkOpen', 'false');
    }
    // $(document).mouseup(function (e) {
    //     var container = $(".search-bar");
    //     if (!container.is(e.target) && container.has(e.target).length === 0) {
    //         $('.search-bar').css('transform', 'translate(0,-50%)');
    //         $('.search-bar').css('visibility', 'hidden');
    //         $('.search-bar').css('opacity', '0');
    //         $('#btn-open-searchBox').children('.line-x').fadeOut(500);
    //         $('#btn-open-searchBox').attr('checkOpen', 'false');
    //     }
    // });
});

//open or close information box
$('#btn-open-informationUser').click(function () {
    var checkO = $(this).attr('checkOpen');
    if (checkO == 'false') {
        $('.information-user').fadeIn(300);
        $(this).attr('checkOpen', 'true');
    } else {
        $('.information-user').fadeOut(300);
        $(this).attr('checkOpen', 'false');
    }
});

//control help page to scroll to top
$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll-top').fadeIn(500);

        } else {
            $('#scroll-top').fadeOut(500);
        }
    });

    $('#scroll-top button').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        if ($(window).width() < 993) {
            $('#scroll-top button').css('background-color', '#e5127d');
        }
    });
});

//slideshow of top hot news
var owl;
var widthItem;
$(document).ready(function () {
    owl = $('.owl-carousel-slide-top-5-hot-news').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        nav: false,
        dots: false,
        items: 1,
        responsiveClass: true,
        responsive: {
            0: {
                margin: 8
            },
            576: {
                margin: 10
            }
        }
    });
});

//change avatar
var image_change;
$("#pic-avatar").change(function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#avatar-change').attr('src', e.target.result);
        }
        $('#changeAvatar__modal-background').css('display', 'block');
        image_change = this.files[0];
        reader.readAsDataURL(this.files[0]);
    }
});

$("#btn_changeAvatar_fail").click(function () {
    $('#changeAvatar__modal-background').css('display', 'none');
});
$("#btn_changeAvatar_success").click(function (e) {
    e.preventDefault();
    var reader = new FileReader();
    reader.onload = function (e) {
        $('#profile-avatar').attr('src', e.target.result);
    }
    reader.readAsDataURL(image_change);
    $('#changeAvatar__modal-background').css('display', 'none');
});



//check validate search bar
$('#searchBar__btn').click(function (e) {
    e.preventDefault();
    var keySearch;
    if ($('#searchBar__content').val().trim().length > 0) {
        keySearch = $('#searchBar__content').val();
        console.log(keySearch);
        document.getElementById('searchBar__content').value = '';
    } else {
        $(this).attr('data-toggle', 'modal');
        $(this).attr('data-target', '#search__modal');
        $('.search__modal button').click(function () {
            $('#searchBar__btn').removeAttr('data-toggle');
            $('#searchBar__btn').removeAttr('data-target');
        });
        $(document).mouseup(function (e) {
            var container = $(".search__modal");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('#searchBar__btn').removeAttr('data-toggle');
                $('#searchBar__btn').removeAttr('data-target');
            }
        });
    }
});

//check validate search page
$('#searchPage__btn').click(function (e) {
    e.preventDefault();
    var keySearch;
    if ($('#searchPage__content').val().trim().length > 0) {
        keySearch = $('#searchPage__content').val();
        console.log(keySearch);
        document.getElementById('searchBar__content').value = '';
    } else {
        $(this).attr('data-toggle', 'modal');
        $(this).attr('data-target', '#search__modal');
        $('.search__modal button').click(function () {
            $('#searchPage__btn').removeAttr('data-toggle');
            $('#searchPage__btn').removeAttr('data-target');
        });
        $(document).mouseup(function (e) {
            var container = $(".search__modal");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('#searchPage__btn').removeAttr('data-toggle');
                $('#searchPage__btn').removeAttr('data-target');
            }
        });
    }
});

//move tab edit profile
$('#btn_updateInfTab').click(function () {
    $('#home').removeClass('show');
    $('#home').removeClass('active');
    $('#home-tab').removeClass('active');
    $('#edit_profile').addClass('show');
    $('#edit_profile').addClass('active');
    $('#edit_profile-tab').addClass('active');
});

//check validate information update
const updateEditProfileErrors = (errors) => {
    $('#editprofile__fullname-errmsg').text(errors.fullname);
    $('#editprofile__gender-errmsg').text(errors.gender);
    $('#editprofile__bod-errmsg').text(errors.birthOfday);
};

$('#updateInf__btn').click(function (e) {
    e.preventDefault();

    let errors = { fullname: '', gender: '', birthOfday: '' };

    let gender = $('#updateInf__gender').val(),
        birthOfday = $('#updateInf__bod').val(),
        fullname = $('#updateInf__fullname').val();

    if (fullname.length < 6 && fullname.length <= 23) {
        errors.fullname = 'Fullname must be between 6 and 23 characters long.'
    }

    if (gender == 0) {
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
        clearEditProfileErrors();
        console.log(fullname, gender, birthOfday);
    }
});

const clearEditProfileErrors = () => {
    let errors = { fullname: '', gender: '', birthOfday: '' };
    updateEditProfileErrors(errors);
};

//check validate change password
const updateChangePasswordErrors = (errors) => {
    $('#changePassword__oldPwd-errmsg').text(errors.oldPassword);
    $('#changePassword__newPwd-errmsg').text(errors.newPassword);
    $('#changePassword__rePwd-errmsg').text(errors.retypePassword);
};

const clearChangePasswordErrors = () => {
    let errors = { oldPassword: '', newPassword: '', retypePassword: '' };
    updateChangePasswordErrors(errors);
};

$('#updatePwd__btn').click(function (e) {
    e.preventDefault();
    let errors = { oldPassword: '', newPassword: '', retypePassword: '' };

    let oldPassword = $('#updatePwd__pwdOld').val(),
        newPassword = $('#updatePwd__pwdNew').val(),
        retypePassword = $('#updatePwd__pwdNewRe').val();

    if (!validatePassword(oldPassword)) {
        errors.oldPassword = 'Password must contain at least 8 characters including uppercase, lowercase and numbers.'
    }

    if (!validatePassword(newPassword)) {
        errors.newPassword = 'Password must contain at least 8 characters including uppercase, lowercase and numbers.'
    }
if(newPassword === oldPassword){
    errors.newPassword="New password must be different from old password."
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
        clearChangePasswordErrors();
        console.log(newPassword)
    }
});

$('#updatePwd__btnCancel').click(function (e) {
    document.getElementById('updatePwd__pwdOld').value = '';
    document.getElementById('updatePwd__pwdNew').value = '';
    document.getElementById('updatePwd__pwdNewRe').value = '';
    clearChangePasswordErrors();
})

//check comment
$('#comment__btn').click(function (e) {
    e.preventDefault();
    var contentComment;
    if ($('#comment__content').val().trim().length > 0) {
        contentComment = $('#comment__content').val();
        console.log(contentComment);
        document.getElementById('comment__content').value = '';
    } else {
        $(this).attr('data-toggle', 'modal');
        $(this).attr('data-target', '#comment__modal');
        $('.comment__modal button').click(function () {
            $('#comment__btn').removeAttr('data-toggle');
            $('#comment__btn').removeAttr('data-target');
        });
        $(document).mouseup(function (e) {
            var container = $(".changePwd__modal");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('#comment__btn').removeAttr('data-toggle');
                $('#comment__btn').removeAttr('data-target');
            }
        });
    }
});

// format date from ms
function formatDateTypeFull(msDate) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const typeDays = ['st', 'nd', 'rd', 'th'];
    // var msDate = '<%= articleDetail.publishDate %>';
    var customDate = { month: '', day: '', year: '' };

    // customDate.day = new Date(Number(msDate)).getDate();
    customDate.month = months[new Date(Number(msDate)).getMonth()];

    var supDay = new Date(Number(msDate)).getDate() % 10;
    switch (supDay) {
        case 1:
            customDate.day = new Date(Number(msDate)).getDate() + '<sup>' + typeDays[0] + '</sup>';
            break;
        case 2:
            customDate.day = new Date(Number(msDate)).getDate() + '<sup>' + typeDays[1] + '</sup>';
            break;
        case 3:
            customDate.day = new Date(Number(msDate)).getDate() + '<sup>' + typeDays[2] + '</sup>';
            break;
        default:
            customDate.day = new Date(Number(msDate)).getDate() + '<sup>' + typeDays[3] + '</sup>';
            break;
    }

    customDate.year = new Date(Number(msDate)).getFullYear();

    return (customDate.day + ' ' + customDate.month + ',' + ' ' + customDate.year);
    // $('.date-posted').append(customDate.day + ' ' + customDate.month + ',' + ' ' + customDate.year);
}

function formatDateTypeAbstract(msDate) {
    var temp = new Date(Number(msDate));
    return (temp.getDate() + '/' + (temp.getMonth() + 1) + '/' + (temp.getFullYear()));

}

function formatDateTypeBOD(msDate) {
    var temp = new Date(Number(msDate));
    if ((temp.getMonth() + 1) < 10 && temp.getDate() > 9) {
        return ('0' + (temp.getMonth() + 1) + '/' + temp.getDate() + '/' + (temp.getFullYear()));
    } else if ((temp.getMonth() + 1) < 10 && temp.getDate() < 10) {
        return ('0' + (temp.getMonth() + 1) + '/' + '0' + temp.getDate() + '/' + (temp.getFullYear()));

    } else if ((temp.getMonth() + 1) > 9 && temp.getDate() < 10) {
        return ((temp.getMonth() + 1) + '/' + '0' + temp.getDate() + '/' + (temp.getFullYear()));
    } else {
        return ((temp.getMonth() + 1) + '/' + temp.getDate() + '/' + (temp.getFullYear()));
    }
}

function formatGender(gender) {
    if (gender = "false") {
        return "Male";
    }
    return "Female";
}

//transfer news to pdf
$('#detail__print').click(function () {
    var pdf = new jsPDF('p', 'pt', 'letter');
    source = $('#newsDet__pdf')[0];
    specialElementHandlers = {
        '#bypassme': function (element, renderer) {
            return true
        }
    }
    margins = {
        top: 50,
        left: 60,
        width: 545
    };
    pdf.fromHTML(
        source
        , margins.left
        , margins.top
        , {
            'width': margins.width
        },
        function (dispose) {
            pdf.save('newsTBW.pdf');
        }
    )
});
