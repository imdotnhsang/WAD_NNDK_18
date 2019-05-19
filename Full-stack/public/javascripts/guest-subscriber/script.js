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
$("#pic-avatar").change(function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profile-change').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    }
});

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

//check validate auth
$('#signin__btn').click(function (e) {
    e.preventDefault();
    var user, pwd, checkRemember;
    if (validatePassword($('#signin__password').val()) == true && validateUsername($('#signin__username').val()) == true) {
        user = $('#signin__username').val();
        pwd = $('#signin__password').val();
        checkRemember = $('#signin__remember:checked').length;
        console.log(user, pwd, checkRemember);
    } else {
        $('#signin__btn').attr('data-toggle', 'modal');
        $('#signin__btn').attr('data-target', '#sign-up_sign-in__modal');
        $('.sign-up_sign-in__modal button').click(function () {
            $('#signin__btn').removeAttr('data-toggle');
            $('#signin__btn').removeAttr('data-target');
        });
    }
});

$('#signup__btn').click(function (e) {
    e.preventDefault();
    var user, pwd, email, fname;
    if (validatePassword($('#signup__password').val()) == true
        && validateUsername($('#signup__username').val()) == true
        && validateEmail($('#signup__email').val()) == true
        && ($('#signup__password').val() == $('#signup__pwdRepeat').val())
        && $('#signup__fullname').val().length > 0) {
        user = $('#signup__username').val();
        pwd = $('#signup__password').val();
        email = $('#signup__email').val();
        fname = $('#signup__fullname').val();
        console.log(fname, user, email, pwd);
    } else {
        $('#signup__btn').attr('data-toggle', 'modal');
        $('#signup__btn').attr('data-target', '#sign-up_sign-in__modal');
        $('.sign-up_sign-in__modal button').click(function () {
            $('#signup__btn').removeAttr('data-toggle');
            $('#signup__btn').removeAttr('data-target');
        });
    }
});

//check validate search bar
$('#searchBar__btn').click(function (e) {
    e.preventDefault();
    var keySearch;
    if ($('#searchBar__content').val().trim().length > 0) {
        keySearch = $('#searchBar__content').val();
        console.log(keySearch);
    } else {
        $(this).attr('data-toggle', 'modal');
        $(this).attr('data-target', '#search__modal');
        $('.search__modal button').click(function () {
            $('#searchBar__btn').removeAttr('data-toggle');
            $('#searchBar__btn').removeAttr('data-target');
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
$('#updateInf__btn').click(function (e) {
    e.preventDefault();
    var fname, gender, dob, email;
    fname = $('#updateInf__fullname').val();
    gender = $('#updateInf__gender').val();
    dob = $('#updateInf__bod').val();
    email = $('#updateInf__email').val();
    console.log(fname, gender, dob, email);
});

$('#updateInf__btnCancel').click(function (e) {
    document.getElementById('updateInf__fullname').value = 'Leo Nguyen';
    document.getElementById('updateInf__gender').value = 1;
    document.getElementById('updateInf__bod').value = '8/16/98';
    document.getElementById('updateInf__email').value = '1612556@student.hcmus.edu.vn';
})

//check validate change password
$('#updatePwd__btn').click(function (e) {
    e.preventDefault();
    var pwd, pwdNew, pwdNewRe;
    if (($('#updatePwd__pwdNew').val() == $('#updatePwd__pwdNewRe').val()) && validatePassword($('#updatePwd__pwdNew').val())) {
        pwdNew = $('#updatePwd__pwdNew').val();
        console.log(pwdNew)
    } else {
        $(this).attr('data-toggle', 'modal');
        $(this).attr('data-target', '#changePwd__modal');
        $('.changePwd__modal button').click(function () {
            $('#updatePwd__btn').removeAttr('data-toggle');
            $('#updatePwd__btn').removeAttr('data-target');
        });
    }
});

$('#updatePwd__btnCancel').click(function (e) {
    document.getElementById('updatePwd__pwdOld').value = '';
    document.getElementById('updatePwd__pwdNew').value = '';
    document.getElementById('updatePwd__pwdNewRe').value = '';
})

//check comment
$('#comment__btn').click(function (e) {
    var contentComment;
    if ($('#comment__content').val().trim().length > 0) {
        contentComment=$('#comment__content').val();
        console.log(contentComment);
    }else{
        $(this).attr('data-toggle', 'modal');
        $(this).attr('data-target', '#comment__modal');
        $('.changePwd__modal button').click(function () {
            $('#comment__btn').removeAttr('data-toggle');
            $('#comment__btn').removeAttr('data-target');
        });
    }

});

//transfer news to pdf
$('#detail__print').click(function () {

});
