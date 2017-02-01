$('#myCarousel').carousel({
  interval: 2000
});

$(function(){

  //handle moving carousel forward
  $(".right-carousel-control").on('click', function(){
    $(this).css('display', 'none');
    event.preventDefault();
    if($(window).width() < 768 ){
      var next = $(".active").next('.item');
      if (!next.length) {
        next = $(".item").first();
        next.addClass('fly-in-left');
        next.addClass('active');
      $(".active").last().addClass('fly-out-left');
      $(".active").last().removeClass('active');
      }else{
        next.addClass('fly-in-left');
        next.addClass('active');
      $(".active").first().addClass('fly-out-left');
      $(".active").first().removeClass('active');
      }
    }else{
      var next = $(".active").next('.item').next('.item');
      var next2 = $(".active2").next('.item').next('.item');
      if (!next.length) {
        next = $(".item").first();
        next2 = next.next('.item');
        next.addClass('fly-in-left');
        next2.addClass('fly-in-left-2');
        next.addClass('active');
        next2.addClass('active2');
      $(".active").last().addClass('fly-out-left');
      $(".active2").last().addClass('fly-out-left-2');
      $(".active").last().removeClass('active');
      $(".active2").last().removeClass('active2');
      }else{
        next.addClass('fly-in-left');
        next2.addClass('fly-in-left-2');
        next.addClass('active');
        next2.addClass('active2');
      $(".active").first().addClass('fly-out-left');
      $(".active2").first().addClass('fly-out-left-2');
      $(".active").first().removeClass('active');
      $(".active2").first().removeClass('active2');
      }
      $('.fly-in-left-2').one(
    'webkitanimationEnd oanimationend oanimationEnd msanimationEnd animationend',
    function() {
        $(this).removeClass("fly-in-left-2");
    });
    $('.fly-out-left-2').one('webkitanimationEnd oanimationend oanimationEnd msanimationEnd animationend',function(){
        $(this).removeClass("fly-out-left-2");
    });
    }

    $('.fly-in-left').one(
    'webkitanimationEnd oanimationend oanimationEnd msanimationEnd animationend',
    function() {
        $(this).removeClass("fly-in-left");
    });
    $('.fly-out-left').one('webkitanimationEnd oanimationend oanimationEnd msanimationEnd animationend',function(){
        $(this).removeClass("fly-out-left");
    });
    setTimeout(function(){
        $(".right-carousel-control").css('display', 'inline');
    }, 1200);
  });

  //handle moving carousel back
  $(".left-carousel-control").on('click', function(){
    $(this).css('display', 'none');
    event.preventDefault();
    if($(window).width() < 768 ){
      var prev = $(".active").prev('.item');
      if (!prev.length) {
        prev = $(".item").last();
        prev.addClass('fly-in-right');
        prev.addClass('active');
      $(".active").first().addClass('fly-out-right');
      $(".active").first().removeClass('active');
      }else{
        prev.addClass('fly-in-right');
        prev.addClass('active');
        $(".active").last().addClass('fly-out-right');
        $(".active").last().removeClass('active');
      }
    }else{

    }

    $('.fly-in-right').one(
    'webkitanimationEnd oanimationend oanimationEnd msanimationEnd animationend',
    function() {
      console.log(this);
        $(this).removeClass("fly-in-right");
    });
    $('.fly-out-right').one('webkitanimationEnd oanimationend oanimationEnd msanimationEnd animationend',function(){
        $(this).removeClass("fly-out-right");
    });
    setTimeout(function(){
        $(".left-carousel-control").css('display', 'inline');
    }, 1200);
  });
});


$(window).on('load', function(){
  $(".custom-carousel").height($(".active").height());
  if($(window).width() >= 576){
    $('.item:nth-child(2)').addClass('active2');
  }
});

$(window).on('resize', function(){
  $(".custom-carousel").height($(".active").height());
  if($(window).width() >= 576){
    $('.item:nth-child(2)').addClass('active2');
  }else{
    $('.active2').removeClass('active2');
  }
});
// setInterval(function(){
//   $(".right-carousel-control").trigger('click');
// }, 5000);