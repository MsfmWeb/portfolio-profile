$(function(){
    
    // ハンバーガーメニュー
    $('.hamburger').on('click', function() {
        $(this).toggleClass('open');
        $('.header_nav').toggleClass('open');
        $('.mask').toggleClass('open');
    });

    // ナビゲーション
    $('.header_nav a').on('click', function() {
        let elmHash = $(this).attr('href');
        let pos = $(elmHash).offset().top;
        $('body, html').animate({
            scrollTop: pos
        }, 500);
        $('.hamburger').removeClass('open');
        $('.header_nav').removeClass('open');
        $('.mask').removeClass('open');
    });
    // 領域外マスク
    $('.mask').on('click', function() {
        $(this).removeClass('open');
        $('.header_nav, .hamburger').removeClass('open');
    });


    //タブメニュー
    $('.js-content:first-of-type').css('display', 'block');
    $('.js-menu').on('click', function() {
        $('.current').removeClass('current');
        $(this).addClass('current');
        const index = $(this).index();
        $('.js-content').hide().eq(index).fadeIn(1000);
    });

    // slick カルーセル
    $('.slider').slick({
        arrow: true,
        autoplay: true,
        autoplaySpeed: 6000,
        dots: true,
        dotsClass: "slide-dots",
        prevArrow: '<button class="slide-arrow prev-arrow"></button>',
        nextArrow: '<button class="slide-arrow next-arrow"></button>',
        slidesToShow: 3,
        slidesToScroll: 3,
        speed: 1000,
        responsive: [
            {
            breakpoint: 600,
            settings: {
                autoplaySpeed: 2000,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
            {
            breakpoint: 768,
            settings: {
                autoplaySpeed: 2000,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]
    });

    // ページトップに戻るボタン
    $(window).scroll(function() {
        pageTopAnime();
    });

    function pageTopAnime() {
        let scroll = $(window).scrollTop();
        if(scroll >= 200) {
            $('#page-top').removeClass('DownMove');
            $('#page-top').addClass('UpMove');
        } else {
            $('#page-top').removeClass('UpMove');
            $('#page-top').addClass('DownMove');
        }
    };

    $('#page-top').on('click', function() {
        $('body, html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});