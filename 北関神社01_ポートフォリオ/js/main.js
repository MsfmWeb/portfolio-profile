$(function() {

    //スムーススクロール
    $('.nav__link').on('click', function() {
        let elmHash = $(this).attr('href');
        let pos = $(elmHash).offset().top;

        $('body, html').animate({
            scrollTop: pos
        }, 500);

    });



    //ページトップボタン
    //スクロールした際の動きを関数でまとめる
    function PageTopAnime() {
        var scroll = $(window).scrollTop();
        if (scroll >= 600) {
            $('#page-top').removeClass('DownMove');
            $('#page-top').addClass('UpMove');
        } else {
            if ($('#page-top').hasClass('UpMove')) {
                $('#page-top').removeClass('UpMove');
                $('#page-top').addClass('DownMove');
            }
        }
    }

    // 画面をスクロールをしたら動かしたい場合の記述
    $(window).scroll(function () {
        PageTopAnime();
    });

    // #page-topをクリックした際の設定
    $('#page-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

});