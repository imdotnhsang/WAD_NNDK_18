var checkHamburger = false;
$('.hamburger').click(function() {
    if (checkHamburger == false) {
        $(this).addClass("toggle");
        $('.nav-link-custom').click(function() {
            $(this).parent().children('ul').slideToggle();
        });
                    $('body').css("overflow-y","hidden");
        checkHamburger = true;
    } else {
        $(this).removeClass("toggle");
        $('.nav-link-custom').off('click');
          $('body').css("overflow-y","visible");
        checkHamburger = false;
    }
});