(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
$(document).ready(function(){

    var app =   {
        WW: window.innerWidth,
        WH: window.innerHeight,
        isMobile: false,
        breakPoint: 1024,
        breakPointMobile: 992,
        breakPointMobile2: 768,
        delta: .05,
        ie: false,

        init: function(){

            if(!app.prod){
                window.app = app;
            }

            $(window).on("resize", app.resize);

            app.resize();

            if(window.addEventListener){
                window.addEventListener("orientationchange", function() {
                    app.resize();
                }, false);
            }else{
                window.attachEvent("orientationchange", function(){
                    app.resize();
                });
            }

            if(window.addEventListener){
                window.addEventListener("scroll", function() {
                    app.scrolling();
                }, false);
            }else{
                window.attachEvent("scroll", function(){
                    app.scrolling();
                });
            }

            app.checkIE();

            app.start();

            $(document).on('click', '.disable', function(e){
                e.preventDefault();
            });

            this.fullScreenMode = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen; // This will return true or false depending on if it's full screen or not.

            $(document).on ('mozfullscreenchange webkitfullscreenchange fullscreenchange',function(){
                this.fullScreenMode = !this.fullScreenMode;

                if(this.fullScreenMode){
                    $('html').addClass('is-fullscreen');
                }else{
                    $('html').removeClass('is-fullscreen');
                }
            });
            
        },

        checkIE : function(){
            var nav =   window.navigator.userAgent;
            var idx =   nav.indexOf("MSIE");
            var tri =   nav.indexOf("Trident/");
            if(idx > 0 || tri > 0){
                var version = (parseInt(nav.substring(idx + 5, nav.indexOf('.', idx)), 10));
                app.ie  =   true;
                $('body').addClass('ie');
                $('body').addClass('ie'+version);
            }
        },

        start: function(){


        },

        resize: function(){
            app.WW= window.innerWidth;
            app.WH= window.innerHeight;
            app.checkOrientation();
            if( app.WW <= app.breakPointMobile ){

                // SLICK HP
                
                var targetEvents  = $(".block-2-right");

                if(!targetEvents.hasClass('slick-initialized')){
                    targetEvents.slick({
                        dots: false,
                        arrows: false,
                        autoplay: true,
                        autoplaySpeed: 2000,
                        //adaptiveHeight: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true,
                        variableWidth: false,
                        centerPadding: '40px'
                    });
                }

                $('.offer-single').matchHeight({ remove: true });


            } else{

                $('.offer-single').matchHeight();

                // DESTROY SLICK
                var targetEvents  = $(".block-2-right");
                if (targetEvents.hasClass("slick-initialized")) {
                    targetEvents.slick("unslick");
                }
            }

            if(app.WW <= app.breakPointMobile2){
                $('.block__emploi__picto__content_icon').matchHeight({ remove: true });
            }else{
                $('.block__emploi__picto__content_icon').matchHeight();
                $('.sameHeight').matchHeight();
                $('.sameHeight2').matchHeight();
            }

        },

        checkOrientation: function(){
            if(window.orientation){
                if(window.orientation === 90 || window.orientation === -90){
                    $('body').addClass('landscape');
                }else{
                    $('body').removeClass('landscape');
                }
            }else{
                if(app.WW > app.WH){
                    $('body').addClass('landscape');
                }else{
                    $('body').removeClass('landscape');
                }
            }
            if( app.WW < app.breakPoint ){
                app.isMobile    =   true;
            }else{
                app.isMobile    =   false;
            }

        },

        scrolling: function(){
            var _top    =   $(window).scrollTop();

            if( _top > 60 ){
                $("body").addClass("scrolling");
            }else{
                $("body").removeClass("scrolling");
            }


        }
    };

    app.init();

    function parallaxElements(){
        $(".will-animate").each(function(i,v){

            var scrollTop	=	$(window).scrollTop(),
                el			=	$(this),
                elHeight	=	el.height(),
                winHeight	=	$(window).height() - parseInt(el.css("margin-top")) - parseInt(el.css("margin-bottom")),
                offsetTop	=	el.offset().top + parseInt(el.css("margin-top")) + winHeight * app.delta,
                bottomScreen=	scrollTop + winHeight;

            if( bottomScreen >= offsetTop ){
                el.addClass("animate");
            }
            /*else{
             el.removeClass("animate");
             }*/

        });

        requestAnimationFrame(parallaxElements);
    }

    requestAnimationFrame(parallaxElements);
    

    $('.menu_close').bind('click', function(){
        $('#myNavmenu').offcanvas('hide');
    });

    $(".slider-outils").slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        //autoplay: true,
        //autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true
                }
            }
        ]
    });

    $(".block__1-right").slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    $(".slider_1").slick({
        arrows: false,
        dots: false,
        speed: 800,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplaySpeed: 2500,
                    centerMode: true,
                    centerPadding: '90px',
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 2000,
                    centerMode: true,
                    centerPadding: '70px',
                }
            }
        ]

    });

    $(".offers").slick({
        arrows: false,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]

    });
    
    $('select').selectpicker();


    $('.compte-button').on("click", function (e) {
	    $('.mon-compte ul').toggleClass('invisible');
	    $('.compte-button').toggleClass('active');
    });


    $('.yellow-link').on("click", function (e) {
        $('.pop-up').removeClass('invisible');
        $('body').addClass('popup-open');
    });
    
    $('#myNavmenu .yellow-link').on("click", function (e) {
        $('.pop-up').removeClass('invisible');
        $('body').addClass('popup-open');
        $('#myNavmenu').offcanvas('hide');
    });
    
    

    $('.cross').on("click", function (e) {
        $('.pop-up').addClass('invisible');
        $('body').removeClass('popup-open');
    });

});