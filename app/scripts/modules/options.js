// Опции для выбора состава в превью товара
document.addEventListener('click', productOptions);
function getCompoundProduct(elem) {
	let parent = elem.closest(".shk-item");
	let form = parent.querySelector('.product-form');
	let id = form.querySelector('input[name="shk-id"]').value;
	let compoundId = form.querySelector('input[name^="compoundid"]').value;
	let compoundName = form.querySelector('input[name^="compoundname"]').value;
	let price = form.querySelector('input[name="newprice"]').value;
	return {
		id,
		compoundId,
		compoundName,
		price,
	};
}
function changeStateElements(attr, text, className = "add-compare--active", target) {
	target.setAttribute('data-compare', attr);
	target.textContent = text;
	target.classList[`${attr == 'delete-compare' ? 'add' : 'remove'}`](className);
	target.setAttribute("title", text);
}
function checkOption(newObj, elem) {
	const path = "/api/compare/check";
	const formData = new FormData();
	formData.append("data", JSON.stringify(newObj));
	const newData = Object.entries(newObj).reduce((newData, [k, v]) => (newData.append(k, v), newData), new FormData);
	fetch(path, {
		method: 'POST',
		body: newData
	})
		.then((response) => response.json())
		.then((result) => {
			// console.log(result);
			let { product_id: itemId, compound_id: c_id } = newObj;
			for (const key in result) {
				const element = result[key];
				if (element['id'] == itemId && element['compound'] === c_id && element['action'] === 'true') {
					elem.setAttribute('data-compare', 'delete-compare');
					elem.textContent = 'Удалить из сравнения';
					elem.classList.add('add-compare--active');
					elem.setAttribute("title", 'Удалить из сравнения');
					// changeStateElements('delete-compare', 'Удалить из сравнения', 'add-compare--active', elem);
				} else {
					elem.setAttribute('data-compare', 'add-compare');
					elem.textContent = 'В сравнение';
					elem.classList.remove('add-compare--active');
					elem.setAttribute("title", 'В сравнение');
					// changeStateElements('add-compare', 'В сравнение', 'add-compare--active', elem);
				}
			}
			// console.log('success', result);
		})
		.catch((error) => {
			console.log('error', error);
		})
}
function productOptions(event) {
	let target = event.target;
	let parent = target.closest('[data-select]');
	if (parent) {
		let product = parent.closest('.card-product');
		// Inputs results
		const inputResultPrice = product.querySelector('.input-card-price'); // newprice
		const inputResultSalePrice = product.querySelector('.input-card-sale-price'); // saleprice
		const inputResultWeight = product.querySelector('.input-card-weight'); // weight
		const inputResultDiscount = product.querySelector('.input-card-discount'); // discount
		const inputResultCompound = product.querySelector('.input-card-compound'); // compound name rus
		const inputResultCompoundGet = product.querySelector('.input-card-compound-get'); // compound name eng
		const inputResultCompoundId = product.querySelector('.input-card-compound-id'); // compound id
		// Кнопка сравнения
		const compareBtn = product.querySelector('[data-compare]');
		let { id, compoundId } = getCompoundProduct(compareBtn);
		// Старая и новая цена на товаре
		const productPrice = product.querySelector('.card-product__price');
		const productPriceOld = product.querySelector('.card-product__price-old');
		// Название конкретного состава
		const selectGroupCompoundText = parent.querySelector('[data-text]');
		// Название конкретного состава
		const selectGroupCompoundTitle = parent.querySelector('[data-title]');
		// Значение состава из дата атрибута
		const selectGroupCompoundTextData = selectGroupCompoundText.dataset.text;
		// Значение состава из дата атрибута
		const selectGroupCompoundTitleData = selectGroupCompoundTitle.dataset.title;
		// Дата атрибут с граммовкой
		const selectGroupValue = parent.querySelector('[data-select-value]');
		// Значение из дата атрибута с граммовкой
		const selectGroupValueData = selectGroupValue.dataset.selectValue;
		// Верхняя опция на товаре
		const selectGroupItemHeader = parent.querySelector('.select-group__item.select-group__header');
		// Текущая цена на товаре
		const currentPrice = selectGroupItemHeader.dataset.currentPriceHeader; // data-current-price-header
		// Цена со скидкой (старая цена) на товаре
		const salePrice = selectGroupItemHeader.dataset.salePriceHeader; // data-sale-price-header
		// Значение id состава из дата атрибута
		const selectGroupCompoundIdData = selectGroupItemHeader.dataset.compoundId;
		// Выпадающий список опций
		const selectDropdownItems = parent.querySelectorAll('.dropdown-list .select-group__item');
		// if (target.closest('.no-choice') || target.closest('.select-group__item.select-group__header .select-group__label')) {
		// 	checkOption(newObj, compareBtn);
		// }
		// Объектт с данным для проверки наличия состава в сравнении
		let newObj = {
			product_id: id,
			compound_id: selectGroupCompoundIdData,
			action: false
		}
		if (target.closest('.no-choice') && parent != null) {
			setPrice(inputResultPrice, currentPrice, productPrice);
			setWeight(inputResultWeight, selectGroupValueData)
			setCompound(inputResultCompound, inputResultCompoundGet, selectGroupCompoundTitleData, selectGroupCompoundTextData, inputResultCompoundId, selectGroupCompoundIdData)
			setSalePrices(salePrice, inputResultSalePrice, inputResultPrice, inputResultDiscount, productPriceOld, currentPrice)
			setCheckedInput("input.real-radio", ".select-group__label", parent);
			checkOption(newObj, compareBtn);
		}
		if (target.closest('.select-group__item.select-group__header .select-group__label')) {
			setWeight(inputResultWeight, selectGroupValueData)
			setCompound(inputResultCompound, inputResultCompoundGet, selectGroupCompoundTitleData, selectGroupCompoundTextData, inputResultCompoundId, selectGroupCompoundIdData)
			setSalePrices(salePrice, inputResultSalePrice, inputResultPrice, inputResultDiscount, productPriceOld, currentPrice)
			setPrice(inputResultPrice, currentPrice, productPrice);
			setCheckedInput("input.real-radio", ".select-group__label", parent);
			checkOption(newObj, compareBtn);
		}
		if (target.closest('.dropdown-list .select-group__item')) {
			let self = target;
			let parent = self.closest('[data-select]');
			let selectGroupDropdownValue = self.querySelector('.select-group__value');
			let selectGroupDropdownValueData = selectGroupDropdownValue.dataset.selectDropdownValue;
			let selectGroupDropdownCompoundId = self.dataset.compoundId;
			// Значение дата атрибута в выпадающем меню
			const priceValue = self.dataset.price;
			const priceSaleValue = self.dataset.salePrice;
			selectDropdownItems.forEach((el) => {
				el.classList.remove('current');
			})
			self.classList.add('current');
			setCheckedInput("input.real-radio", ".select-group__label", parent);
			setPrice(inputResultPrice, priceValue, productPrice);
			setWeight(inputResultWeight, selectGroupDropdownValueData);
			setCompound(inputResultCompound, inputResultCompoundGet, selectGroupCompoundTitleData, selectGroupCompoundTextData, inputResultCompoundId, selectGroupDropdownCompoundId)
			setSalePrices(priceSaleValue, inputResultSalePrice, inputResultPrice, inputResultDiscount, productPriceOld, currentPrice)
			if (inputResultSalePrice != null) {
				selectGroupItemHeader.setAttribute('data-current-price-header', priceValue);
				selectGroupItemHeader.setAttribute('data-sale-price-header', priceSaleValue);
			}
			selectGroupItemHeader.setAttribute('data-current-price-header', priceValue);
			selectGroupValue.setAttribute('data-select-value', selectGroupDropdownValueData);
			selectGroupItemHeader.setAttribute('data-compound-id', selectGroupDropdownCompoundId);
			// selectGroupCompoundId.setAttribute('data-compound-id', selectGroupDropdownCompoundId);
			selectGroupValue.textContent = selectGroupDropdownValue.textContent;
			// setCheckedInput("input.real-radio", "[data-select]");
			let { id } = getCompoundProduct(compareBtn);
			// Объект с данным для проверки наличия состава в сравнении
			let newObjDrop = {
				product_id: id,
				compound_id: selectGroupDropdownCompoundId,
				action: false
			}
			checkOption(newObjDrop, compareBtn);
			parent.classList.remove('active');
		}
		if (target.closest('.select-group__choice') && !target.classList.contains('no-choice') && parent != null) {
			parent.classList.toggle('active');
		}
	}
}
function setPrice(resultPrice, currentPrice, productPrice) {
	resultPrice.value = Number(currentPrice);
	const currentPriceStr = `${currentPrice} ₽`;
	saveValuesPriceToHTML(productPrice, currentPriceStr);
}
function setWeight(resultWeight, dataWeight) {
	resultWeight.value = dataWeight;
}
function setCompound(resultCompound, resultCompoundGet, compoundTitleData, compoundTextData, resultCompoundId, compoundIdData) {
	resultCompound.value = compoundTitleData;
	resultCompoundGet.value = compoundTextData;
	resultCompoundId.value = compoundIdData;
}
function setSalePrices(salePrice, resultSale, resultPrice, resultDiscount, productOldPrice, currentPrice) {
	if (productOldPrice) {
		const salePriceStr = `${salePrice} ₽`;
		resultSale.value = Number(salePrice);
		resultPrice.value = Number(currentPrice);
		resultDiscount.value = Number(salePrice - currentPrice);
		saveValuesPriceToHTML(productOldPrice, salePriceStr);
	}
}
function setCheckedInput(input, label, parent) {
	const selectParent = parent.querySelector(label);
	const currentInput = selectParent.querySelector(input);
	currentInput.checked = true;
}
function saveValuesPriceToHTML(price, priceStr) {
	price.innerText = priceStr;
}
document.addEventListener('click', function (e) {
	const selectGroup = document.querySelectorAll('[data-select]');
	for (const select of selectGroup) {
		if (!select.contains(e.target)) {
			select.classList.remove('active');
		}
	}
})
// // Нажатие на Tab или Escape. Закрыть [data-select]
document.addEventListener('keydown', function (e) {
	const selectGroup = document.querySelectorAll('[data-select]');
	for (const select of selectGroup) {
		if (e.key === 'Tab' || e.key === 'Escape') {
			select.classList.remove('active')
		}
	}
});