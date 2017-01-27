$('#myCarousel').carousel({
  interval: 2000
});

$('.carousel .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  // next.children(':first-child').clone().appendTo($(this));

  // for (var i=0;i<2;i++) {
  //   next=next.next();
  //   if (!next.length) {
  //     next = $(this).siblings(':first');
  //   }

  //   next.children(':first-child').clone().appendTo($(this));
  // }
});

setInterval(function(){
  $("#right-carousel-control").trigger('click');
}, 7000);