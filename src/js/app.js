import $ from "jquery"
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
const swiper = new Swiper('.home-banner__body', {
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
const productSlider = document.querySelectorAll('.products__wrapper');
if (productSlider) {
	productSlider.forEach((el) => {
		const productSwiper = new Swiper(el, {
			modules: [Navigation],
			wrapperClass: "products__body",
			slideClass: "products__card",
			loop: false,
			spaceBetween: 30,
			slidesPerView: 4,
			watchOverflow: true,
			simulateTouch: false,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			observeParents: true,
			observer: true,
			observeSlideChildren: true,
			speed: 1000,
			navigation: {
				nextEl: '.slide-arrow.slide-arrow__next',
				prevEl: '.slide-arrow.slide-arrow__prev',
			},
		})
	})
	// $(".products__wrapper").each(function () {
	// 	const $slideItems = $(this).find(".products__card");
	// 	console.log($slideItems);
	// 	if ($slideItems.length <= 4) {
	// 		$slideItems.closest($(this)).addClass('disabled');
	// 		$(this).destroy();
	// 	}
	// })
}

const factoriesSwiper = new Swiper('.factories-slider', {
	modules: [Navigation],
	loop: true,
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

/* Проверка мобильного браузера */
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Добавление класса touch для Body если браузер мобильный */
function addTouchClass() {
	if (isMobile.any()) {
		document.body.classList.add('_touch');
		let menuArrows = document.querySelectorAll('.menu__arrow');
		if (menuArrows.length > 0) {
			for (let index = 0; index < menuArrows.length; index++) {
				let menuArrow = menuArrows[index];
				menuArrow.addEventListener("click", function (e) {
					menuArrow.parentElement.classList.toggle('active');
				});
			}
		}
	} else {
		document.body.classList.add('_pc');
	}
}
addTouchClass();

$(document).mouseup(function (e) {
	let menuContainer = $('.menu__item');
	if (!menuContainer.is(e.target) && menuContainer.has(e.target).length === 0) {
		menuContainer.removeClass('active');
	}
});

// MAIN-CARD SLIDER
const cardMainSlider = document.querySelector('.base-slider');
const cardNavSlider = document.querySelector('.thumbs-slider');
const cardNavSwiper = new Swiper(cardNavSlider, {
	modules: [Thumbs],
	direction: 'vertical',
	watchOverflow: true,
	slidesPerView: 3,
	spaceBetween: 19,
	simulateTouch: true,
	freeMode: false,
	slideClass: "thumbs-slider__item",
	wrapperClass: "thumbs-slider__wrapper",
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
	speed: 600,
	breakpoints: {
		991.98: {
			slidesPerView: 3,
		},
	},
})
const cardMainSwiper = new Swiper(cardMainSlider, {
	modules: [Thumbs, Navigation],
	slidesPerView: 1,
	watchOverflow: true,
	simulateTouch: true,
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


// STEPPER QUANTITY
const stepper = document.querySelector('.quantity-card__box');
const stepperInput = stepper.querySelector('.quantity-card__input');
const stepperBtnUp = stepper.querySelector('.quantity-card__button--plus');
const stepperBtnDown = stepper.querySelector('.quantity-card__button--minus');
if (stepper) {
	let count = stepperInput.value;
	stepperInput.addEventListener('keyup', (e) => {
		let self = e.currentTarget;
		if (self.value == '0') {
			self.value = 1;
		}
		count = stepperInput.value;
		if (count == 1) {
			stepperBtnDown.classList.add('quantity-card__button--disabled');
		} else {
			stepperBtnDown.classList.remove('quantity-card__button--disabled');
		}
	});
	stepperInput.addEventListener('change', (e) => {
		let self = e.currentTarget;
		if (!self.value) {
			self.value = 1;
		}
		count = stepperInput.value;
		if (count == 1) {
			stepperBtnDown.classList.add('quantity-card__button--disabled');
		} else {
			stepperBtnDown.classList.remove('quantity-card__button--disabled');
		}
	});
	stepperBtnUp.addEventListener('click', (e) => {
		e.preventDefault();
		count++;
		if (count == 1) {
			stepperBtnDown.classList.add('quantity-card__button--disabled');
		} else {
			stepperBtnDown.classList.remove('quantity-card__button--disabled');
		}
		stepperInput.value = count;
	});
	stepperBtnDown.addEventListener('click', (e) => {
		e.preventDefault();
		count--;
		if (count == 1) {
			stepperBtnDown.classList.add('quantity-card__button--disabled');
		} else {
			stepperBtnDown.classList.remove('quantity-card__button--disabled');
		}
		stepperInput.value = count;
	});
}
// CARD-TABS
document.addEventListener('click', tabsActions);
function tabsActions(event) {
	if (event.target.closest('[data-tab]')) {
		const tabItemId = event.target.dataset.tab;
		const tabContent = document.querySelector(`[data-tab-content="${tabItemId}"]`);
		if (tabContent) {
			const activeTabItem = document.querySelector('.active');
			const activeTabContent = document.querySelector('.show');
			if (activeTabItem) {
				activeTabItem.classList.remove('active');
				activeTabContent.classList.remove('show');
			}
			event.target.classList.toggle('active');
			tabContent.classList.toggle('show');
		}
	}
}

// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu');
if (iconMenu) {
	iconMenu.addEventListener("click", function (event) {
		iconMenu.classList.toggle('active');
		menuBody.classList.toggle('show-menu');
		document.body.classList.toggle('lock');
	});
}
const sum = (a, b) => a + b;
console.log(sum(10, 12))

