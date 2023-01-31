console.log('test favorites.js');
document.addEventListener('click', favoriteActions);

let counter = 0;
const arrIds = [];
function getInputValues(elem) {
	let parent = elem.closest(".form");
	let inputId = parent.querySelector('input[name="shk-id"]');
	let inputAction = parent.querySelector('input[name="action"]');
	let inputIdValue = inputId.value;
	let inputActionValue = inputAction.value;
	return {
		id: inputIdValue,
		action: inputActionValue
	}
}
function getFieldsToObject(initialObject) {
	const favorites = document.querySelectorAll('[data-action]');
	[...favorites].forEach((item) => {
		let { id, action } = getInputValues(item);
		initialObject[id] = action;
	})
}

function favoriteActions(event) {
	const target = event.target;
	let activeClass = "add-favorite--active";
	if (target.closest('[data-action]')) {
		let { id, action } = getInputValues(target);
		target.classList.toggle(activeClass);
		if (target.classList.contains(activeClass)) {
			target.innerText = "Удалить из избранного";
			target.setAttribute("title", "Удалить из избранного");
			action = "add";
			// inputAction.value = "add";
		} else {
			target.innerText = "В избранное";
			target.setAttribute("title", "В избранное");
			action = "delete";
			// inputAction.value = "delete";
		}
		addFavorites(id, action, target);
		getFavoritesQuantity(id, action, target);
	}
}

function getFavoritesQuantity(id, action) {
	let dataCount = document.querySelector('[data-count-favorites]');
	const path = "api/favorites/count";
	const data = {
		id: id,
		action: action
	}
	const formData = new FormData();
	formData.append("data", JSON.stringify(data));
	const newData = Object.entries(data).reduce((newData, [k, v]) => (newData.append(k, v), newData), new FormData);
	fetch(path, {
		method: 'POST',
		body: newData
	})
		.then((response) => response.json())
		.then((result) => {
			counter = result;
			dataCount.innerHTML = counter;
			counter = counter >= 1 ? dataCount.classList.remove('hidden') : dataCount.classList.add('hidden');
			// console.log('success', result);
		})
		.catch((error) => {
			console.log('error', error);
		})
}
function addFavorites(id, action, el) {
	const path = "api/favorites/check";
	const data = {
		id: id,
		action: action
	}
	const formData = new FormData();
	formData.append("data", JSON.stringify(data));
	const newData = Object.entries(data).reduce((newData, [k, v]) => (newData.append(k, v), newData), new FormData);
	fetch(path, {
		method: 'POST',
		body: newData
	})
		.then((response) => response.json())
		.then((result) => {
			if (result == 'true') {
				el.classList.add("add-favorite--active");
				el.setAttribute("title", "Удалить из избранного");
			}
			// console.log('success', result);
		})
		.catch((error) => {
			console.log('error', error);
		})
}
window.addEventListener('load', addFavoritesHandler);
if (typeof (pdoPage) !== "undefined") {
	$(document).on('pdopage_load', addFavoritesHandler)
}

function addFavoritesHandler() {
	let obj = {};
	getFieldsToObject(obj);
	const path = "api/favorites/handler";
	const formData = new FormData();
	formData.append("data", JSON.stringify(obj));
	fetch(path, {
		method: 'POST',
		body: formData,
	})
		.then((response) => response.json())
		.then((result) => {
			const updateObj = result;
			const favorites = document.querySelectorAll('[data-action]');
			[...favorites].forEach((item) => {
				let { id } = getInputValues(item);
				if (updateObj[id]) {
					item.classList.add("add-favorite--active");
					item.setAttribute("title", "Удалить из избранного");
					// arrIds.push(id);
				}
			})
		})
		.catch((error) => {
			console.log('error', error);
		})
}
const removeFavorites = document.getElementById('removeFavorites');
if (removeFavorites) {
	removeFavorites.addEventListener('click', (event) => {
		const self = event.target;
		removeFavoritesHandler(self);
	})
	function removeFavoritesHandler(btn) {
		let obj = {};
		const parent = document.querySelector('.favorites');
		const favoritesList = parent.querySelector('.favorites__body');
		const contentBlock = parent.querySelector('.content-title');
		const dataCount = document.querySelector('[data-count-favorites]');
		getFieldsToObject(obj);
		const path = "api/favorites/remove";
		const formData = new FormData();
		formData.append("data", JSON.stringify(obj));
		fetch(path, {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((result) => {
				const updateObj = result;
				const favorites = document.querySelectorAll('[data-action]');
				[...favorites].forEach((item) => {
					let { id } = getInputValues(item);
					if (!updateObj[id]) {
						item.classList.remove('add-favorite--active');
						item.setAttribute("title", "В избранное");
						favoritesList.remove();
						dataCount.remove();
						btn.remove();
						contentBlock.classList.remove('hidden');
					}
				})
			})
			.catch((error) => {
				console.log('error', error);
			})
	}
}