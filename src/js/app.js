import $ from "jquery"

// Подключаем слайдер Swiper из node_modules
import './modules/sliders.js';

// Подключаем счетчик для цены
import "./modules/stepper.js";

// Модальные окна
import "./modules/modals.js";

// Переключение кнопок с параметрами "Состав" и "Вес"
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

// Переход к табу "Cостав"
$(".parameters__watch").on("click", function (event) {
	//отменяем стандартную обработку нажатия по ссылке
	event.preventDefault();
	//забираем идентификатор бока с атрибута href
	let id = $(this).attr('href'),
		//узнаем высоту от начала страницы до блока на который ссылается якорь
		top = $(id).offset().top;
	$('#compound').addClass('active').siblings().removeClass('active');
	$('.tabs__content--compound').addClass('show').siblings().removeClass('show');
	//анимируем переход на расстояние - top за 800 мс
	$('body,html').animate({ scrollTop: top }, 800);
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

