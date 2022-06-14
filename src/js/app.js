import $ from 'jquery';
// Подключаем слайдер Swiper
import './modules/sliders.js';

// Подключаем счетчик для цены
import "./modules/stepper.js";

// Модальные окна
import "./modules/modals.js";

// Модуль яндекс карты
import "./modules/map.js";

// Подключение RANGE-SLIDER
import "./modules/range-slider.js";

// Подключение модуля выпадающего меню
import "./modules/dropdown-menu.js";

// Подключение модуля Spollers
import "./modules/spollers.js";

// Подключение модуля Табы
import "./modules/tabs.js";

// Подключение модуля Choice (в первью карточки товара)
import "./modules/choice.js";

// Подключение модуля Observer
import "./modules/observer.js";

// Подключение модуля Формы
import "./modules/forms.js";

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
				const menuParent = menuArrow.parentElement;
				menuArrow.addEventListener("click", function (e) {
					menuParent.classList.toggle('open');
				});
			}
		}
	} else {
		document.body.classList.add('_pc');
	}
}
addTouchClass();

// Подключаем Галерею LightGallery
import './libs/lightgallery.min.js';

lightGallery(document.querySelector('[data-gallery]'), {
	// plugins: [lgZoom, lgThumbnail],
	thumbnail: true,
	animateThumb: true,
	showThumbByDefault: true,
	// subHtmlSelectorRelative: true,
	enableTouch: true,
	zoom: true,
	scale: 1,
	showZoomInOutIcons: true,
	actualSize: true,
});

// Menu burger
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu');
if (iconMenu) {
	iconMenu.addEventListener("click", (event) => {
		iconMenu.classList.toggle('active');
		menuBody.classList.toggle('show-menu');
		document.body.classList.toggle('lock');
	});
}