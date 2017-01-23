$(window).on('load', function(){
    $('.custom-header').css('height', $('#video-banner').height()+'px');
    $("#header-title-top").addClass("fly-in-left");
    setTimeout(function(){
        $("#header-title-bottom").addClass("fly-in-bottom");
    }, 1000)
});

$(window).on('resize', function(){
    $('.custom-header').css('height', $('#video-banner').height()+'px');
});