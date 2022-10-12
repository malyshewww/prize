/*================== MODALS ====================*/
let wrapper = document.querySelector('.wrapper');
const modalButtons = wrapper.querySelectorAll('[data-modal-button]');
const modalClosebuttons = document.querySelectorAll('[data-modal-close]');
const allModals = document.querySelectorAll('[data-modal]');
function bodyLock() {
	setTimeout(() => {
		document.body.classList.add('lock');
	}, 400)
}
function bodyUnLock() {
	setTimeout(() => {
		document.body.classList.remove('lock');
	}, 400)
}
function closeModal(currentModal) {
	currentModal.classList.remove('open-modal');
	bodyUnLock();
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
				bodyLock();
			}
		})
	}
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
		let currentModal = item.closest('.modal');
		closeModal(currentModal);
	})
})
// Закрытие модалок по фейду
allModals.forEach(item => {
	item.style.display = 'none';
	item.addEventListener('click', (e) => {
		e.preventDefault();
		item.classList.remove('open-modal');
		bodyUnLock();
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