/*================== MODALS ====================*/
import { body_lock } from "./single-actions.js";

let wrapper = document.querySelector('.wrapper');
const modalButtons = wrapper.querySelectorAll('[data-modal-button]');
const modalClosebuttons = document.querySelectorAll('[data-modal-close]');
const allModals = document.querySelectorAll('[data-modal]');

function closeModal(currentModal) {
	currentModal.classList.remove('open-modal');
	body_lock();
}
document.addEventListener('click', openModal);
function openModal(event) {
	const target = event.target;
	const modals = document.querySelectorAll('[data-modal]');
	// console.log(target);
	if (target.closest('[data-modal-button]')) {
		event.preventDefault();
		const modalId = target.dataset.modalButton;
		modals.forEach((item) => {
			const modal = item.getAttribute('id');
			if (modalId == modal) {
				item.classList.add('open-modal');
				body_lock();
			}
		})
	}
	if (target.closest('[data-modal-button="modal-request"]')) {
		const parent = target.closest('form');
		const productInputName = parent.querySelector('input[name="shk-name"]');
		const formRequest = document.getElementById('form-request');
		const formRequestInput = formRequest.querySelector('input[name="product-title"]');
		formRequestInput.value = productInputName.value;
	}
}
function clearInput() {
	const formRequest = document.getElementById('form-request');
	const formRequestInput = formRequest.querySelector('input[name="product-title"]');
	formRequestInput.value = '';
}
// Кнопки - Открыть Модалку
// modalButtons.forEach(item => {
// 	item.addEventListener('click', (e) => {
// 		e.preventDefault();
// 		const modalId = item.dataset.modalButton;
// 		const modal = document.getElementById(modalId);
// 		modal.classList.add('open-modal');
// 		modal.querySelector('.modal__content').addEventListener('click', (event) => {
// 			event.stopPropagation();
// 		})
// 		bodyLock();
// 	})
// })
// Кнопки - Закрыть Модалку
modalClosebuttons.forEach(item => {
	item.addEventListener('click', () => {
		clearInput();
		let currentModal = item.closest('.modal');
		closeModal(currentModal);
	})
})
// Закрытие модалок по фейду
allModals.forEach(item => {
	item.style.display = 'none';
	item.addEventListener('click', (e) => {
		e.preventDefault();
		clearInput();
		item.classList.remove('open-modal');
		body_lock();
	});
	const modalContent = item.querySelector('.modal__content');
	modalContent.addEventListener('click', (e) => {
		e.stopPropagation();
	})
})
document.addEventListener('DOMContentLoaded', (event) => {
	allModals.forEach(item => {
		item.style.display = 'block';
	})
})