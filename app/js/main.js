

$(function(){

  // var scene = document.getElementById('scene');
  // var parallax = new Parallax(scene);
  

  $(".menu").on("click","a", function (event) {
		event.preventDefault();

		var id  = $(this).attr('href'),
		top = $(id).offset().top;
    
		$('.header__inner').toggleClass('header__inner--active')
		$('body,html').animate({scrollTop: top-93}, 1500);
	});

  $(window).scroll(function() {
    var height = $(window).scrollTop();
    
    if(height > 500){
      $('.header').addClass('header--fixed');
      $('.main').addClass('main--fixed');
    } else{
      $('.header').removeClass('header--fixed');
      $('.main').removeClass('main--fixed');
    }
  });

  $('.menu__btn').on('click', function(e){
    e.preventDefault();
    $('.header__inner').toggleClass('header__inner--active')
  });

  $('.partners-popup').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});

  $('.gift-popup').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});

  $('.form__btn-desktop').on('click', function(e){
    e.preventDefault();
    $($(this).parents('.form')).addClass('form--sended'); 
  })
  $('.form__sended-link').on('click', function(e){
    e.preventDefault();
    $($(this).parents('.form')).removeClass('form--sended'); 
  })

  
  const swiper3 = new Swiper('.partners__slider', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1000: {
        slidesPerView: 4,
        spaceBetween: 20,
      }
    }
  });

  const swiper2 = new Swiper('.current__slider', {
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        initialSlide: 0,
        spaceBetween: 40,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        },
        navigation: false,
      },
      480: {
        pagination: false
      },
      1000: {
        slidesPerView: 2.4,
        initialSlide: 1,
        spaceBetween: 60,
        centeredSlides: true,
      }
    }
  });
  $('.benefits__item').on({
    mouseenter: function(){
      if($(this).hasClass('benefits__item--animate')){
        $($(this)).addClass('benefits__item--active');
      }
    },
    mousemove: function(e){
      if($(this).hasClass('benefits__item--animate')){
        var x,y,offset,widthEl,heightEl;
        widthEl = $($(this).find('.benefits__item-img')).width() / 2;
        heightEl = $($(this).find('.benefits__item-img')).height() / 2;
        offset = $(this).offset();
        x = e.pageX - offset.left - widthEl;
        y = e.pageY - offset.top - heightEl;
        x = x + 'px';
        y = y + 'px';

        $($(this).find('.benefits__item-img')).css({'left':`${x}`, 'top': `${y}`});

      }
    },
    mouseleave: function(){
      $(this,'.benefits__item').removeClass('benefits__item--active');
    },
    
  });


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

  // Dynamic Adapt v.1
  "use strict";

  function DynamicAdapt(type) {
    this.type = type;
  }

  DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // массив объектов с подходящим брейкпоинтом
      const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
    }
  };

  DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
    } else {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        if (оbject.element.classList.contains(this.daClassname)) {
          this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
      }
    }
  };

  // Функция перемещения
  DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
    }
    if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
  }

  // Функция возврата
  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
      parent.insertAdjacentElement('beforeend', element);
    }
  }

  // Функция получения индекса внутри родителя
  DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  };

  // Функция сортировки массива по breakpoint и place 
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return -1;
          }

          if (a.place === "last" || b.place === "first") {
            return 1;
          }

          return a.place - b.place;
        }

        return a.breakpoint - b.breakpoint;
      });
    } else {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return 1;
          }

          if (a.place === "last" || b.place === "first") {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };

  const da = new DynamicAdapt("max");
  da.init();

  const viewport = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  if(viewport > 1000){
    $('.benefits__item').addClass('benefits__item--animate');
  }else if(viewport < 635){
    if($('.menu__list').children('#button').length == 0){
      $('#button').clone().appendTo('.menu__list');
    }
  }else{
    $('.menu__list').children('#button').remove();
    $('.benefits__item').removeClass('benefits__item--animate');
  }

  $(window).on('resize', function(e){
    const viewport = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if(viewport > 1000){
      $('.benefits__item').addClass('benefits__item--animate');
    }else if(viewport < 635){
      if($('.menu__list').children('#button').length == 0){
        $('#button').clone().appendTo('.menu__list');
      }
    }else{
      $('.menu__list').children('#button').remove();
      $('.benefits__item').removeClass('benefits__item--animate');
    }
  })
})