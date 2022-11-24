window.addEventListener('click', productOptions);
function productOptions(event) {
	let target = event.target;
	let parent = target.closest('[data-select]');
	let product = parent.closest('.card-product');
	// Inputs results
	const inputResultPrice = product.querySelector('.input-card-price'); // newprice
	const inputResultSalePrice = product.querySelector('.input-card-sale-price'); // saleprice
	const inputResultWeight = product.querySelector('.input-card-weight'); // weight
	const inputResultDiscount = product.querySelector('.input-card-discount'); // discount
	const inputResultCompound = product.querySelector('.input-card-compound'); // compound name rus
	const inputResultCompoundGet = product.querySelector('.input-card-compound-get'); // compound name eng
	// Старая и новая цена на товаре
	const productPrice = product.querySelector('.card-product__price');
	const productPriceOld = product.querySelector('.card-product__price-old');
	// Название конкретного состава
	const selectGroupCompoundText = parent.querySelector('[data-text]');
	// Значение состава из дата атрибута
	const selectGroupCompoundTextData = selectGroupCompoundText.dataset.text;
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

	// Выпадающий список опций
	// const selectGroupDropdown = parent.querySelector('.dropdown-list');
	const selectDropdownItems = parent.querySelectorAll('.dropdown-list .select-group__item');

	if (target.closest('.no-choice') && parent != null) {
		const label = parent.querySelector('.select-group__label');
		saveValuesToInputs(product, parent, inputResultPrice, inputResultWeight, inputResultCompound, inputResultCompoundGet, currentPrice, selectGroupValueData, productPrice, selectGroupCompoundText, selectGroupCompoundTextData)
		saveValuesToInputsThenSale(product, parent, salePrice, inputResultSalePrice, inputResultPrice, inputResultDiscount, productPriceOld, currentPrice)
		const input = label.querySelector('input.real-radio');
		input.checked = true;
		// setCheckedInput("input.real-radio", ".select-group__label");
	}
	if (target.closest('.select-group__item .select-group__label')) {
		saveValuesToInputs(product, parent, inputResultPrice, inputResultWeight, inputResultCompound, inputResultCompoundGet, currentPrice, selectGroupValueData, productPrice, selectGroupCompoundText, selectGroupCompoundTextData)
		saveValuesToInputsThenSale(product, parent, salePrice, inputResultSalePrice, inputResultPrice, inputResultDiscount, productPriceOld, currentPrice)
		// setCheckedInput(".real-radio", ".select-group__label");
	}
	if (target.closest('.dropdown-list .select-group__item')) {
		let parent = target.closest('[data-select]');
		let product = parent.closest('.card-product');
		const self = target;
		const selectGroupDropdownValue = self.querySelector('[data-select-dropdown-value]');
		// const selectGroupDropdownValueData = selectGroupDropdownValue.dataset.selectDropdownValue;
		// Значение дата атрибута в выпадающем меню
		const priceValue = self.dataset.price;
		const priceSaleValue = self.dataset.salePrice;
		selectDropdownItems.forEach((el) => {
			el.classList.remove('current');
		})
		self.classList.add('current');
		setCheckedInput(".real-radio", "[data-select]");
		setValuesInputDropdown(
			product,
			parent,
			inputResultSalePrice,
			inputResultPrice,
			inputResultDiscount,
			inputResultWeight,
			inputResultCompound,
			inputResultCompoundGet,
			priceValue,
			priceSaleValue,
			productPrice,
			productPriceOld,
			selectGroupValue,
			selectGroupDropdownValue,
			selectGroupItemHeader,
			selectGroupCompoundText,
			selectGroupCompoundTextData
		)
		parent.classList.remove('active');
	}
	if (target.closest('.select-group__choice') && !target.classList.contains('no-choice') && parent != null && !parent.classList.contains('active')) {
		parent.classList.add('active');
	}
	else {
		const selectGroup = document.querySelectorAll('[data-select]');
		selectGroup.forEach((item) => {
			item.classList.remove('active')
		})
	}
}

function setValuesInputDropdown(
	product,
	parent,
	resultSalePrice,
	resultPrice,
	resultDiscount,
	resultWeight,
	resultCompound,
	resultCompoundGet,
	priceValue,
	priceSaleValue,
	productPrice,
	productOldPrice,
	weightValue,
	weightDropdownValue,
	itemHeader,
	compoundText,
	compoundTextData
) {
	const priceValueStr = priceValue + " ₽";
	const weightDropdownValueData = weightDropdownValue.dataset.selectDropdownValue;
	if (resultSalePrice != null) {
		const priceSaleValueStr = priceSaleValue + " ₽";
		resultPrice.value = priceValue;
		resultSalePrice.value = priceSaleValue;
		resultDiscount.value = priceSaleValue - priceValue;
		saveValuesPriceToHTML(productOldPrice, priceSaleValueStr);
		itemHeader.setAttribute('data-current-price-header', priceValue);
		itemHeader.setAttribute('data-sale-price-header', priceSaleValue);
	}
	itemHeader.setAttribute('data-current-price-header', priceValue);
	weightValue.setAttribute('data-select-value', weightDropdownValueData);
	resultPrice.value = priceValue;
	saveValuesPriceToHTML(productPrice, priceValueStr);
	resultWeight.value = weightDropdownValue;
	resultCompound.value = compoundText.innerText;
	resultCompoundGet.value = compoundTextData;
	weightValue.innerText = weightDropdownValue.innerText;
}

function setCheckedInput(input, parent) {
	const selectParent = document.querySelector(parent);
	const currentInput = selectParent.querySelector(input);
	currentInput.checked = true;
}
function saveValuesToInputs(
	product,
	parent,
	resultPrice,
	resultWeight,
	resultCompound,
	resultCompoundGet,
	currentPrice,
	valueData,
	productPrice,
	compoundText,
	compoundTextData,
) {
	resultPrice.value = currentPrice;
	const currentPriceStr = currentPrice + " ₽";
	// const selectGroupValueDataStr = valueData + " г";
	resultWeight.value = valueData;
	resultCompound.value = compoundText.innerText;
	resultCompoundGet.value = compoundTextData;
	saveValuesPriceToHTML(productPrice, currentPriceStr);
}
function saveValuesToInputsThenSale(
	product,
	parent,
	salePrice,
	resultSale,
	resultPrice,
	resultDiscount,
	productOldPrice,
	currentPrice
) {
	if (productOldPrice) {
		const salePriceStr = salePrice + " ₽";
		resultSale.value = salePrice;
		resultPrice.value = currentPrice;
		resultDiscount.value = salePrice - currentPrice;
		saveValuesPriceToHTML(productOldPrice, salePriceStr);
	}
}
function saveValuesPriceToHTML(price, priceStr) {
	price.innerText = priceStr;
}

document.addEventListener('keydown', (e) => {
	const selectGroup = document.querySelectorAll('[data-select]');
	if (selectGroup) {
		selectGroup.forEach((item) => {
			if (e.key === 'Tab' || e.key === 'Escape') {
				item.classList.remove('active')
			}
		})
	}
});