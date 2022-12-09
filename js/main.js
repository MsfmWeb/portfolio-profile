$(function() {


    //ロード回数の制御
    var webStorage = function() {
        if(sessionStorage.getItem('access')) {//ブラウザのアクセス記録がすでにある場合
            $('body').css('opacity', '1');
        } else {//ブラウザのアクセスが初回の場合
            sessionStorage.setItem('access', 'true');
            $('.load').addClass('is-active');
            $('body').css('opacity', '1');
            
            //SVGアニメーションの描画 vivus
            var stroke;
            stroke = new Vivus('svg_loading', {//アニメーションをするIDの指定
                start:'manual',//自動再生をせずスタートをマニュアルに
                type: 'scenario-sync',// アニメーションのタイプを設定
                duration: 40,//アニメーションの時間設定。数字が小さくなるほど速い
                forceRender: false,//パスが更新された場合に再レンダリングさせない
                animTimingFunction:Vivus.EASE,//動きの加速減速設定
            });
                stroke.play();

            //手描きアニメーションが終了時のフェードアウト
            $(window).on('load', function() {
                $('#load').delay(2500).queue(function(){
                    $(this).addClass('loaded');
                });
                
                stroke.play();
            });
        }
    }
    webStorage();



    // ハンバーガーメニュー 
    $('.hamburger').on('click', function() {
        $(this).toggleClass('active');
        if($(this).hasClass('active')) {
            $('.header-nav').addClass('show');
        } else {
            $('.header-nav').removeClass('show');
        }
    });



    // ナビゲーション
    $('.header-nav__link').on('click', function() {
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

        if($('.hamburger').hasClass('active')) {
            $('.hamburger').removeClass('active');
            $('.header-nav').removeClass('show');
        }
    });


    // モーダルウィンドウを開く
    $('.modal-open').on('click', function() {
        let target = $(this).data('target');
        let modal = document.getElementById(target);
        scrollPosition = $(window).scrollTop();

        $('body').addClass('fixed').css({'top': -scrollPosition});
        $(modal).fadeIn(300);
        return false;
    });

    // モーダルウィンドウを閉じる
    $('.modal-close').on('click', function() {
        $('body').removeClass('fixed');
        window.scrollTo(0, scrollPosition);
        $('.modal').fadeOut();
        return false;
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
            if(scroll + wH >= (footerPos + 20)) {//時点でのスクロール量 + 現在表示されているブラウザの高さ と #footerのtop位置 + 20(ページトップボタンのbottom位置)を比較して前者が大きいならば
                var pos = (scroll + wH) - footerPos + 20;//(時点でのスクロール量 + 現在表示されているブラウザの高さ) - #footerのtop位置 + 20(ページトップボタンのbottom位置)
                $('#page-top').css('bottom', pos); //ページトップボタンのbottomにposの値を指定
            } else {
                if ($('#page-top').hasClass('UpMove')){ //上記以外かつUpMoveを持っていれば
                    $('#page-top').css('bottom', '20px'); //ページトップボタンを画面に対してbottom20pxで配置
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



    
    //スクロールに合わせた時間差フェードイン
    function scrollFadeIn() {
        $('.js-fadeIn').each(function(i) {
            const windowHeight = $(window).scrollTop();
            const targetHeight = $(this).offset().top - 800;

            if(windowHeight > targetHeight) {
                $(this).addClass('in');
                $('.js-fadeIn.in').each(function(i) {
                    let delay = 80;
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
});