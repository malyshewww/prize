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
// COMPARE SLIDER
const comparePage = document.querySelector('.compare');
export let compareSwiper;
if (comparePage) {
	const swiperParams = {
		speed: 500,
		// autoHeight: true,
		spaceBetween: 30,
		slidesPerGroup: 1,
		slidesPerView: 3,
		loop: false,
		slidesPerGroup: 1,
		simulateTouch: false,
		allowTouchMove: false,
		grabCursor: false,
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		breakpoints: {
			320: {
				slidesPerView: 2,
				spaceBetween: 17,
				simulateTouch: true,
				allowTouchMove: true,
				slidesPerGroup: 1,
			},
			767.98: {
				slidesPerView: 3,
				slidesPerGroup: 1,
			},
		},
	};
	const compareSlider = comparePage.querySelector('.compare-cards__slider .compare-cards__wrapper');
	if (compareSlider) {
		const compareSliderItems = compareSlider.querySelectorAll('.products__card');
		const compareSliderControls = compareSlider.querySelector('.compare-cards__controls');
		compareSwiper = new Swiper(compareSlider, {
			modules: [Navigation],
			wrapperClass: "compare-cards__body",
			slideClass: "products__card ",
			...swiperParams,
			navigation: {
				nextEl: '.compare-cards__controls .slide-arrow__next',
				prevEl: '.compare-cards__controls .slide-arrow__prev',
			},
		})
		if (compareSliderItems.length <= 3) {
			compareSwiper.navigation.destroy();
			compareSliderControls.style.display = 'none';
		}
		function setStylesElement() {
			$('.data-compare .compare-item').attr('style', $('.compare-cards .products__card').attr('style'))
		}
		setStylesElement();
		window.addEventListener('resize', () => {
			setStylesElement()
		})
		compareSwiper.on('slideChange', function () {
			$('.data-compare .compare-values')
				.attr('style', $('.compare-cards__slider .compare-cards__wrapper')
					.find('.compare-cards__body').attr('style'));
		})
		let root = document.querySelector('.data-compare')
		let options = {
			root: root,
		}
		// Создаем новый observer (наблюдатель)
		let observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				// получаем свойства, которые доступны в объекте entry
				const { target, isIntersecting } = entry;
				if (isIntersecting) {
					target.classList.remove('hidden')
				} else {
					target.classList.add('hidden')
				}
			});
		}, options);
		// Задаем элемент(-ы) для наблюдения
		let elements = document.querySelectorAll('.data-compare .compare-item');
		// Прикрепляем его к «наблюдателю»
		elements.forEach(function (item) {
			observer.observe(item);
		})
	}
}
function initSliders() {
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