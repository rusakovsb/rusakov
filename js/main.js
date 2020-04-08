(function ($) {

    var bodyClasses = function() {
        if($(window).width() > 1200) {
            $("body").removeClass("mobile").addClass("desktop");
        }
        else {
            $("body").removeClass("desktop").addClass("mobile");
        } 
    };

    var showPreloader = function() { 
        TweenMax.to("#preloader", 0.5, {
            ease: Power1.easeOut,
            display: "block",           
            opacity: "1"            
        });
    };

    var hidePreloader = function() { 
        TweenMax.to("#preloader", 0.5, {
            ease: Power1.easeOut,
            delay: 2,            
            opacity: "0",
            display: "none"
        }); 
    };

    var showOverlay = function() { 
        TweenMax.to("#overlay", 1.5, {
            ease: Expo.easeInOut,
            width: "100%",
            onComplete: showPreloader
        });    
    };

    var hideOverlay = function() {  
        TweenMax.to("#overlay", 1.5, {
            ease: Expo.easeInOut,
            delay: 1.5,
            width: "40%"
        });     
    };

    var initMasonry = function() {
            $(".view-portfolio .view-content").masonry({
            itemSelector: ".portfolio-item"
        });
    };

    var showContent = function() { 
        TweenMax.to(".region-header, .region-footer, .region-left, .region-right", 1, {
            ease: Power3.easeOut,
            delay: 3,
            opacity: "1"
        });      
        TweenMax.staggerTo(".portfolio-item", 1, {
            ease: Power3.easeOut,
            delay: 3.5,
            opacity: "1"   
        }, 0.1);
        TweenMax.staggerTo(".services-item", 1, {
            ease: Power3.easeOut,
            delay: 3.5,
            opacity: "1",
            x: "0"  
        }, 0.1);
        TweenMax.staggerTo(".prices-item", 1, {
            ease: Power3.easeOut,
            delay: 3.5,
            opacity: "1",
            x: "0"     
        }, 0.1);
        TweenMax.staggerTo(".contacts-item", 1, {
            ease: Power3.easeOut,
            delay: 3.5,
            opacity: "1",
            x: "0"     
        }, 0.1);              
    };

    var hideContent = function() { 
        TweenMax.to(".desktop .region-header, .desktop .region-footer, .desktop .region-left, .desktop .region-right", 0.5, {
            ease: Power3.easeOut,
            opacity: "0"
        });          
    };

    var showNav = function() {        
        TweenMax.to("#nav", 0.5, {
            ease: Power3.easeOut,
            display: "block",
            opacity: "1"
        });
        TweenMax.staggerTo(".menu--main .menu-item", 1, {
            ease: Power3.easeOut,
            delay: 0.25,
            opacity: "1",
            x: "0%"     
        }, 0.05); 
        $("#nav-toggle").addClass("active");
    };

    var hideNav = function() {
        TweenMax.to("#nav", 0.5, {
            ease: Power3.easeIn,
            delay: 0.75,            
            opacity: "0",
            display: "none"
        });
        TweenMax.to(".menu--main .menu-item", 1, {
            ease: Power3.easeIn,            
            opacity: "0",
            x: "-100%"     
        }); 
        $("#nav-toggle").removeClass("active");
    };

    var hideMobileNav = function() {
        TweenMax.to(".mobile #nav", 0.5, {
            ease: Power3.easeIn,
            delay: 0.75,            
            opacity: "0",
            display: "none"
        });
        TweenMax.to(".mobile .menu--main .menu-item", 1, {
            ease: Power3.easeIn,            
            opacity: "0",
            x: "-100%"     
        });
        $(".mobile #nav-toggle").removeClass("active");
    };

    showOverlay(); 
    bodyClasses();      

    $(window).on("load", function() { 
        initMasonry();       
        hidePreloader();
        hideOverlay();          
        showContent();       
    });

    $("#nav-toggle").click(function() {               
        if(!$(this).hasClass("active")) {            
            showNav();    
        }
        else {            
            hideNav();  
        }
    });

    $(".site-logo a").addClass("ajax-link");

    $(document).on("click", ".ajax-link", function(event) {
        event.preventDefault();
        $(".menu--main a").not(this).removeClass("is-active");
        $(this).addClass("is-active");
        hideContent();
        showOverlay(); 
        if ($(this).parent().hasClass("site-logo")) {
        	$(".menu--main a").removeClass("is-active");
            $(".menu--main ul li:first-child a").addClass("is-active");    
        }
        var ajaxurl = $(this).attr("href");        
        $.ajax({
            url: ajaxurl,
            type: "POST",
            cache: "false",
            dataType: "html",
            success: function(data) {
                $("#main").html($(data).find("#main").html());  
                $("#main").imagesLoaded( function() {  
                    initMasonry();
                    hidePreloader();
                    hideOverlay();
                    hideMobileNav();     
                    showContent();          
                });          
                document.title = $(data).find(".page-title").text();      
                window.history.pushState(null, null, ajaxurl);            
                $(window).scrollTop(0);       
            }
        });    
  
    });
    window.onpopstate = function() {
        location.reload();
    };

    $(window).resize(function() {
        bodyClasses();
    });

    $(".region-popup").once().prepend('<button id="popup-close"><span></span><span></span></button>');

    $(".popup-trigger").click(function () {
        $("#popup").fadeIn();
    }); 

    $("#popup-close").click(function () {
        $("#popup").fadeOut();
    });

    $("#popup-overlay").click(function () {
        $("#popup").fadeOut();
    });
	
})(jQuery);