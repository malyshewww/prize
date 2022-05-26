import $ from "jquery"

// Подключаем слайдер Swiper из node_modules
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
	$('#compound').addClass('active').closest('.tabs__item').siblings().find('.tabs__link').removeClass('active');
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
// document.addEventListener('click', tabsActions);
function tabsActions(event) {
	event.preventDefault();
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

// Accordeon
$('.item-accordeon__header').click(function (event) {
	if ($('.accordeon')) {
		$('.item-accordeon__header').not($(this)).removeClass('active');
		$('.item-accordeon__content').not($(this).next()).removeClass('open').slideUp(500);
	}
	$(this).toggleClass('active').next().slideToggle(300);
});

window.addEventListener('customScroll', (event) => {
	const item = event.detail.item;
	const parent = item.closest('.tabs');
	console.log(parent);
	window.scrollTo({ top: parent.offsetTop });
	console.log(event);
})
let flag = true;
window.addEventListener('hashchange', (event) => {
	console.log('Click');
	let hash = window.location.hash;
	const hashLInk = document.querySelector(`.tabs__link[href$="${hash}"]`);
	const hashElement = document.querySelector(hash);
	document.querySelectorAll('.tabs__link').forEach((child) => {
		child.classList.remove('active')
	})
	setTimeout(() => {
		document.querySelectorAll('.tabs__content').forEach((child) => {
			child.classList.remove('show')
		})
		hashLInk.classList.add('active');
		hashElement.classList.add('show');
		if (flag) {
			window.dispatchEvent(new CustomEvent("customScroll", {
				detail: {
					item: hashElement,
				},
			}))
			flag = false;
		}
	}, 100)
})
if (window.location.hash) {
	window.dispatchEvent(new Event("hashchange"))
	console.log('if');
}




// Sticky aside in Cart
const cart = document.querySelector('.cart');
if (cart) {
	window.addEventListener("scroll", scrollPosition);
	window.addEventListener("resize", scrollPosition);
	function scrollPosition() {
		cartPosition();
	}
	function cartPosition() {
		if (window.innerWidth > 992) {
			const wrapper = document.querySelector('.wrapper');
			/*Позиция элемента от верха страницы
			В данном случае - это 100px
			*/
			const cartPosition = cart.getBoundingClientRect().top + scrollY;
			// const headerTopHeight = headerTop.getBoundingClientRect().height;
			/*Если прокручено больше,чем позиция элемента, т.е. больше 100px
			добавляем класс fixed
			*/
			if (scrollY > cartPosition) {
				cart.classList.add('sticky');
				wrapper.style.overflow = 'visible';
			} else {
				cart.classList.remove('sticky');
				wrapper.style.overflow = 'hidden';
			}
		}
	}
}

/*===== FORM FOCUS =====*/
const fields = document.querySelectorAll("[data-field]")
/*=== Add focus ===*/
function addfocus() {
	let parent = this.parentNode;
	parent.classList.add("focus")
}
/*=== Remove focus ===*/
function remfocus() {
	let parent = this.parentNode;
	if (this.value == "") {
		parent.classList.remove("focus");
	}
}
/*=== To call function===*/
fields.forEach(input => {
	input.addEventListener("focus", addfocus)
	input.addEventListener("blur", remfocus)
})

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

