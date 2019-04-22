var checkHamburger = false;
$('.hamburger').click(function () {
    if (checkHamburger == false) {
        $(this).addClass("toggle");
        $('.nav-link-custom').click(function () {
            $(this).parent().children('ul').slideToggle();
        });
        var checkOpenNLink = false;
        $('.child-list-nav-links').click(function () {
            var index = $(this).val();
            var checkO = $(this).attr("checkOpen");
            if (checkO == 'false') {
                $('.navbar-nav-custom li:nth-child(' + index + ') a i').css('color', '#fff');
                $('.navbar-nav-custom li:nth-child(' + index + ') a i').css('transform', 'rotate(-180deg)');
                $(this).attr("checkOpen","true");
            } else {
                $('.navbar-nav-custom li:nth-child(' + index + ') a i').css('color', '#dd3333');
                $('.navbar-nav-custom li:nth-child(' + index + ') a i').css('transform', 'rotate(0deg)');
                $(this).attr("checkOpen","false");
            }
        });
        checkHamburger = true;
    } else {
        $(this).removeClass("toggle");
        $('.nav-link-custom').off('click');
        checkHamburger = false;
    }
});