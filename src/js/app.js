import $ from "jquery"
// Подключаем слайдер Swiper из node_modules
import './modules/sliders.js';

// Подключаем счетчика для цены
import "./modules/stepper.js";

// Переход к нужному табу "Посмотреть состав"
// $(document).ready(function(){
// 	$("#menu").on("click","a", function (event) {
// 		//отменяем стандартную обработку нажатия по ссылке
// 		event.preventDefault();

// 		//забираем идентификатор бока с атрибута href
// 		var id  = $(this).attr('href'),

// 		//узнаем высоту от начала страницы до блока на который ссылается якорь
// 			top = $(id).offset().top;

// 		//анимируем переход на расстояние - top за 1500 мс
// 		$('body,html').animate({scrollTop: top}, 1500);
// 	});
// });
const parametersButtons = document.querySelectorAll('.parameters__buttons');
for (let i = 0; i < parametersButtons.length; i++) {
	const el = parametersButtons[i];
	let parametersButton = el.querySelectorAll('.parameters__button');
	el.addEventListener('click', (event) => {
		// Отлавливаем элемент в родители на который мы нажали
		let target = event.target;
		// Проверяем тот ли это элемент который нам нужен
		if (target.classList.contains('parameters__button')) {
			for (let i = 0; i < parametersButton.length; i++) {
				// Убираем у других
				parametersButton[i].classList.remove('current');
			}
			// Добавляем тому на который нажали
			target.classList.add('current');
		}
	});
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
// Модальные окна
import "./modules/modals.js";

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

