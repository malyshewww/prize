window.d = window.document;
window.packcost = 0;
window.prodObj = {
	'prod': {},
	'pack': { 'title': 'Без упаковки', 'value': 0 }
};
d.addEventListener("DOMContentLoaded", ready);
const collectProdForm = d.getElementById("collectProdForm");
const collectProdFormNuts = d.getElementById("collectProdFormNuts");
const collectPackageForm = d.getElementById('collectPackageForm');
const collectPackageFormNuts = d.getElementById('collectPackageFormNuts');
const resetBtn = d.getElementById('calc-btn-reset');
function ready() {
	if (resetBtn) {
		resetBtn.addEventListener('click', function (e) {
			console.log('click !');
			e.preventDefault();
			resetForms();
			if (collectProdForm !== null) {
				localStorage.removeItem('window.inputsData');
				window.inputsData = {};
				// $("#calc-package-null").trigger("change");
			}
			if (collectProdFormNuts !== null) {
				localStorage.removeItem('window.inputsNutsData');
				window.inputsNutsData = {};
				// $("#calc-package-nuts-null").trigger("change");
			}
			setTimeout(() => {
				e.target.closest('.modal').classList.remove('open-modal');
				document.body.classList.remove('lock');
			}, 500)
		});
	}
	function setToLocalStorage(inputValue, inputName, className) {
		if (collectProdForm !== null) {
			if (inputValue !== '0' && (window.inputsData[inputName] === undefined || window.inputsData[inputName] !== inputValue)) {
				window.inputsData[inputName] = inputValue;
			}
			if (inputValue === '0') {
				delete window.inputsData[inputName];
			}
			// localStorage
			localStorage.setItem('window.inputsData', JSON.stringify(window.inputsData));
		}
		if (collectProdFormNuts != null) {
			if (inputValue !== '0' && (window.inputsNutsData[inputName] === undefined || window.inputsNutsData[inputName] !== inputValue)) {
				window.inputsNutsData[inputName] = inputValue;
			}
			if (inputValue === '0') {
				delete window.inputsNutsData[inputName];
				// console.log(window.inputsNutsData);
			}
			localStorage.setItem('window.inputsNutsData', JSON.stringify(window.inputsNutsData));
		}
	}
	let inputs = d.querySelectorAll('.calc-number');
	let makeOrderbtn = d.getElementById('calcMakeOrder');
	let calcAddtoCart = d.getElementById('calcAddToCart');
	let pack = d.querySelectorAll('input[name="package"]')[0].form;
	[...inputs].forEach((input) => {
		input.addEventListener('input', (event) => {
			const inputName = event.target.dataset.name;
			const inputValue = event.target.value;
			let val = parseInt(inputValue).toString(),
				max = 6;
			val = val.length >= max ? val.substring(0, max) : val;
			val = parseInt(val) ? val : 0;
			event.target.value = parseInt(val);
			countForm();
			setToLocalStorage(inputValue, inputName, className);
		})
		input.addEventListener('blur', (event) => {
			const inputName = event.target.dataset.name;
			const inputValue = event.target.value;
			setToLocalStorage(inputValue, inputName, className);
		})
	})
	const inputsPackage = document.querySelectorAll('input[name="package"][type="radio"]');
	[...inputsPackage].forEach((item) => {
		item.addEventListener('change', (event) => {
			const inputName = event.target.getAttribute('name');
			const inputValue = event.target.getAttribute('id');
			if (collectPackageForm !== null) {
				window.inputsData[inputName] = inputValue;
				// localStorage
				localStorage.setItem('window.inputsData', JSON.stringify(window.inputsData));
			}
			if (collectProdFormNuts !== null) {
				window.inputsNutsData[inputName] = inputValue;
				// localStorage
				localStorage.setItem('window.inputsNutsData', JSON.stringify(window.inputsNutsData));
			}
		})
	})
	const quantityBlocks = d.querySelectorAll('.collect-quantity');
	for (let elem of quantityBlocks) {
		const quantityBtnUp = elem.querySelector('.btnInc');
		const quantityBtnDown = elem.querySelector('.btnDec');
		quantityBtnDown.addEventListener('click', (e) => {
			let className = "disabled";
			let inp = e.target.nextElementSibling,
				val = parseInt(inp.value) - 1;
			val = val >= 0 ? val : 0;
			inp.value = val;
			let inputValue = inp.value;
			const inputName = inp.dataset.name;
			countForm();
			setToLocalStorage(inputValue, inputName, className);
			// current.siblings(".calc-number").trigger('blur');
			dataProductToValue();
		})
		quantityBtnUp.addEventListener('click', (e) => {
			let className = "disabled";
			let inp = e.target.previousElementSibling;
			inp.value = parseInt(inp.value) + 1;
			let inputValue = inp.value;
			const inputName = inp.dataset.name;
			countForm();
			setToLocalStorage(inputValue, inputName, className);
			dataProductToValue();
		})
	}

	if (pack) {
		const inputPackageNull = document.getElementById('calc-package-null');
		const inputsPackage = document.querySelectorAll('input[name="package"][type="radio"]');
		[...inputsPackage].forEach((pack) => {
			pack.addEventListener('change', function (event) {
				let target = event.target;
				packcost = parseFloat(target.value.replace(',', '.'));
				let parent = target.closest('.collect-table__tr');
				let packageTitle = parent.querySelector('.collect-table__title');
				prodObj.pack.title = packageTitle.innerText;
				prodObj.pack.value = target.value;
				countForm();
			})
		})
		// $('input[name="package"][type="radio"]').on("change", function (e) {
		//     let target = e.target;
		//     packcost = parseFloat(target.value.replace(',', '.'));
		//     let parent = target.closest('.collect-table__tr');
		//     let packageTitle = parent.querySelector('.collect-table__title')
		//     prodObj.pack.title = packageTitle.innerText;
		//     prodObj.pack.value = target.value;
		//     countForm();
		// });
		if (inputPackageNull) {
			inputPackageNull.checked = true;
		}
		if (collectProdForm !== null) {
			const data = JSON.parse(localStorage.getItem('window.inputsData'));
			window.inputsData = data ? data : {};
			const entries = Object.entries(window.inputsData);
			console.log(entries);
			entriesInputs(entries);
		}
		if (collectProdFormNuts !== null) {
			const dataNut = JSON.parse(localStorage.getItem('window.inputsNutsData'));
			window.inputsNutsData = dataNut ? dataNut : {};
			const entriesNut = Object.entries(window.inputsNutsData);
			entriesInputs(entriesNut);
		}
		function entriesInputs(entries) {
			for (const [key, value] of entries) {
				const calcNumber = document.querySelectorAll(`.calc-number[data-name='${key}']`);
				const inputsPackage = document.querySelectorAll(`input[name="package"][type="radio"][id='${value}']`);
				console.log(inputsPackage);
				if (key !== 'package') {
					[...calcNumber].forEach((item) => {
						item.setAttribute('value', value);
					})
				} else {
					[...inputsPackage].forEach((pckg) => {
						pckg.checked = true;
						pckg.dispatchEvent(new Event('change'));
					})
					// $('input[name="package"][type="radio"][id="' + value + '"]').prop('checked', true);
					// $('input[name="package"][type="radio"][id="' + value + '"]').trigger("change");
				}
			}
			// $($(".calc-number")[0]).trigger("input");
		}
	}
	if (makeOrderbtn) {
		makeOrderbtn.addEventListener('click', (e) => {
			e.preventDefault();
			if (prodObj.prod) {
				var message = JSON.stringify(prodObj),
					form = document.getElementById('form-order'),
					input = d.createElement('input');
				//message = message.replace(/[|\\]/g, "\\$&");
				if (!form) return;
				if (form.message) {
					form.message.value = message;
				} else {
					input.type = 'hidden';
					input.name = 'message';
					input.value = message;
					form.appendChild(input);
				}
			}
		});
	}
	// Collect hover images
	function createImageTooltip() {
		const picwrap = document.createElement('div');
		const bigpic = document.createElement('img');
		picwrap.appendChild(bigpic);
		picwrap.className = "collect-table__tooltip";
		const collectImages = document.querySelectorAll('.collect-table__image img');
		if (collectImages) {
			collectImages.forEach((item) => {
				const imgParent = item.closest('.collect-table__images');
				item.addEventListener("mouseover", (e) => {
					imgParent.appendChild(picwrap);
					bigpic.src = e.target.src;
					picwrap.classList.add('show');
				})
				item.addEventListener("mouseout", (e) => {
					picwrap.classList.remove('show');
				})
			})
		}
	}
	createImageTooltip();
	const printbtn = document.getElementById('print');
	if (printbtn) {
		printbtn.addEventListener('click', (e) => {
			let printbox = d.getElementById('printframe');
			if (!prodObj) return;
			let message = '<style>table{width: 100%;border-collapse: collapse;}' +
				'table,tr,td{border:1px solid #ccc; text-align: left;}' +
				'td{padding:2px 10px;}' +
				'td.total{padding:10px;background-color: #dadada}' +
				'</style>';
			message += '<h1>novogodnie-podarki.ru</h1><table>';
			for (let i in prodObj.prod) {
				message += '<tr>' +
					'<td>' + prodObj.prod[i].title + '</td>' +
					'<td>' + prodObj.prod[i].value + '</td>' +
					'<td>' + prodObj.prod[i].cost + '</td>' +
					'</tr>';
			}
			message += '<tr><td style="text-align: center;font-weight: bold;background-color: #eaeaea;" colspan="3">Упаковка</td></tr>';
			message += '<tr>' +
				'<td colspan="2">' + prodObj.pack.title + '</td>' +
				'<td>' + prodObj.pack.cost + '</td>' +
				'</tr>';
			// console.log(printbox);
			message += '<tr><td colspan="2" class="total"></td><td class="total">' +
				'<div><b>Вес:	' + prodObj.totalWeight + '</b></div>' +
				'<div><b>Цена:' + prodObj.totalPrice + '</b></div>' +
				'</td></tr>';
			printbox.contentDocument.body.innerHTML = message;
			printbox.contentWindow.print();
		})
	}
	countForm();
}
function countForm() {
	let inputsCalc = d.querySelectorAll('#collectProdForm .calc-number, #collectProdFormNuts .calc-number'),
		prodCount = 0,
		prodCountUniq = 0,
		priceCount = 0,
		weightCount = 0,
		totalPack = d.getElementById('calc_totalPack'),
		totalUniq = d.getElementById('calc_totalUniq'),
		totalWeight = d.getElementById('calc_totalWeight'),
		totalPrice = d.getElementById('calc_totalPrice'),
		totalQuan = d.getElementById('calc_totalQuan'),
		inputPrice = d.querySelector('[data-name="price"]'),
		inputWeight = d.querySelector('[data-name="weight"]'),
		prodList = {};
	for (let i = 0; i < inputsCalc.length; i++) {
		let currentInput = inputsCalc[i];
		let inputValue = currentInput.value;
		if (inputValue == '0') {
			currentInput.previousElementSibling.classList.add('disabled');
		} else {
			currentInput.previousElementSibling.classList.remove('disabled');
		}
		if (parseInt(inputValue) != 0) {
			let temp = d.getElementById('title_' + currentInput.id);
			prodCountUniq++;
			let id = currentInput.id,
				price = parseFloat(d.getElementById('price_' + id).value).toFixed(2),
				count = parseInt(inputValue);
			prodCount += count;
			priceCount += price * count;
			weightCount += parseFloat(d.getElementById('weight_' + id).value).toFixed(2) * count;
			prodList[currentInput.id] = { 'title': temp.innerText, 'value': inputValue, 'cost': price + "р." };
			inputWeight.value = weightCount.toFixed(2);
			temp = null;
		}
	}
	getPack(weightCount);
	totalUniq.innerHTML = prodCountUniq;
	totalWeight.innerHTML = weightCount.toFixed(2) + ' г';
	let totalCostAndPack = priceCount + packcost;
	inputPrice.value = totalCostAndPack.toFixed(2);
	totalPrice.innerHTML = totalCostAndPack.toFixed(2) + ' ₽';
	totalQuan.innerHTML = prodCount + ' шт';
	totalPack.innerHTML = packcost.toFixed(2) + ' ₽';
	prodObj.prod = prodList;
	prodObj.pack.cost = packcost.toFixed(2) + ' ₽';
	prodObj.totalWeight = weightCount.toFixed(2) + ' г';
	prodObj['count'] = prodCount;
	prodObj['countuniq'] = prodCountUniq;
	prodObj['price'] = priceCount.toFixed(2) + ' ₽';
	prodObj['totalPrice'] = totalCostAndPack.toFixed(2) + ' ₽';
	dataProductToValue();
	d.getElementById('calcMakeOrder').disabled = prodCount ? false : true;
	d.getElementById('print').disabled = prodCount ? false : true;
	const downloadButton = d.getElementById('download');
	if (prodCount !== 0) {
		downloadButton.classList.remove('disabled');
	} else {
		downloadButton.classList.add('disabled');
	}
	d.getElementById('calcAddToCart').disabled = prodCount ? false : true;
	d.getElementById('download').disabled = prodCount ? false : true;
	d.querySelector('.footer-collect__reset').disabled = prodCount ? false : true;
}
function dataProductToValue() {
	if (prodObj.prod) {
		let message = JSON.stringify(prodObj),
			form = document.getElementById('calcResultForm'),
			inputData = d.querySelector('[data-name="data"]');
		// message = message.replace(/[|\\]/g, "\\$&");
		if (!form) return;
		if (form.message) {
			form.message.value = message;
		} else {
			inputData.value = message;
		}
	}
}

function getPack(weight) {
	const items = d.querySelectorAll('.collectPackageForm .collect-table__td');
	for (let i = 0; i < items.length; i++) {
		let newWeight = Number(weight + 150);
		if (newWeight == 0) {
			let clss = items[i].className;
			clss = clss.replace('calc-yellow', '');
			items[i].className = clss;
		} else {
			let val = parseInt(items[i].getAttribute('data-val'));
			if (val == 0) continue;
			if (val >= newWeight) {
				items[i].classList.add('calc-yellow');
				//clss = clss.replace('calc-red','');
			} else {
				items[i].className = items[i].className.replace('calc-yellow', '');
				items[i].parentNode.classList.add('disabled');
			}
		}
	}
}
function resetForms() {
	if (collectProdForm) {
		collectProdForm.reset();
		collectPackageForm.reset();
		// checkedCalcItem();
	}
	if (collectProdFormNuts) {
		collectProdFormNuts.reset();
		collectPackageFormNuts.reset();
		// checkedCalcItem();
	}
	countForm();
}


const pdfButton = document.getElementById('download');
if (pdfButton) {
	const path = '/versiya-dlya-pechati';
	pdfButton.addEventListener('click', (event) => {
		// event.preventDefault();
		const target = event.target;
		let calcResultForm = document.getElementById('calcResultForm');
		const inputData = calcResultForm.querySelector('[data-name="data"]');
		const inputDataValue = inputData.value;
		target.setAttribute('disabled', 'true');
		const formData = new FormData();
		formData.append('message', inputDataValue);
		fetch(path, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.blob())
			.then((response) => {
				let todayDate = new Date().toISOString().slice(0, 10);
				// console.log(response);
				// const blob = new Blob([response.data], { type: 'application/pdf' });
				// const URL = window.URL || window.webkitURL;
				// const downloadUrl = URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = URL.createObjectURL(response);
				link.target = "_blank";
				link.setAttribute('download', `calculate-${todayDate}.pdf`);
				// calcResultForm.appendChild(link);
				// link.innerHTML = "Ссылка";
				link.click();
				link.remove();
				setTimeout(() => {
					// For Firefox it is necessary to delay revoking the ObjectURL.
					// https://bugzilla.mozilla.org/show_bug.cgi?id=1282407
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

// async function downloadReport() {
//     try {
//         const url = "/versiya-dlya-pechati";
//         const response = await fetch(url, {
//             method: "POST",
//             body: formData,
//         })
//         if (response.status === 200) {
//             const blob = await response.blob();
//             const downloadUrl = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = downloadUrl;
//             link.target = "_blank";
//             link.download = 'file.pdf';
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             setTimeout(() => {
//                 // For Firefox it is necessary to delay revoking the ObjectURL.
//                 // https://bugzilla.mozilla.org/show_bug.cgi?id=1282407
//                 window.URL.revokeObjectURL(downloadUrl);
//             }, 100);
//             console.log('Успех');
//             return true;
//         }
//         const result = await response.json();
//         // result.data.errors.forEach((item) => {
//         //     toast(item.message, 'error');
//         // });
//     } catch (error) {
//         console.log('error');
//         // toast(error, 'error');
//     }
//     return false;
// }


async function get() {
	let response = await fetch('/versiya-dlya-pechati');
	if (response.ok) {
		// let data = await response.json();
		console.log('success', response.status);
	} else {
		alert('error', response.status);
	}
}