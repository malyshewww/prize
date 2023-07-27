// Подключаем Jquery
import './libs/jquery.min.js';

// Увеличенные изображения в карточке товара
// import "./libs/jquery.fancybox.min.js";
import fslightbox from "fslightbox";

// Подключаем слайдер Swiper
import './modules/sliders.js';

// Подключаем счетчик для цены
import "./modules/stepper.js";

// Модальные окна
import "./modules/modals.js";

// Подключение RANGE-SLIDER
import "./modules/range-slider.js";

// Подключение модуля выпадающего меню
import "./modules/dropdown-menu.js";

// Подключение модуля Табы
import "./modules/tabs.js";

// Подключение модуля Spollers
import "./modules/spollers.js";

// Подключение модуля Choice (в первью карточки товара)
// import "./modules/choice.js";
import "./modules/options.js";

// Подключение модуля Observer
import "./modules/observer.js";

// Подключение модуля Формы
import "./modules/forms.js";

// Подключение скрипта калькулятора
// import "./modules/calc.js";

// Динамический адаптив
import "./modules/dynamic_adapt.js";

// Одиночные действия на отдельных элементах
import * as single from "./modules/single-actions.js";

// Инициализация галереи
// import "./modules/galleries";

// Модуль яндекс карты
import "./modules/map.js";

// Падающий снег
import "./modules/snow.js";

// Модуль Избранных товаров
// import "./modules/favorites.js";

// Модуль Для скачивания состава подарка + добавление данных в скрытый инпут в json формате
import "./modules/download-compound.js";

// Сравнение
// import "./modules/compare.js";

/* Проверка мобильного браузера */
let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Mozilla: function () { return navigator.userAgent.match(/Mozilla/i); },
	Firefox: function () { return navigator.userAgent.match(/Firefox/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
/* Добавление класса touch для Body если браузер мобильный */
let menuArrows = document.querySelectorAll('.menu__arrow');
if (menuArrows.length > 0) {
	for (let index = 0; index < menuArrows.length; index++) {
		let menuArrow = menuArrows[index];
		const menuParent = menuArrow.parentElement;
		menuArrow.addEventListener("click", function (e) {
			menuParent.classList.toggle('open');
		});
	}
}

function addTouchClass() {
	if (isMobile.any()) {
		document.body.classList.add('_touch');
	} else {
		document.body.classList.add('_pc');
		single.createImageCompoundTooltip();
	}
}
addTouchClass();

// function syncScroll(el1, el2) {
// 	let $el1 = $(el1);
// 	let $el2 = $(el2);
// 	let forcedScroll = false;
// 	$el1.onscroll = function () {
// 		performScroll($el1, $el2);
// 	};
// 	$el2.onscroll = function () {
// 		performScroll($el2, $el1);
// 	};
// 	function performScroll($scrolled, $toScroll) {
// 		if (forcedScroll) return (forcedScroll = false);
// 		setScrollTopFromPercent($toScroll, $scrolled.scrollLeft() / ($scrolled[0].scrollWidth - $scrolled.outerWidth()));
// 	}
// 	function setScrollTopFromPercent($el, percent) {
// 		forcedScroll = true;
// 		$el.scrollLeft(percent * ($el[0].scrollWidth - $el.outerWidth()));
// 	}
// }
// syncScroll($('.compare-cards__wrapper'), $('.common-compare__values'));

// const boxSlider = document.querySelector('.compare-cards');
// if (boxSlider) {
// 	const cardSlider = document.querySelector('.compare-cards__slider')
// 	const fixedSlider = document.createElement('div');
// 	fixedSlider.className = "compare-cards__slider-fixed";
// 	fixedSlider.setAttribute('id', "fixed-slider")
// 	const sliderClone = cardSlider.cloneNode(true);
// 	fixedSlider.appendChild(sliderClone)
// 	boxSlider.insertAdjacentElement('afterbegin', fixedSlider);
// 	const fixedSliderWrapper = fixedSlider.querySelector('.compare-cards__wrapper');
// 	const fixedSliderBody = fixedSlider.querySelector('.compare-cards__body');
// 	fixedSliderWrapper.classList.replace('compare-cards__wrapper', 'compare-cards__wrapper-fixed');
// 	fixedSliderWrapper.classList.add('compare-body');
// 	fixedSliderBody.classList.replace('compare-cards__body', 'compare-values');
// 	const fixedSliderItems = fixedSliderBody.querySelectorAll('.products__card');
// 	fixedSliderItems.forEach((item) => {
// 		item.classList.add('compare-item');
// 	})
// }

