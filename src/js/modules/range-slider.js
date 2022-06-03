
import noUiSlider from "nouislider";
// RANGE SLIDER PRICE
const rangeSliderPrice = document.getElementById('price-slider');
if (rangeSliderPrice) {
	noUiSlider.create(rangeSliderPrice, {
		start: [0, 10000],
		connect: true,
		step: 1,
		range: {
			'min': [0],
			'max': [10000]
		}
	});
	const priceStart = document.getElementById('input-price_1');
	const priceEnd = document.getElementById('input-price_2');
	const inputsPrice = [priceStart, priceEnd];
	rangeSliderPrice.noUiSlider.on('update', function (values, handle) {
		inputsPrice[handle].value = Math.round(values[handle]);
	});
	let setRangeSlider = (i, value) => {
		let arr = [null, null];
		arr[i] = value;
		rangeSliderPrice.noUiSlider.set(arr);
	};
	inputsPrice.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			console.log(index);
			setRangeSlider(index, e.currentTarget.value);
		});
	});
}

// RANGE SLIDER WEIGHT
const rangeSliderWeight = document.getElementById('weight-slider');
if (rangeSliderWeight) {
	noUiSlider.create(rangeSliderWeight, {
		start: [0, 5000],
		connect: true,
		step: 1,
		range: {
			'min': [0],
			'max': [5000]
		}
	});
	const weightStart = document.getElementById('input-weight_1');
	const weightEnd = document.getElementById('input-weight_2');
	const inputsWeight = [weightStart, weightEnd];
	rangeSliderWeight.noUiSlider.on('update', function (values, handle) {
		inputsWeight[handle].value = Math.round(values[handle]);
	});
	let setRangeSlider = (i, value) => {
		let arr = [null, null];
		arr[i] = value;
		rangeSliderWeight.noUiSlider.set(arr);
	};
	inputsWeight.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			console.log(index);
			setRangeSlider(index, e.currentTarget.value);
		});
	});
}