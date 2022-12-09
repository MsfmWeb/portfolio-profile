$(function() {



    //ローディング
    $('#wrap').css('opacity', '0');
    $('#loader-bg, #loader').css('display, block');

    $(window).on('load', function() {
        $('#loader-bg').delay(900).fadeOut(800);
        $('#loader').delay(600).fadeOut(300);
        $('#wrap').css('opacity', '1');
    });

    // 10秒たったら強制的にロード画面を非表示
    setTimeout('stopload()', 10000);

    function stopload() {
        $('#wrap').css('display', 'block');
        $('#loader-bg').delay(900).fadeOut(800);
        $('#loader').delay(600),fadeOut(300);
    }


    //ハンバーガーメニュー
    $('.hamburger').on('click', function() {
        $(this).toggleClass('active');
        if($(this).hasClass('active')) {
            $('.nav').addClass('active');
        } else {
            $('.nav').removeClass('active');
        }
    });


    //ナビゲーション
    $('.nav__link').on('click', function() {
        if($('.nav').hasClass('active')) {
            $('.hamburger').removeClass('active');
            $('.nav').removeClass('active');
        }

        let elmHash = $(this).attr('href');
        let pos = $(elmHash).offset().top;
        let headerHeight = $('.header').innerHeight();
        //スムーススクロール
                //画面幅960px以上の時はヘッダーの高さを引いた地点までスクロール
        if(window.matchMedia('(min-width: 960px)').matches) {
            $('body, html').animate({
                scrollTop: pos - headerHeight
            }, 500);
        } else { //画面幅959px以下の時はヘッダーの高さは考慮しない
            $('body, html').animate({
                scrollTop: pos
            }, 500);
        }
    });

    
    //スクロールに合わせた時間差フェードイン
    function scrollFadeIn() {
        $('.js-fadeIn').each(function(i) {
            const windowHeight = $(window).scrollTop();
            const targetHeight = $(this).offset().top - 700;

            if(windowHeight > targetHeight) {
                $(this).addClass('in');
                $('.js-fadeIn.in').each(function(i) {
                    let delay = 100;
                    $(this).delay(i * delay).queue(function(next){
                        $(this).addClass('scrollIn');
                        next();
                    })
                });
            }
        });
    }
    $(window).on('scroll', function() {
        scrollFadeIn();
    });

        //スクロールした際の動きを関数でまとめる
        function PageTopAnime() {
            var scroll = $(window).scrollTop();
            if (scroll >= 600) {//上から600pxスクロールしたら
                $('#page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
                $('#page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
            } else {
                if ($('#page-top').hasClass('UpMove')) {//すでに#page-topにUpMoveというクラス名がついていたら
                    $('#page-top').removeClass('UpMove');//UpMoveというクラス名を除き
                    $('#page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
                }
            }
    
            var wH = window.innerHeight; //ブラウザの内側の高さ（ページが表示され、見えている高さ）を取得
                var footerPos = $('.footer').offset().top; //#footerのtopの位置を取得
                if(scroll + wH >= (footerPos + 10)) {//時点でのスクロール量 + 現在表示されているブラウザの高さ と #footerのtop位置 + 20(ページトップボタンのbottom位置)を比較して前者が大きいならば
                    var pos = (scroll + wH) - footerPos + 10;//(時点でのスクロール量 + 現在表示されているブラウザの高さ) - #footerのtop位置 + 20(ページトップボタンのbottom位置)
                    $('#page-top').css('bottom', pos); //ページトップボタンのbottomにposの値を指定
                } else {
                    if ($('#page-top').hasClass('UpMove')){ //上記以外かつUpMoveを持っていれば
                        $('#page-top').css('bottom', '10px'); //ページトップボタンを画面に対してbottom20pxで配置
                    }
                }
        }
    
        // 画面をスクロールをしたら動かしたい場合の記述
        $(window).scroll(function () {
            PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
        });
    
        // #page-topをクリックした際の設定
        $('#page-top').click(function () {
            $('body,html').animate({
                scrollTop: 0//ページトップまでスクロール
            }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
            return false;//リンク自体の無効化
        });




});

video = document.getElementById('video');
video.playbackRate = 0.5; //速度調整