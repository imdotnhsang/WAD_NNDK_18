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

//check validate auth
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
        $('#signin__btn').attr('data-target', '#flipFlop');
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
        $('#signup__btn').attr('data-target', '#flipFlop');
        $('.sign-up_sign-in__modal button').click(function () {
            $('#signup__btn').removeAttr('data-toggle');
            $('#signup__btn').removeAttr('data-target');
        });
    }
});

//transfer news to pdf


$('#detail__print').click(function () {
 
});
