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

// Menu header category
const iconMenu = document.querySelector('.burger-icon-wrap');
const menuBody = document.querySelector('.header-menu');
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

// Card-compound image-tooltip
function createImageCompoundTooltip() {
	const picwrap = document.createElement('div');
	const bigpic = document.createElement('img');
	picwrap.appendChild(bigpic);
	picwrap.className = "card-compound__image-tooltip";
	const compoundImages = document.querySelectorAll('.card-compound__images');
	if (compoundImages) {
		compoundImages.forEach((item) => {
			const currentImage = item.querySelector('.card-compound__image img');
			// const imgParent = item.closest('.card-compound__images');
			item.addEventListener("mouseover", (e) => {
				item.appendChild(picwrap);
				bigpic.src = currentImage.src;
				bigpic.alt = currentImage.alt;
				picwrap.classList.add('show');
			})
			item.addEventListener("mouseout", (e) => {
				picwrap.classList.remove('show');
			})
		})
	}
}
if (document.body.classList.contains('_pc')) {
	createImageCompoundTooltip();
}