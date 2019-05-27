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
$("#pic-avatar").change(function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profile-change').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    }
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
$('#updateInf__btn').click(function (e) {
    e.preventDefault();
    var fname, gender, dob, email;
    if ($('#updateInf__fullname').val().trim().length > 0 && $('#updateInf__gender').val() != 0 && $('#updateInf__bod').val().trim().length > 0 && validateEmail($('#updateInf__email').val())) {
        fname = $('#updateInf__fullname').val();
        gender = $('#updateInf__gender').val();
        dob = $('#updateInf__bod').val();
        email = $('#updateInf__email').val();
        console.log(fname, gender, dob, email);
    } else {
        $(this).attr('data-toggle', 'modal');
        $(this).attr('data-target', '#changeInf__modal');
        $('.changeInf__modal button').click(function () {
            $('#updateInf__btn').removeAttr('data-toggle');
            $('#updateInf__btn').removeAttr('data-target');
        });
        $(document).mouseup(function (e) {
            var container = $(".changeInf__modal");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('#updateInf__btn').removeAttr('data-toggle');
                $('#updateInf__btn').removeAttr('data-target');
            }
        });
    }
});

//check validate change password
$('#updatePwd__btn').click(function (e) {
    e.preventDefault();
    var pwd, pwdNew, pwdNewRe;
    if (($('#updatePwd__pwdNew').val() == $('#updatePwd__pwdNewRe').val()) && validatePassword($('#updatePwd__pwdNew').val()) && validatePassword($('#updatePwd__pwdOld').val())) {
        pwdNew = $('#updatePwd__pwdNew').val();
        console.log(pwdNew)
    } else {
        $(this).attr('data-toggle', 'modal');
        $(this).attr('data-target', '#changePwd__modal');
        $('.changePwd__modal button').click(function () {
            $('#updatePwd__btn').removeAttr('data-toggle');
            $('#updatePwd__btn').removeAttr('data-target');
        });
        $(document).mouseup(function (e) {
            var container = $(".changePwd__modal");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('#updatePwd__btn').removeAttr('data-toggle');
                $('#updatePwd__btn').removeAttr('data-target');
            }
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
        case 3:
            customDate.day = new Date(Number(msDate)).getDate() + '<sup>' + typeDays[2] + '</sup>';
        default:
            customDate.day = new Date(Number(msDate)).getDate() + '<sup>' + typeDays[3] + '</sup>';
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
    if ((temp.getMonth() + 1) < 10) {
        return ('0' + (temp.getMonth() + 1) + '/' + temp.getDate() + '/' + (temp.getFullYear()));
    } else {
        return ((temp.getMonth() + 1) + '/' + temp.getDate() + '/' + (temp.getFullYear()));
    }
}

function formatGender(gender){
    if(gender = "false"){
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
