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

// Menu header category
let unlock = true;
let iconMenu = document.querySelector(".burger-icon-wrap");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".header-menu");
	iconMenu.addEventListener("click", function (event) {
		if (unlock) {
			document.body.classList.toggle('lock');
			event.currentTarget.classList.toggle("active");
			menuBody.classList.toggle("show-menu");
		}
	});
};
export function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
export function body_lock_remove(delay) {
	const body = document.querySelector("body");
	const lockPadding = document.querySelectorAll('.lock-padding');
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, delay);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, delay);
}
export function body_lock_add(delay) {
	const body = document.querySelector("body");
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	const lockPadding = document.querySelectorAll('.lock-padding');
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, delay);
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
	let delay = 400;
	const picwrap = document.createElement('div');
	const bigpic = document.createElement('img');
	picwrap.appendChild(bigpic);
	picwrap.className = "card-compound__image-tooltip";
	const compoundImages = document.querySelectorAll('.card-compound__images');
	if (compoundImages) {
		[...compoundImages].forEach((item) => {
			const currentImage = item.querySelector('.card-compound__image img');
			// const imgParent = item.closest('.card-compound__images');
			item.addEventListener("mouseover", (e) => {
				item.appendChild(picwrap);
				bigpic.src = currentImage.src;
				bigpic.alt = currentImage.alt;
				item.classList.add('show');
			})
			item.addEventListener("mouseout", (e) => {
				item.classList.remove('show');
			})
		})
	}
}
// Show/hide weights in filter on category page
function showHideWeights() {
	const allCompoundItem = document.querySelectorAll('.filter-group__compound-item');
	allCompoundItem.forEach(el => {
		const filterList = el.querySelector('.filter-group__list');
		const btnShowMore = el.querySelector('.filter-group__show-more');
		btnShowMore.addEventListener('click', (event) => {
			event.target.classList.toggle('active');
			filterList.classList.toggle('active');
			if (btnShowMore.classList.contains('active')) {
				event.target.innerHTML = "Свернуть";
			} else {
				event.target.innerHTML = "Показать всё";
			}
		})
	});
}
showHideWeights();
if (pageCategory) {
	pageCategory.addEventListener('change', choiceCompound);
	function choiceCompound(event) {
		const target = event.target;
		if (target.closest('#classic')) {
			const inputHiddenClassic = document.querySelector('.filter-input__classic');
			let inputs = document.querySelectorAll('[data-check-weight="classic"]');
			checked(inputs, target, inputHiddenClassic);
			nullCheckedNoCompound("nocompound");
		}
		if (target.closest('#premium')) {
			const inputHiddenPremium = document.querySelector('.filter-input__premium');
			let inputs = document.querySelectorAll('[data-check-weight="premium"]');
			checked(inputs, target, inputHiddenPremium);
			nullCheckedNoCompound("nocompound");
		}
		if (target.closest('#vip')) {
			const inputHiddenVip = document.querySelector('.filter-input__vip');
			let inputs = document.querySelectorAll('[data-check-weight="vip"]');
			checked(inputs, target, inputHiddenVip);
			nullCheckedNoCompound("nocompound");
		}
		// Чекбокс для выбора товаров без состава (убрать checked со всех составов)
		// if (target.closest('#nocompound')) {
		// 	nullInputsCompound("classic", "[data-check-weight='classic']", ".filter-input__classic");
		// 	nullInputsCompound("premium", "[data-check-weight='premium']", ".filter-input__premium");
		// 	nullInputsCompound("vip", "[data-check-weight='vip']", ".filter-input__vip");
		// }
	}
	function checked(inputs, targetId, inputHidden) {
		targetId.classList.toggle('active');
		if (targetId.classList.contains('active')) {
			for (let i = 0; i < inputs.length; i++) {
				inputs[i].checked = true;
				inputHidden.value = inputs[i].dataset.checkWeight;
			}
		} else {
			for (let i = 0; i < inputs.length; i++) {
				inputs[i].checked = false;
				inputHidden.value = "";
			}
		}
	}

	function nullCheckedNoCompound(inputNoCompound) {
		const input = document.getElementById(inputNoCompound);
		input.checked = false;
	}
	function emptyCheck(inputs, inputsChecked, compoundId, inputHidden) {
		const inputsWeights = document.querySelectorAll(inputs);
		if (inputsWeights) {
			// const inputNoCompound = document.getElementById('nocompound');
			const inputHiddenClassic = document.querySelector('.filter-input__classic');
			const inputHiddenPremium = document.querySelector('.filter-input__premium');
			const inputHiddenVip = document.querySelector('.filter-input__vip');
			const inputCompoundId = document.getElementById(compoundId);
			const inputHiddenCompound = document.querySelector(inputHidden);
			for (let i = 0; i < inputsWeights.length; i++) {
				let currentInput = inputsWeights[i];
				currentInput.addEventListener('change', (event) => {
					// nullCheckedNoCompound("nocompound");
					const arrayChecked = [];
					let activeCheckboxes = document.querySelectorAll(inputsChecked);
					activeCheckboxes.forEach((checkbox) => {
						setInputValue(checkbox, inputHiddenClassic, inputHiddenPremium, inputHiddenVip);
						// const dataValue = checkbox.dataset.checkWeight;
						arrayChecked.push(checkbox.value);
					})
					if (arrayChecked.length == 0) {
						inputCompoundId.checked = false;
						inputCompoundId.classList.remove('active');
						inputHiddenCompound.value = "";
					}
					if (arrayChecked.length == inputsWeights.length) {
						inputCompoundId.checked = true;
					}
				})
			}
		}
	}
	emptyCheck("[data-check-weight='classic']", "[data-check-weight='classic']:checked", "classic", ".filter-input__classic");
	emptyCheck("[data-check-weight='premium']", "[data-check-weight='premium']:checked", "premium", ".filter-input__premium");
	emptyCheck("[data-check-weight='vip']", "[data-check-weight='vip']:checked", "vip", ".filter-input__vip");

	function setInputValue(input, inputClassic, inputPremium, inputVip) {
		const dataValueCompound = input.dataset.checkWeight;
		if (dataValueCompound == "classic") {
			inputClassic.value = dataValueCompound;
		}
		if (dataValueCompound == "premium") {
			inputPremium.value = dataValueCompound;
		}
		if (dataValueCompound == "vip") {
			inputVip.value = dataValueCompound;
		}
	}

	function resetFilters() {
		const filters = document.getElementById('filters');
		if (filters) {
			const filtersInputs = filters.querySelectorAll('.real-checkbox, .filter-group__input');
			const filtersResetBtn = filters.querySelectorAll('button[type="reset"]');
			[...filtersInputs].forEach((input) => {
				input.addEventListener('change', (event) => {
					removeAttributeBtnReset(filtersResetBtn);
				});
				input.addEventListener('input', (event) => {
					removeAttributeBtnReset(filtersResetBtn);
				});
			})
			for (const btn of filtersResetBtn) {
				window.location.search ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', 'true');
				// btn.setAttribute('disabled', true);
				btn.addEventListener('click', (event) => {
					event.preventDefault();
					nullInputsCompound("classic", "[data-check-weight='classic']", ".filter-input__classic");
					nullInputsCompound("premium", "[data-check-weight='premium']", ".filter-input__premium");
					nullInputsCompound("vip", "[data-check-weight='vip']", ".filter-input__vip");
					const baseUrl = window.location.href.split("?")[0];
					window.history.pushState('name', '', baseUrl);
					[...filtersInputs].forEach((item) => {
						item.checked = false;
						item.value = "";
					})
				})
			}
		}
	}
	function removeAttributeBtnReset(btn) {
		for (let i = 0; i < btn.length; i++) {
			btn[i].removeAttribute('disabled');
		}
	}
	function nullInputsCompound(compoundId, inputsCheck, inputHidden) {
		const compound = document.getElementById(compoundId);
		if (compound) {
			const inputsCompound = document.querySelectorAll(inputsCheck);
			const hiddenInput = document.querySelector(inputHidden);
			compound.classList.remove('active');
			compound.checked = false;
			for (let i = 0; i < inputsCompound.length; i++) {
				inputsCompound[i].checked = false;
				inputsCompound[i].removeAttribute('checked');
			}
			hiddenInput.value = "";
		}
	}
	resetFilters();
}

export { createImageCompoundTooltip }