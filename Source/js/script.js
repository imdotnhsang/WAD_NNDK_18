var checkHamburger = false;
$('.hamburger').click(function() {
    if (checkHamburger == false) {
        $(this).addClass("toggle");
        $('.nav-link-custom').click(function() {
            $(this).parent().children('ul').slideToggle();
        });
        checkHamburger = true;
    } else {
        $(this).removeClass("toggle");
        $('.nav-link-custom').off('click');
        checkHamburger = false;
    }
});