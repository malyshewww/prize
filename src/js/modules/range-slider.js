import noUiSlider from "nouislider";
// import "./wNumb.min.js";
// RANGE SLIDER PRICE
const filterSliders = document.querySelectorAll('[data-filter-group]');
if (filterSliders) {
	for (var i = 0; i < filterSliders.length; i++) {
		const filterSlider = filterSliders[i];
		const rangeSlider = filterSlider.querySelector('[data-slider-filter]');
		const valueStart = filterSlider.querySelector('[data-value-start]');
		const valueEnd = filterSlider.querySelector('[data-value-end]');
		const inputValues = [valueStart, valueEnd];
		const valueStartNumber = valueStart.dataset.valueStart;
		const valueEndNumber = valueEnd.dataset.valueEnd;
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
				setRangeSlider(index, e.currentTarget.value);
			});
		});
	}
}
