import noUiSlider from "nouislider";
// import "./wNumb.min.js";
// RANGE SLIDER PRICE
const filterSliders = document.querySelectorAll('[data-filter-group]');
if (filterSliders) {
	for (var i = 0; i < filterSliders.length; i++) {
		const filterSlider = filterSliders[i];
		const rangeSlider = filterSlider.querySelector('[data-slider-filter]');
		const inputGroupItem = filterSlider.querySelector('.filter-group__item');
		const valueStart = filterSlider.querySelector('[data-value-start]');
		const valueEnd = filterSlider.querySelector('[data-value-end]');
		const inputValues = [valueStart, valueEnd];
		const valueStartNumber = valueStart.dataset.valueStart;
		const valueEndNumber = valueEnd.dataset.valueEnd;
		// const priceStart = inputGroupItem.getElementById('price-start');
		// const priceEnd = inputGroupItem.getElementById('price-end');
		// const weightStart = inputGroupItem.getElementById('weight-start');
		// const weightEnd = inputGroupItem.getElementById('weight-end');
		// valueStart.name = "";
		// valueEnd.name = "";
		noUiSlider.create(rangeSlider, {
			start: [valueStartNumber, valueEndNumber],
			connect: true,
			step: 1,
			range: {
				min: Number(valueStartNumber),
				max: Number(valueEndNumber)
			}
		});
		// rangeSlider.noUiSlider.on('slide', setRangeSlider);
		rangeSlider.noUiSlider.on('update', function (values, handle) {
			inputValues[handle].value = Math.round(values[handle]);
		});
		let setRangeSlider = (i, value) => {
			let arr = [null, null];
			arr[i] = value;
			rangeSlider.noUiSlider.set(arr);
		};
		inputValues.forEach((el, index) => {
			el.addEventListener('change', (e) => {
				// if (el.getAttribute('id', 'price-start')) {
				// 	priceStart.name = "price_from";
				// }
				// if (el.getAttribute('id', 'price-end')) {
				// 	priceEnd.name = "price_to";
				// }
				// if (el.getAttribute('id', 'weight-start')) {
				// 	weightStart.name = "weight_from";
				// }
				// if (el.getAttribute('id', 'weight-end')) {
				// 	weightStart.name = "weight_to";
				// }
				setRangeSlider(index, e.currentTarget.value);
			});
			el.addEventListener('blur', (e) => {
				setRangeSlider(index, e.currentTarget.value);
			})
		});
	}
}
