
$('.logo').click(function () {
    location.reload();
});

$(window).resize(function () {
    location.reload();
});

var checkHamburger = false;
$('.hamburger').click(function () {
    if (checkHamburger == false) {
        $(this).addClass("toggle");
        $('.nav-link-custom').click(function () {
            $(this).parent().children('ul').slideToggle();
            var index = $(this).parent().val();
            var checkO = $(this).parent().attr("checkOpen");
            if (checkO == 'false') {
                $('.navbar-nav-custom li:nth-child(' + index + ') a i').css('color', '#fff');
                $('.navbar-nav-custom li:nth-child(' + index + ') a i').css('transform', 'rotate(-180deg)');
                $(this).parent().attr("checkOpen", "true");
            } else {
                $('.navbar-nav-custom li:nth-child(' + index + ') a i').css('color', '#dd3333');
                $('.navbar-nav-custom li:nth-child(' + index + ') a i').css('transform', 'rotate(0deg)');
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

$('#btn-open-informationUser').click(function () {
    var checkO = $(this).attr('checkOpen');
    if (checkO == 'false') {
        $('.information-user').fadeIn(500);
        $(this).attr('checkOpen', 'true');
    } else {
        $('.information-user').fadeOut(500);
        $(this).attr('checkOpen', 'false');
    }
});

$(document).ready(function () {
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
        });
    });
});