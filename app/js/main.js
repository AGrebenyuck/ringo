$(function(){

  const swiper2 = new Swiper('.current__slider', {
    slidesPerView: 2.4,
    initialSlide: 1,
    spaceBetween: 60,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  $('.benefits__item').on({
    mouseenter: function(){
      $($(this)).addClass('benefits__item--active');
    },
    mousemove: function(e){

        var x,y,offset,widthEl,heightEl;
        widthEl = $($(this).find('.benefits__item-img')).width() / 2;
        heightEl = $($(this).find('.benefits__item-img')).height() / 2;
        offset = $(this).offset();
        x = e.pageX - offset.left - widthEl;
        y = e.pageY - offset.top - heightEl;
        x = x + 'px';
        y = y + 'px';

        $($(this).find('.benefits__item-img')).css({'left':`${x}`, 'top': `${y}`});
    },
    mouseleave: function(){
      $(this,'.benefits__item').removeClass('benefits__item--active');
    },
    
  })


  const swiper = new Swiper('.header-slider__container', {
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      renderBullet: function(index, className) {
        return `<span class="${className}">${index + 1}</span>`
      },
      clickable: true
    },
    // autoHeight: true,
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
})