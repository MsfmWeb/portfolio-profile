$(function() {

    	//SVGアニメーションの描画
// var stroke;
// stroke = new Vivus('svg_loading', {//アニメーションをするIDの指定
//     start:'manual',//自動再生をせずスタートをマニュアルに
//     type: 'scenario-sync',// アニメーションのタイプを設定
//     duration: 100,//アニメーションの時間設定。数字が小さくなるほど速い
//     forceRender: false,//パスが更新された場合に再レンダリングさせない
//     animTimingFunction:Vivus.EASE,//動きの加速減速設定
// });

// stroke.play();


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
        $(modal).fadeIn();
        return false;
    });

    // モーダルウィンドウを閉じる
    $('.modal-close').on('click', function() {
        $('body').removeClass('fixed');
        window.scrollTo(0, scrollPosition);
        $('.modal').fadeOut();
        return false;
    });
});