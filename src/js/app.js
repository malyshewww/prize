import $ from "jquery"

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

// Переключение кнопок с превью карточки товара
$('.choice-group__wrap').on('click', function () {
	$(this).addClass('active').siblings().removeClass('active');
})
$(document).on('mouseup', function (e) {
	var div = $(".choice-group__wrap");
	if (!div.is(e.target) && div.has(e.target).length === 0) {
		div.removeClass("active")
	}
});

// Переход к табу "Cостав"
// $(".parameters__watch").on("click", function (event) {
// 	//отменяем стандартную обработку нажатия по ссылке
// 	event.preventDefault();
// 	//забираем идентификатор бока с атрибута href
// 	let id = $(this).attr('href'),
// 		//узнаем высоту от начала страницы до блока на который ссылается якорь
// 		top = $(id).offset().top;
// 	$('#compound').addClass('active').closest('.tabs__item').siblings().find('.tabs__link').removeClass('active');
// 	$('.tabs__content--compound').addClass('show').siblings().removeClass('show');
// 	//анимируем переход на расстояние - top за 800 мс
// 	$('body,html').animate({ scrollTop: top }, 800);
// });

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
					menuArrow.parentElement.classList.toggle('open');
				});
			}
		}
	} else {
		document.body.classList.add('_pc');
	}
}
addTouchClass();

// Accordeon
$('.item-accordeon__header').on('click', function (event) {
	$('.item-accordeon__header').not($(this)).removeClass('active');
	$('.item-accordeon__content').not($(this).next()).removeClass('open').slideUp(500);
	$(this).toggleClass('active').next().slideToggle(300);
});

// HashChange Event for Tabs
window.addEventListener('hashchange', (event) => {
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
		const hashElementParent = hashElement.closest('.tabs');
		const hashElementParentPosition = hashElementParent.getBoundingClientRect().top;
		const viewportHeight = window.innerHeight;
		if (hashElementParentPosition > (viewportHeight / 2)) {
			window.scrollTo({ top: hashElementParent.offsetTop, behavior: "smooth" });
		}
	}, 100)
	if (window.location.hash) {
		window.dispatchEvent(new Event("hashchange"))
	}
})
/**
	Создаем intersection observer
	callback - callback-функция
	options - объект опций, если они необходимы (необязательный параметр)
*/
// Указываем элемент для «наблюдения»
const collect = document.getElementById('collect-footer');
const collectItem = collect.querySelector('.footer-collect__item')
const callback = ([entry]) => {
	const targetInfo = entry.boundingClientRect;
	const rootBoundsInfo = entry.rootBounds;
	if (targetInfo.bottom > rootBoundsInfo.bottom && targetInfo.top > rootBoundsInfo.top) {
		collect.classList.add('show');
	} else {
		collect.classList.remove('show');
	}
};
// Задаем опции для «наблюдателя»
const options = {
	rootMargin: '0px 0px -1px 0px',
	// Когда будет срабатывать callback функция
	threshold: [1]
}
// Создаем новый «наблюдатель»
const observer = new IntersectionObserver(callback, options);
// Прикрепляем «наблюдателя» к элементу
observer.observe(collect);


// CollectFooter
const collectFooter = document.querySelector('.collect-footer');
collectFooter.addEventListener('mouseenter', () => {
	collectFooter.classList.add('show');
})
collectFooter.addEventListener('mouseleave', () => {
	collectFooter.classList.remove('show');
})

// Sticky aside in Cart
// const cart = document.querySelector('.cart');
// if (cart) {
// 	window.addEventListener("scroll", scrollPosition);
// 	window.addEventListener("resize", scrollPosition);
// 	function scrollPosition() {
// 		cartPosition();
// 	}
// 	function cartPosition() {
// 		if (window.innerWidth > 992) {
// 			const wrapper = document.querySelector('.wrapper');
// 			const cartPosition = cart.getBoundingClientRect().top + window.scrollY;
// 			if (window.scrollY > cartPosition) {
// 				cart.classList.add('sticky');
// 				wrapper.style.overflow = 'visible';
// 			} else {
// 				cart.classList.remove('sticky');
// 				wrapper.style.overflow = 'hidden';
// 			}
// 		}
// 	}
// }

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

