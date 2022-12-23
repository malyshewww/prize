document.addEventListener('click', productOptions);
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
			// let parent = target.closest('[data-select]');
			const label = parent.querySelector('.select-group__label');
			setPrice(inputResultPrice, currentPrice, productPrice);
			setWeight(inputResultWeight, selectGroupValueData)
			setCompound(inputResultCompound, inputResultCompoundGet, selectGroupCompoundText, selectGroupCompoundTextData)
			setSalePrices(salePrice, inputResultSalePrice, inputResultPrice, inputResultDiscount, productPriceOld, currentPrice)
			const input = label.querySelector('input.real-radio');
			input.checked = true;
		}
		if (target.closest('.select-group__item.select-group__header .select-group__label')) {
			const label = parent.querySelector('.select-group__label');
			const input = label.querySelector('input.real-radio');
			input.checked = true;
			setWeight(inputResultWeight, selectGroupValueData)
			setCompound(inputResultCompound, inputResultCompoundGet, selectGroupCompoundText, selectGroupCompoundTextData)
			setSalePrices(salePrice, inputResultSalePrice, inputResultPrice, inputResultDiscount, productPriceOld, currentPrice)
			setPrice(inputResultPrice, currentPrice, productPrice);
			// setCheckedInput("input.real-radio", "[data-select]");
		}

		if (target.closest('.dropdown-list .select-group__item')) {
			let parent = target.closest('[data-select]');
			let self = target;
			// let input = target.querySelector('.real-radio');
			// input.checked = true;
			// let product = parent.closest('.card-product');
			let selectGroupDropdownValue = self.querySelector('[data-select-dropdown-value]');
			let selectGroupDropdownValueData = selectGroupDropdownValue.dataset.selectDropdownValue;
			// console.log(selectGroupDropdownValueData);
			// Значение дата атрибута в выпадающем меню
			const priceValue = self.dataset.price;
			const priceSaleValue = self.dataset.salePrice;
			selectDropdownItems.forEach((el) => {
				el.classList.remove('current');
			})
			self.classList.add('current');
			setCheckedInput(".real-radio", "[data-select]");
			setPrice(inputResultPrice, priceValue, productPrice);
			setWeight(inputResultWeight, selectGroupDropdownValueData);
			setCompound(inputResultCompound, inputResultCompoundGet, selectGroupCompoundText, selectGroupCompoundTextData);
			setSalePrices(priceSaleValue, inputResultSalePrice, inputResultPrice, inputResultDiscount, productPriceOld, currentPrice)
			if (inputResultSalePrice != null) {
				selectGroupItemHeader.setAttribute('data-current-price-header', priceValue);
				selectGroupItemHeader.setAttribute('data-sale-price-header', priceSaleValue);
			}
			selectGroupItemHeader.setAttribute('data-current-price-header', priceValue);
			selectGroupValue.setAttribute('data-select-value', selectGroupDropdownValueData);
			selectGroupValue.innerHTML = selectGroupDropdownValue.innerHTML;
			// setCheckedInput("input.real-radio", "[data-select]");
			parent.classList.remove('active');
		}
		if (target.closest('.select-group__choice') && !target.classList.contains('no-choice') && parent != null && !parent.classList.contains('active')) {
			parent.classList.add('active');
		}
		// else {
		// 	const selectGroup = document.querySelectorAll('[data-select]');
		// 	selectGroup.forEach((item) => {
		// 		item.classList.remove('active')
		// 	})
		// }
	}
}
function setPrice(resultPrice, currentPrice, productPrice) {
	resultPrice.value = currentPrice;
	const currentPriceStr = currentPrice + " ₽";
	saveValuesPriceToHTML(productPrice, currentPriceStr);
}
function setWeight(resultWeight, dataWeight) {
	resultWeight.value = dataWeight;
}
function setCompound(resultCompound, resultCompoundGet, compoundText, compoundTextData) {
	resultCompound.value = compoundText.textContent;
	resultCompoundGet.value = compoundTextData;
}
function setSalePrices(salePrice, resultSale, resultPrice, resultDiscount, productOldPrice, currentPrice) {
	if (productOldPrice) {
		const salePriceStr = salePrice + " ₽";
		resultSale.value = salePrice;
		resultPrice.value = currentPrice;
		resultDiscount.value = salePrice - currentPrice;
		saveValuesPriceToHTML(productOldPrice, salePriceStr);
	}
}
function setCheckedInput(input, parent) {
	const selectParent = document.querySelector(parent);
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