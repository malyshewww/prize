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
// import "./modules/lazysizes.min.js";

// Динамический адаптив
import "./modules/dynamic_adapt.js";

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
// window.addEventListener("resize", collectAppend)
// function collectAppend() {
// 	const collectItem = document.querySelector('.footer-collect__item');
// 	const collectButtons = document.querySelector('.footer-collect__buttons');
// 	if (window.innerWidth < 991.98) {
// 		collectItem.insertAdjacentElement("afterbegin", collectButtons)
// 		// collectItem.appendChild(collectButtons);
// 	} else {
// 		return false;
// 	}
// }
// collectAppend();
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

// Top header menu
const iconMenuTop = document.querySelector('.top-header__icon');
const menuHeaderTop = document.querySelector('.top-header__menu');
if (iconMenuTop) {
	iconMenuTop.addEventListener("click", (event) => {
		event.target.classList.toggle('active');
		menuHeaderTop.classList.toggle('show-menu');
		document.body.classList.toggle('lock');
	});
}
const menuClose = document.querySelectorAll('.menu-close');
if (menuClose) {
	for (let i = 0; i < menuClose.length; i++) {
		const elemClose = menuClose[i];
		elemClose.addEventListener('click', (event) => {
			event.target.parentNode.classList.remove('show-menu');
			document.body.classList.remove('lock');
		})
	}
}
// Menu header category
const iconMenu = document.querySelector('.burger-icon');
const menuBody = document.querySelector('.menu');
if (iconMenu) {
	iconMenu.addEventListener("click", (event) => {
		event.currentTarget.classList.toggle('active');
		menuBody.classList.toggle('show-menu');
		document.body.classList.toggle('lock');
	});
}

// Filter
const pageCategory = document.querySelector('.category-page');
const overlay = document.querySelector('.overlay');
if (pageCategory) {
	const filterBtn = pageCategory.querySelector('#filter-btn');
	const sidebar = pageCategory.querySelector('.category__aside');
	const filterClose = pageCategory.querySelectorAll('[data-filter-close]');
	function showFilter() {
		sidebar.classList.toggle('show');
		overlay.classList.toggle('show-overlay');
		document.body.classList.toggle('lock');
	};
	if (filterBtn) {
		filterBtn.addEventListener('click', function (e) {
			e.stopPropagation();
			showFilter();
		});
	}
	for (let i = 0; i < filterClose.length; i++) {
		const elemClose = filterClose[i];
		elemClose.addEventListener('click', (e) => {
			sidebar.classList.remove('show');
			overlay.classList.remove('show-overlay');
			document.body.classList.remove('lock');
		});
	}
	overlay.addEventListener('click', (event) => {
		sidebar.classList.remove('show');
		overlay.classList.remove('show-overlay');
		document.body.classList.remove('lock');
	});
}

// Search header
const mainHeaderSearch = document.querySelector('.main-header__search');
document.addEventListener('click', showSearch);
function showSearch(event) {
	const target = event.target;
	if (target.closest('.actions-header__search')) {
		mainHeaderSearch.classList.add('show-search');
		overlay.classList.add('show-overlay');
	}
	if (target.closest('.overlay')) {
		mainHeaderSearch.classList.remove('show-search');
		overlay.classList.remove('show-overlay');
	}
}

// Search parameters
// const textBlock = document.querySelector('.text-block');
const textBlock = document.querySelector('.text-block');
if (textBlock) {
	function getSearchParameters() {
		var prmstr = window.location.search.substr(1);
		return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
	}

	function transformToAssocArray(prmstr) {
		var params = {};
		var prmarr = prmstr.split("&");
		for (var i = 0; i < prmarr.length; i++) {
			var tmparr = prmarr[i].split("=");
			params[tmparr[0]] = tmparr[1];
		}
		return params;
	}
	var params = getSearchParameters();
	// console.log(params.page);

	if (params.page != null) {
		textBlock.style.display = 'none';
	} else {
		textBlock.style.display = 'block';
	}
	// const paramsString = 'page=2';
	// let searchParams = new URLSearchParams(paramsString);
}