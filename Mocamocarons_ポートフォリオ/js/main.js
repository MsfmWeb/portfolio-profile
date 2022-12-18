$(function() {

    //ハンバーガーメニュー クリックイベント
    $('.hamburger').on('click', function() { //.hamburgerをクリックした時
        if($('.hamburger').hasClass('active')) { //.hamburgerが.activeを持っていたら
            $('.hamburger').removeClass('active'); //.hamburgerから.activeを外す
            $('.header-nav').removeClass('active'); //.header-navから.activeを外す
        } else {
            $('.hamburger').addClass('active'); //.hamburgerに.activeを付与
            $('.header-nav').addClass('active'); //.header-navに.activeを付与
        }
    });

    //スムーススクロール
    $('.header-nav__link').on('click', function() {
        var elmHash = $(this).attr('href');
        var pos = $(elmHash).offset().top;
        var headerHeight = $('.header').innerHeight();
        
        if(window.matchMedia('(min-width: 1024px)').matches) {
            $('body, html').animate({
                    scrollTop: pos - headerHeight
            }, 500);
        } else {
            $('body, html').animate({
                scrollTop: pos
            }, 500);
        }
    });

    //slick カルーセル
    $(function() {
        $('.slider').slick({
            arrow: true,
            // autoplay: true,
            // autoplaySpeed: 5000,
            centerMode: true,
            centerPadding: '27%',
            dots: true,
            dotsClass: "slide-dots",
            slidesToShow: 1,
            // adaptiveHeight: true
            prevArrow: '<button class="slide-arrow prev-arrow">',
            nextArrow: '<button class="slide-arrow next-arrow"></button>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        centerMode: false,
                        slidesToShow: 1,
                    },
                },
            ],
        });
    });


    //マカロン一覧、クリックで対応商品を表示
    function GethashID(hashIDName) {
        if(hashIDName) {
            $('.grid__item').find('a').each(function() {
                var idName = $(this).attr('href');
                if(idName == hashIDName) {
                    var parentElm = $(this).parent();
                    $('.grid__item').removeClass('active');
                    $(parentElm).addClass('active');
                    $('.goods-content__item-wrap').removeClass('is-active').animate({opacity: 0}, 200);
                    $(hashIDName).addClass('is-active').animate({opacity: 1}, 300);
                }
            });
        }
    }


    $('.grid__item a').on('click', function() {
        var idName = $(this).attr('href');
        GethashID(idName);
        return false;
    });

    $(window).on('load', function() {
        $('.grid__item:first-of-type').addClass('active');
        $('.goods-content__item-wrap:first-of-type').addClass('is-active');
        var hashName = location.hash;
        GethashID(hashName);
    });

    //スクロールフェードイン
    $(window).scroll(function() {
        var scroll = $(window).scrollTop(); //スクロールバーの位置を取得
        var windowHeight = $(window).height(); //ウィンドウの高さを取得

        $('.js-fadeIn-bottom, .js-fadeIn-right, .js-fadeIn-left').each(function() {
            var elemPos = $(this).offset().top; //フェードインさせたい要素の位置を取得

            if(scroll > elemPos - windowHeight + 200) { //要素がウィンドウの中に入ってからさらに100pxスクロールしたら要素をフェードインする
                $(this).addClass('scrollIn');
            } 
            
        });

        $('.js-fadeIn-delay').each(function() {
            var delayelmPos = $(this).offset().top;

            if(scroll > delayelmPos - windowHeight + 200) {
                $(this).addClass('in');
                $('.js-fadeIn-delay.in').each(function(i) {
                    let delay = 100;
                    $(this).delay(i * delay).queue(function(next) {
                        $(this).addClass('scrollIn').on('transitionend', function() {
                            $(this).css('transition', 'all .3s ease-in-out');
                        });
                        next();
                    });
                });
            }
        });
    //ページトップボタン
    if(scroll >= 800) {
        $('.page-top-btn').removeClass('DownMove');
        $('.page-top-btn').addClass('UpMove');
    } else if($('.page-top-btn').hasClass('UpMove')) {
        $('.page-top-btn').removeClass('UpMove');
        $('.page-top-btn').addClass('DownMove');
    }
    });

    $('.page-top-btn').on('click', function() {
        $('body, html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

});

//ドロップダウンメニュー 
$(window).on('load resize', function() {//ロード or 画面がリサイズされた時
    var winW = $(window).width();//ウィンドウの横幅を取得
    var devW = 1024//画面幅1024pxを格納
    if(winW < devW) {//画面幅が1024pxより小さい時
        $('.js-dropdown').on('click', function() {//.js-dropdownをクリックで
            $(this).children('.sub-menu').stop().slideToggle();//.sub-menuを表示 or 非表示
            $(this).toggleClass('active');
            // $('.header-nav__link').toggleClass('active')
        });
    } else {
        $('.js-dropdown').on('mouseover', function() {//.js-dropdownにマウスオーバーで
            $(this).children('.sub-menu').stop().slideDown();//.sub-menuを表示 or 非表示
            $(this).addClass('active');
            // $('.header-nav__link').addClass('active')
        });
        $('.js-dropdown').on('mouseout', function() {
            $(this).children('.sub-menu').stop().slideUp();
            $(this).removeClass('active');
            // $('.header-nav__link').removeClass('active')
        });
    }
});