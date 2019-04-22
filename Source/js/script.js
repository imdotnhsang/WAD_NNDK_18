var checkHamburger = false;
$('.hamburger').click(function () {
    if (checkHamburger == false) {
        $(this).addClass("toggle");
        $('.nav-link-custom').click(function () {
            $(this).parent().children('ul').slideToggle();
        });
        $('.child-list-nav-links').click(function () {
            var index = $(this).val();
            var checkO = $(this).attr("checkOpen");
            if (checkO == 'false') {
                $('.navbar-nav-custom li:nth-child(' + index + ') a i').css('color', '#fff');
                $('.navbar-nav-custom li:nth-child(' + index + ') a i').css('transform', 'rotate(-180deg)');
                $(this).attr("checkOpen", "true");
            } else {
                $('.navbar-nav-custom li:nth-child(' + index + ') a i').css('color', '#dd3333');
                $('.navbar-nav-custom li:nth-child(' + index + ') a i').css('transform', 'rotate(0deg)');
                $(this).attr("checkOpen", "false");
            }
        });
        checkHamburger = true;
    } else {
        $(this).removeClass("toggle");
        $('.nav-link-custom').off('click');
        checkHamburger = false;
    }
});


$(document).ready(function () {
    $("#scroll-top").hide();
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