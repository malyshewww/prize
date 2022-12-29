const btnCompound = document.getElementById('download');
if (btnCompound) {
	const path = '/skachat-sostav-podarka';
	btnCompound.addEventListener('click', (event) => {
		const target = event.target;
		console.log(target);
		let formCompound = document.getElementById('formCompound');
		const inputData = formCompound.querySelector('input[name="data"]');
		const inputAlias = formCompound.querySelector('input[name="alias"]');
		const inputDataValue = inputData.value;
		const inputAliasValue = inputAlias.value;
		target.setAttribute('disabled', 'true');
		const formData = new FormData();
		formData.append('data', inputDataValue);
		fetch(path, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.blob())
			.then((response) => {
				const link = document.createElement('a');
				link.href = URL.createObjectURL(response);
				link.target = "_blank";
				link.setAttribute('download', `${inputAliasValue}.pdf`);
				link.click();
				link.remove();
				setTimeout(() => {
					window.URL.revokeObjectURL(response);
				}, 100);
				target.removeAttribute('disabled');
			})
			.catch((error) => {
				console.log('error');
				target.removeAttribute('disabled');
			})
	})
}

const compoundObj = {
	'compound': {},
}
function compoundData() {
	const cardCompound = document.querySelector('.card-compound');
	if (cardCompound) {
		const cardCompoundBoxes = cardCompound.querySelectorAll('.card-compound__box-wrap');
		const productInfo = document.querySelector('.main-card__info');
		const productTitle = productInfo.querySelector('.main-card__title');
		const productArticle = productInfo.querySelector('[data-article]');
		const productSize = productInfo.querySelector('[data-size]');
		const productCompound = productInfo.querySelectorAll('[data-compound]');
		const productWeight = productInfo.querySelectorAll('[data-current-weight]');
		const productPrice = productInfo.querySelector('.quantity-card__price');
		const productImage = document.querySelector('.base-slider__image img').src;
		const resultQuantity = productInfo.querySelector('.label-compound-result__quantity');
		let currentCompound = "";
		let currentWeight = "";
		[...productCompound].forEach(compound => {
			let input = compound.querySelector('input[name="compound');
			if (input.checked) {
				currentCompound = input.nextElementSibling.innerHTML;
			}
		});
		[...productWeight].forEach(weight => {
			let input = weight.querySelector('input[name="weight');
			if (input.checked) {
				currentWeight = input.nextElementSibling.innerHTML;
			}
		});
		compoundObj['image'] = productImage;
		compoundObj['title'] = productTitle.innerText;
		compoundObj['article'] = productArticle.innerText;
		compoundObj['size'] = productSize.innerText;
		compoundObj['currentCompound'] = currentCompound;
		compoundObj['currentWeight'] = currentWeight;
		compoundObj['resultPrice'] = productPrice.innerText;
		compoundObj['result'] = resultQuantity.innerText;
		let compoundList = {};
		for (let b = 0; b < cardCompoundBoxes.length; b++) {
			const box = cardCompoundBoxes[b];
			const boxCategory = box.querySelector('.card-compound__label');
			const boxCategoryData = boxCategory.dataset.label;
			compoundList[boxCategoryData] = [];
			const boxItems = box.querySelectorAll('.card-compound__item');
			for (let i = 0; i < boxItems.length; i++) {
				const item = boxItems[i];
				const itemCount = item.querySelector('.card-compound__count');
				const itemCompanyName = item.querySelector('.card-compound__company-name');
				const itemTitle = item.querySelector('.card-compound__title');
				compoundList[boxCategoryData].push({ "count": itemCount.innerText, "company": itemCompanyName.innerText, "title": itemTitle.innerText });
			}
		}
		compoundObj.compound = compoundList;
	}
}
compoundData();
// console.log(compoundObj);
function setDataCompoundValue() {
	let msg = JSON.stringify(compoundObj),
		form = document.getElementById('formCompound');
	if (!form) return;
	if (form) {
		let inputData = form.querySelector('input[name="data"]');
		inputData.value = msg;
	}
}
setDataCompoundValue();
