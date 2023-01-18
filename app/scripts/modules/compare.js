document.addEventListener('click', compareActions);

function getCompoundProduct(elem) {
	let parent = elem.closest("form");
	let inputId = parent.querySelector('input[name="shk-id"]');
	let inputIdValue = inputId.value;
	let compoundId = parent.querySelector('input[name="compound-id"]');
	let compoundIdValue = compoundId.value;
	return {
		id: inputIdValue,
		compound: compoundIdValue,
	};
}

let compareObj = {
	"compareGoods": {},
};
let compareList = [];
let formBottom = document.getElementById('formBottom');
if (formBottom) {
	let productId = formBottom.querySelector('input[name="shk-id"]')
	let compoundId = formBottom.querySelector('input[name="compound-id"]')
	let compoundTitle = formBottom.querySelector('input[name="compound-title"]')
	compareList.push({ "id": productId.value, "compound": compoundId.value, "title": compoundTitle.value });
	compareObj.compareGoods = compareList;
	let fieldJson = JSON.stringify(compareList);
	let inputDataCompound = formBottom.querySelector('input[name="compound_data"]')
	inputDataCompound.value = fieldJson;
}

function getFieldsToObject(initialObject) {
	const allCompare = document.querySelectorAll('[data-compare]');
	[...allCompare].forEach((item) => {
		let { id, compound } = getCompoundProduct(item);
		initialObject[id] = compound;
		// console.log(initialObject);
	})
}

function addCompareHandler() {
	let obj = {};
	getFieldsToObject(obj);
	const path = "/comparehandler";
	const formData = new FormData();
	formData.append("data", JSON.stringify(obj));
	fetch(path, {
		method: 'POST',
		body: formData,
	})
		.then((response) => response.json())
		.then((result) => {
			const updateObj = result;
			const allCompare = document.querySelectorAll('[data-compare]');
			[...allCompare].forEach((item) => {
				let { id, compound } = getCompoundProduct(item);
				Object.keys(updateObj[id]).forEach((key) => {
					console.log(updateObj[id][key]);
					if (updateObj[id][key]) {
						item.classList.add("add-compare--active");
						item.setAttribute("title", "Удалить из сравнения");
					}
				});
			})
		})
		.catch((error) => {
			console.log('error', error);
		})
}
window.addEventListener('load', addCompareHandler);

function getProducts() {
	const productsLocalStorage = localStorage.getItem('products');
	if (productsLocalStorage != null) {
		return JSON.parse(productsLocalStorage)
	}
	return {};
}
function putProducts(id, compound, activeClass) {
	let products = getProducts();
	const pushProduct = false;
	// const index = products.indexOf(id);
	// if (index === -1) {
	// 	products.push(id)
	// } else {
	// 	products.splice(index, 1)
	// }
	if (activeClass) {
		products[id] = compound;
	} else {
		delete products[id];
	}
	localStorage.setItem('products', JSON.stringify(products))
	// return {
	// 	pushProduct,
	// 	products
	// }
}
for (let i = 0; i < localStorage.length; i++) {
	console.log(localStorage[i]);
}
function indexesOf(arr, item) {
	arr.reduce(
		(acc, v, i) => (v === item && acc.push(i), acc),
		[]);
}
// var retrievedObject = localStorage.getItem('products');
// const c = document.querySelector('.compare');
// if (c) {
// 	c.insertAdjacentHTML('beforebegin', JSON.parse(retrievedObject));
// }
function compareActions(event) {
	const target = event.target;
	let activeClass = 'add-compare--active';
	if (target.closest('[data-compare]')) {
		let { id, compound } = getCompoundProduct(target);
		// putProducts(id, compound, activeClass);
		target.classList.toggle(activeClass);
		if (target.classList.contains(activeClass)) {
			target.innerText = "Удалить из сравнения";
		} else {
			target.innerText = "В сравнение";
		}
		// dataCompare(id, compound, target);
		// checkCompare(id, compound, target);
		// checkCompare(objData, target);
	}
}
// function dataCompare(id, compound, el) {
// 	const path = "/datacompare";
// 	const data = {
// 		id: id,
// 		compound: compound,
// 	}
// 	const formData = new FormData();
// 	formData.append("data", JSON.stringify(data));
// 	const newData = Object.entries(data).reduce((newData, [k, v]) => (newData.append(k, v), newData), new FormData);
// 	fetch(path, {
// 		method: 'POST',
// 		body: newData
// 	})
// 		.then((response) => response.json())
// 		.then((result) => {
// 			// if (result == 'true') {
// 			// 	el.classList.add("add-compare--active");
// 			// 	el.setAttribute("title", "Удалить из сравнения");
// 			// }
// 			console.log('success', result);
// 		})
// 		.catch((error) => {
// 			console.log('error', error);
// 		})
// }
// function checkCompare(data, el) {
// 	const path = "/checkcompare";
// 	const formData = new FormData();
// 	formData.append("data", JSON.stringify(data));
// 	const newData = Object.entries(data).reduce((newData, [k, v]) => (newData.append(k, v), newData), new FormData);
// 	fetch(path, {
// 		method: 'POST',
// 		body: formData
// 	})
// 		.then((response) => response.json())
// 		.then((result) => {
// 			if (result == 'true') {
// 				el.classList.add("add-compare--active");
// 				el.setAttribute("title", "Удалить из сравнения");
// 			}
// 			// console.log('success', result);
// 		})
// 		.catch((error) => {
// 			console.log('error', error);
// 		})
// }

// document.addEventListener('load', parseCompare);
// window.onload = parseCompare;
// function parseCompare() {
// 	let form = document.getElementById('formBottom');
// 	let inputData = form.querySelector('input[name="compound_data"]');
// 	let inputDataValue = inputData.value;
// 	const path = "/parsecompare";
// 	const formData = new FormData();
// 	navigator.sendBeacon(path, inputDataValue)
// 	formData.append("data", inputDataValue);
// 	fetch(path, {
// 		method: 'POST',
// 		body: formData,
// 	})
// 		.then((response) => response.json())
// 		.then((result) => {
// 			let object = result;
// 			// for (const key in object) {
// 			// 	const element = object[key];
// 			// 	element.forEach(el => {
// 			// 		console.log(el);
// 			// 	});
// 			// }
// 			console.log('success', result);
// 		})
// 		.catch((error) => {
// 			console.log('error', error);
// 		})
// };
