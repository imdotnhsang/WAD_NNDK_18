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

//check validate search bar
$('#searchBar__btn').click(function (e) {
    e.preventDefault();
    var keySearch;
    if ($('#searchBar__content').val().trim().length > 0) {
        keySearch = $('#searchBar__content').val();
        typeSearch = "all";

        window.location = `/search?${typeSearch}=${keySearch}&page=1`;
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
    handleSearchEvent();
});

$('#searchPage__content').keypress(function (event) {
    if (event.which == 13) {
        handleSearchEvent();
    }
});

// $('#searchPage__type').change(function (e) {
//     e.preventDefault();
//     handleSearchEvent();
// })
const handleSearchEvent = () => {
    var keySearch = $('#searchPage__content').val().trim();
    if (keySearch.length > 0) {
        keySearch = $('#searchPage__content').val();
        typeSearch = $('#searchPage__type').val();

        window.location = `/search?${typeSearch}=${keySearch}&page=1`;
        // console.log(keySearch, typeSearch);
        // document.getElementById('searchBar__content').value = '';
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
}

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

$('#updatePwd__btnCancel').click(function (e) {
    document.getElementById('updatePwd__pwdOld').value = '';
    document.getElementById('updatePwd__pwdNew').value = '';
    document.getElementById('updatePwd__pwdNewRe').value = '';
    clearChangePasswordErrors();
})

//check comment
$('#comment__btn').click(function (e) {
    e.preventDefault();
    var contentComment = $('#comment__content').val().trim();
    var userId = $(this).attr('userId');
    var articleId = $(this).attr('articleId');
    var userFullname = $('#sign_fullname').html();
    var userAvatar = $('#sign_avatar').attr('src');
    if (contentComment.length > 0) {
        console.log(contentComment);
        console.log(userId);

        postData('/api/comment/create', { content: contentComment, userId, articleId })
            .then(res => {
                const statusCode = res.status;

                switch (statusCode) {
                    case 200:
                        // res.json().then(console.log);
                        res.json().then(article => {
                            $('#list-comment-old').html(
                                '<div class="comment row m-0 pt-3 pb-1 pr-3 pr-md-4 pr-xl-5 align-items-center" ><div class="avatar col-4 col-sm-2 d-flex justify-content-center p-0"><img class="" src="' + userAvatar + '" alt=""></div><div class="content-comment col-8 col-sm-10 m-0"><p class="m-0 content-comment-detail"><span class="author-comment">' + userFullname + '&nbsp;</span>' + article.comments[article.comments.length - 1].content + '</p><p class="title-posted-cmt m-0 d-flex justify-content-end">Posted on&nbsp;<span class="date-commented" id="date-commented">' + formatDateTypeFull(article.comments[article.comments.length - 1].createdAt) + '</span></p></div></div>' + $('#list-comment-old').html()
                            )
                        })
                        document.getElementById('comment__content').value = '';
                        break;
                    case 500:
                        console.log('Server Error');
                    default:
                        res.json().then(console.log)
                        break;
                }
            })
        // document.getElementById('comment__content').value = '';
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
    var Day = new Date(Number(msDate)).getDate()
    var supDay = new Date(Number(msDate)).getDate() % 10;

    if (Day === 11 || Day === 12 || Day === 13) {
        customDate.day = new Date(Number(msDate)).getDate() + '<sup>' + typeDays[3] + '</sup>';
    } else {
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
    }

    customDate.year = new Date(Number(msDate)).getFullYear();

    return (customDate.month + ' ' + customDate.day + ' ' + ',' + customDate.year);
    // $('.date-posted').append(customDate.day + ' ' + customDate.month + ',' + ' ' + customDate.year);
}

function formatDateTypeAbstract(msDate) {
    var temp = new Date(Number(msDate));
    return ((temp.getMonth() + 1) + '/' + temp.getDate() + '/' + (temp.getFullYear()));

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
    if (gender == false) {
        return "Male";
    }
    return "Female";
}

$('.container-detail .content-detail .main-content-detail img').parent('p').css('display', 'flex');
$('.container-detail .content-detail .main-content-detail img').parent('p').css('justify-content', 'center');

//transfer news to pdf
$('#detail__print').click(function () {
    // var pdf = new jsPDF('p', 'pt', 'letter');
    // source = $('#main-content-detail')[0];
    // specialElementHandlers = {
    //     '#bypassme': function (element, renderer) {
    //         return true
    //     }
    // }
    // css={

    // }
    // pdf.fromHTML(
    //     source,
    //     function (dispose) {
    //         pdf.save('newsTBW.pdf');
    //     }
    // )
    var title = $('.title-detail-news h2').html();
    var abstract = $('.astract-detail-news p').html();
    var nameAuthor = $('.author a').html();
    var nicknameAuthor = $('.nickname a').html();
    var datePosted = $('.date-posted').html();
    $("#main-content-detail").printThis({
        debug: false,               // show the iframe for debugging
        importCSS: true,            // import parent page css
        importStyle: false,         // import style tags
        printContainer: true,       // print outer container/$.selector
        loadCSS: null,                // path to additional css file - use an array [] for multiple
        pageTitle: "&nbsp;",              // add title to print page
        removeInline: false,        // remove inline styles from print elements
        removeInlineSelector: "*",  // custom selectors to filter inline styles. removeInline must be true
        printDelay: 333,            // variable print delay
        header: '<p class="m-0 title">' + title + '</p><p class="m-0 abstract">' + abstract + '</p><div class="description-detail-news row m-0"><div class="author">By <span>' + nameAuthor + '</span></div><div class="nickname"><span>' + nicknameAuthor + '</span></div><div class="date-posted"><span>' + datePosted + '</span></div></div><br>',               // prefix to html
        footer: '<p class="text-center m-0">&copy; 2019 <strong>The Big Wind</strong>, All Rights Reserved</p><div class="contact-fb text-center"><a href="https://www.facebook.com/leooonguyen" target="_blank">Leo Nguyen</a><a href="https://www.facebook.com/vinh.phat69" target="_blank">Phat Dang</a><a href="https://www.facebook.com/phongkenvil" target="_blank">Phong Kenvil</a></div>',  // postfix to html
        base: false,                // preserve the BASE tag or accept a string for the URL
        formValues: true,           // preserve input/form values
        canvas: true,              // copy canvas content
        doctypeString: null,       // enter a different doctype for older markup
        removeScripts: false,       // remove script tags from print content
        copyTagClasses: false,      // copy classes from the html & body tag
        beforePrintEvent: null,     // function for printEvent in iframe
        beforePrint: null,          // function called before iframe is filled
        afterPrint: null            // function called before iframe is removed
    });
});
