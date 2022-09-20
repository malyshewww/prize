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

// Подключение модуля Табы
import "./modules/tabs.js";

// Подключение модуля Spollers
import "./modules/spollers.js";

// Подключение модуля Choice (в первью карточки товара)
import "./modules/choice.js";

// Подключение модуля Observer
import "./modules/observer.js";

// Подключение модуля Формы
import "./modules/forms.js";

// Подключение скрипта калькулятора
import "./modules/calc.js";

// Увеличенные изображения в карточке товара
import "./modules/fslightbox.js";

// Ленивая загрузка изображений
import "./modules/lazysizes.min.js";

// Подключение скрипта jspdf
// import "./modules/jspdf.js";
// import { JSDOM } from "jsdom";
// let dom = new JSDOM();

// Cart compound
document.addEventListener('click', cartActions);
function cartActions(event) {
	const target = event.target;
	if (target.closest('.cart-item__value-compound')) {
		let parent = target.closest('.cart-item');
		parent.classList.toggle('active');
		if (parent.classList.contains('active')) {
			target.innerHTML = "свернуть";
		} else {
			target.innerHTML = "раскрыть";
		}
	}
}
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
	enableTouch: true,
	zoom: true,
	scale: 1,
	showZoomInOutIcons: true,
	actualSize: true,
});

// Составы и Веса в Карточке товара
const mainCardInfo = document.querySelector('.main-card__info');
const allCompounds = document.querySelectorAll('[data-compound]');
const allWeight = document.querySelectorAll('[data-weight]');

if (mainCardInfo) {
	allCompounds.forEach((item) => {
		item.addEventListener('change', function () {
			const currentCompound = item;
			const weightId = item.dataset.compound;
			const currentWeight = document.getElementById(weightId);
			allWeight.forEach((el) => {
				el.classList.remove('active');
			})
			allCompounds.forEach((el) => {
				el.classList.remove('active');
			})
			currentCompound.classList.add('active');
			currentWeight.classList.add('active');
			let weightItemInputs = currentWeight.querySelectorAll('.parameters-group--weight .real-radio');
			weightItemInputs[0].checked = true;
		})
	})
}
// document.querySelector('[data-compound]').click();

// Отправка формы при change
const parameters = document.querySelectorAll('.parameters-radiobutton');
parameters.forEach((item) => {
	item.addEventListener('change', (event) => {
		const allWeight = document.querySelectorAll('[data-weight]');
		const parentForm = item.closest('form');
		allWeight.forEach((el) => {
			if (parentForm && parentForm.length > 0) {
				parentForm.submit();
			}
		})
	})
})




// const pathname = window.location.pathname;
// // Указываем относительный путь файла
// const url = new URL(window.location.href);
// const urlParamCompound = url.searchParams.get('compound');
// const urlParamWeight = url.searchParams.get('weight');
// console.log(urlParamWeight);
// console.log(urlParamCompound);


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