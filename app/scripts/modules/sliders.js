import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
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
			slidesPerGroup: 1,
			simulateTouch: false,
			speed: 600,
			// observer: true,
			watchOverflow: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			observer: true,
			loopPreventsSlide: true,
			navigation: {
				nextEl: el.querySelector('.slide-arrow.slide-arrow__next'),
				prevEl: el.querySelector('.slide-arrow.slide-arrow__prev'),
			},
			breakpoints: {
				580: {
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					slidesPerView: 2,
					slidesPerGroup: 1,
				},
				991.98: {
					slidesPerView: 3,
					slidesPerGroup: 1,

				},
				1200: {
					slidesPerView: 4,
					slidesPerGroup: 1,
				},
			},
		})
	} else {
		el.classList.add('disabled');
	}
})
function initSliders() {
	// COMPARE SLIDER
	const comparePage = document.querySelector('.compare');
	const swiperParams = {
		watchOverflow: true,
		autoHeight: true,
		speed: 800,
		spaceBetween: 30,
		loop: false,
		slidesPerGroup: 1,
		simulateTouch: false,
		grabCursor: false,
		allowTouchMove: false,
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
	};
	if (comparePage) {
		let compareSwiper;
		let commonSwiper;
		let fixedSwiper;
		let sliderFixed = comparePage.querySelector('.compare-cards__slider-fixed .compare-cards__wrapper-fixed');
		if (sliderFixed) {
			let sliderFixedChildren = sliderFixed.querySelectorAll('.products__card').length;
			const sliderFixedControls = sliderFixed.querySelector('.compare-cards__controls');
			fixedSwiper = new Swiper(sliderFixed, {
				modules: [Thumbs, Navigation],
				watchOverflow: true,
				autoHeight: true,
				speed: 500,
				spaceBetween: 30,
				loop: false,
				slidesPerGroup: 1,
				simulateTouch: false,
				grabCursor: false,
				allowTouchMove: false,
				observer: true,
				observeParents: true,
				observeSlideChildren: true,
				slidesPerGroup: 1,
				wrapperClass: "compare-cards__body",
				slideClass: "products__card ",
				navigation: {
					nextEl: '.compare-cards__controls .slide-arrow.slide-arrow__next',
					prevEl: '.compare-cards__controls .slide-arrow.slide-arrow__prev',
				},
				breakpoints: {
					320: {
						slidesPerView: 2,
						slidesPerGroup: 1,
						spaceBetween: 17,
					},
					767.98: {
						slidesPerView: 3,
					},
				},
				on: {
					slideChange: function () {
						for (let i = 0; i < commonSwiper.length; i++) {
							commonSwiper[i].slideTo(fixedSwiper.realIndex)
						}
						compareSwiper.slideTo(fixedSwiper.realIndex)
					}
				}
			})
			if (sliderFixedChildren <= 3) {
				fixedSwiper.navigation.destroy();
				sliderFixedControls.style.display = 'none';
			}
			if (window.innerWidth <= 767.98 && sliderFixedChildren >= 3) {
				fixedSwiper.navigation.init();
				sliderFixedControls.style.display = 'block';
			}
		}
		commonSwiper = new Swiper('.compare-body', {
			modules: [Navigation],
			slideClass: "compare-item",
			wrapperClass: "compare-values",
			speed: 500,
			spaceBetween: 30,
			watchOverflow: true,
			autoHeight: true,
			simulateTouch: false,
			allowTouchMove: false,
			slidesPerGroup: 1,
			grabCursor: false,
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			navigation: {
				nextEl: '.compare-cards__controls .slide-arrow.slide-arrow__next',
				prevEl: '.compare-cards__controls .slide-arrow.slide-arrow__prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 2,
					slidesPerGroup: 1,
					spaceBetween: 17,
				},
				767.98: {
					slidesPerView: 3,
				},
			},
		})
		var interleaveOffset = 0.5;
		const compareValues = document.querySelectorAll('.compare-values');
		const compareSlider = comparePage.querySelector('.compare-cards__slider .compare-cards__wrapper');
		if (compareSlider) {
			const compareSliderItems = compareSlider.querySelectorAll('.products__card').length;
			const compareSliderControls = compareSlider.querySelector('.compare-cards__controls');
			compareSwiper = new Swiper(compareSlider, {
				modules: [Thumbs, Navigation],
				watchOverflow: true,
				autoHeight: true,
				slidesPerGroup: 1,
				wrapperClass: "compare-cards__body",
				slideClass: "products__card ",
				loop: false,
				slidesPerView: 3,
				spaceBetween: 30,
				speed: 500,
				simulateTouch: false,
				grabCursor: false,
				allowTouchMove: false,
				observer: true,
				observeParents: true,
				observeSlideChildren: true,
				navigation: {
					nextEl: '.compare-cards__controls .slide-arrow.slide-arrow__next',
					prevEl: '.compare-cards__controls .slide-arrow.slide-arrow__prev',
				},
				breakpoints: {
					320: {
						slidesPerView: 2,
						slidesPerGroup: 1,
						spaceBetween: 17,
					},
					767.98: {
						slidesPerView: 3,
					},
				},
				// Событие смены слайда
				on: {
					slideChange: function () {
						for (let i = 0; i < commonSwiper.length; i++) {
							commonSwiper[i].slideTo(compareSwiper.realIndex)
						}
						fixedSwiper.slideTo(compareSwiper.realIndex)
					},
				}
			})
			if (compareSliderItems <= 3) {
				compareSwiper.navigation.destroy();
				compareSliderControls.style.display = 'none';
			}
			if (window.innerWidth <= 767.98 && compareSliderItems >= 3) {
				compareSwiper.navigation.init();
				compareSliderControls.style.display = 'block';
			}
		}
		// function menuSlider() {
		// 	const compareValues = document.querySelectorAll('.compare-values');
		// 	[...compareValues].forEach((el) => {
		// 		// таблица стилей, где будем искать нужно нам правило
		// 		let transform = getComputedStyle(document.querySelector(".compare-cards__body")).getPropertyValue("transform");
		// 		el.style.setProperty('transform', transform)
		// 		let compareItems = el.querySelectorAll('.compare-item');
		// 		for (let index = 0; index < compareItems.length; index++) {
		// 			const item = compareItems[index];
		// 			let addIndex = item.setAttribute('data-index', index);
		// 			menuSliderRemove();
		// 			// compareSwiper.slideTo(index, 1200);
		// 			item.classList.add('_active');
		// 		}
		// 	})
		// }
		// function menuSliderRemove() {
		// 	let menuLinkActive = document.querySelector('.compare-item._active');
		// 	if (menuLinkActive) {
		// 		menuLinkActive.classList.remove('_active');
		// 	}
		// }
		// function swipeAllSliders(index) {
		// 	compareSwiper.slideTo(index);
		// 	commonSwiper.slideTo(index);
		// 	compoundSwiper.slideTo(index);
		// }
	}
	// HOME-BANNER SLIDER
	const bannerSlider = document.querySelector('.home-banner__body');
	if (bannerSlider) {
		const bannerSlides = bannerSlider.querySelectorAll('.home-banner__item').length;
		if (bannerSlides > 1) {
			let bannerSwiper = new Swiper(bannerSlider, {
				autoHeight: true,
				modules: [Navigation, Pagination],
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
				pagination: {
					el: ".home-banner__pagination",
					clickable: true,
				},
			})
		} else {
			bannerSlider.classList.add('disabled');
		}
	}

	// FACTORIES SLIDER
	const factoriesSlider = document.querySelector('.factories-slider');
	if (factoriesSlider) {
		const factoriesSlides = factoriesSlider.querySelectorAll('.factories__item').length;
		if (factoriesSlides > 5) {
			const factoriesSwiper = new Swiper(factoriesSlider, {
				modules: [Navigation],
				loop: false,
				slidesPerView: 5,
				slidesPerGroup: 1,
				spaceBetween: 49,
				wrapperClass: "factories__wrapper",
				slideClass: "factories__item",
				simulateTouch: true,
				navigation: {
					nextEl: '.factories__controls .slide-arrow__next',
					prevEl: '.factories__controls .slide-arrow__prev',
				},
				breakpoints: {
					320: {
						slidesPerView: 1,
						slidesPerGroup: 1,
					},
					479.98: {
						slidesPerView: 2,
					},
					767.98: {
						slidesPerView: 3,
					},
					991.98: {
						slidesPerView: 4,
					},
					1200: {
						slidesPerView: 5,
					},
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
			slidesPerGroup: 1,
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
				320: {
					slidesPerGroup: 1,
					slidesPerView: 3,
					spaceBetween: 13,
				},
				576: {
					slidesPerGroup: 1,
					slidesPerView: 3,
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
				},
			},
		})
	}
	if (cardMainSlider) {
		cardMainSwiper = new Swiper(cardMainSlider, {
			modules: [Thumbs, Navigation],
			watchOverflow: true,
			slidesPerView: 1,
			slidesPerGroup: 1,
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