/*================== MODALS ====================*/

const modalButtons = document.querySelectorAll('[data-modal-button]');
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
// Кнопки - Открыть Модалку
modalButtons.forEach(item => {
	item.addEventListener('click', (e) => {
		e.preventDefault();
		const modalId = item.dataset.modalButton;
		const modal = document.getElementById(modalId);
		modal.classList.add('open-modal');
		modal.querySelector('.modal__content').addEventListener('click', (event) => {
			event.stopPropagation();
		})
		bodyLock();
	})
})
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
})
document.addEventListener('DOMContentLoaded', (event) => {
	allModals.forEach(item => {
		item.style.display = 'block';
	})
})