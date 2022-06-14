import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
function initSliders() {
   // HOME-BANNER SLIDER
   const bannerSlider = document.querySelector('.home-banner__body');
   if (bannerSlider) {
      const bannerSlides = bannerSlider.querySelectorAll('.home-banner__item').length;
      if (bannerSlides > 1) {
         let bannerSwiper = new Swiper(bannerSlider, {
            autoHeight: true,
            modules: [Navigation],
            wrapperClass: "home-banner__wrapper",
            slideClass: "home-banner__item",
            loop: false,
            initialSlide: 0,
            slidesPerView: 1,
            speed: 1000,
            navigation: {
               nextEl: '.home-banner-button.home-banner-button__next',
               prevEl: '.home-banner-button.home-banner-button__prev',
            },
         })
      } else {
         bannerSlider.classList.add('disabled');
      }
   }
   // PRODUCT SLIDERS
   const productSliders = document.querySelectorAll('.products__wrapper');
   productSliders.forEach((el) => {
      const productSlides = el.querySelectorAll('.products__card').length;
      if (productSlides > 4) {
         const productSwiper = new Swiper(el, {
            modules: [Navigation],
            wrapperClass: 'products__body',
            slideClass: 'products__card',
            loop: false,
            spaceBetween: 30,
            slidesPerView: 4,
            watchOverflow: true,
            zoom: true,
            simulateTouch: false,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            speed: 1000,
            observer: true,
            navigation: {
               nextEl: el.querySelector('.slide-arrow.slide-arrow__next'),
               prevEl: el.querySelector('.slide-arrow.slide-arrow__prev'),
            },
         })
      } else {
         el.classList.add('disabled');
      }
   })
   // FACTORIES SLIDER
   const factoriesSlider = document.querySelector('.factories-slider');
   if (factoriesSlider) {
      const factoriesSlides = factoriesSlider.querySelectorAll('.factories__item').length;
      if (factoriesSlides > 5) {
         const factoriesSwiper = new Swiper(factoriesSlider, {
            modules: [Navigation],
            loop: false,
            slidesPerView: 5,
            spaceBetween: 49,
            wrapperClass: "factories__wrapper",
            slideClass: "factories__item",
            simulateTouch: true,
            navigation: {
               nextEl: '.factories__controls .slide-arrow__next',
               prevEl: '.factories__controls .slide-arrow__prev',
            },
         });
      } else {
         factoriesSlider.classList.add('disabled');
      }
   }


   // MAIN-CARD SLIDER
   const cardMainSlider = document.querySelector('.base-slider');
   const cardMainSlides = document.querySelectorAll('.base-slider__item').length;
   const cardNavSlider = document.querySelector('.thumbs-slider');
   const cardNavSlides = document.querySelectorAll('.thumbs-slider__item').length;
   let cardNavSwiper;
   let cardMainSwiper;
   if (cardNavSlider) {
      cardNavSwiper = new Swiper(cardNavSlider, {
         modules: [Thumbs, Navigation],
         direction: 'vertical',
         watchOverflow: true,
         slidesPerView: 3,
         spaceBetween: 19,
         grabCursor: true,
         simulateTouch: true,
         slideClass: "thumbs-slider__item",
         wrapperClass: "thumbs-slider__wrapper",
         watchSlidesVisibility: true,
         watchSlidesProgress: true,
         speed: 600,
         observer: true,
         breakpoints: {
            991.98: {
               slidesPerView: 3,
            },
         },
      })
   }
   if (cardMainSlider) {
      cardMainSwiper = new Swiper(cardMainSlider, {
         modules: [Thumbs, Navigation],
         watchOverflow: true,
         slidesPerView: 1,
         grabCursor: true,
         slideClass: "base-slider__item",
         wrapperClass: "base-slider__wrapper",
         speed: 600,
         thumbs: {
            swiper: cardNavSwiper,
         },
         navigation: {
            nextEl: '.base-slider__controls .slide-arrow__next',
            prevEl: '.base-slider__controls .slide-arrow__prev',
         },
      })
      if (cardMainSlides == 1) {
         cardMainSlider.classList.add('disabled');
      }
   }

}

window.addEventListener("load", (e) => {
   // Запуск инициализации слайдеров
   initSliders();
});