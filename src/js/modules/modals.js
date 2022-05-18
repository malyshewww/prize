/*================== MODALS ====================*/
const modalButtons = document.querySelectorAll('[data-modal-button]');
const modalClosebuttons = document.querySelectorAll('[data-modal-close]');
const allModals = document.querySelectorAll('[data-modal]');

function bodyLock() {
	setTimeout(function () {
		document.body.classList.add('lock');
	}, 400)
}
function bodyUnLock() {
	setTimeout(function () {
		document.body.classList.remove('lock');
	}, 400)
}
function closeModal(currentModal) {
	currentModal.classList.remove('open-modal');
	bodyUnLock();
}
// Кнопки - Открыть Модалку
modalButtons.forEach(function (item) {
	item.addEventListener('click', function (e) {
		e.preventDefault();
		const modalId = this.dataset.modalButton;
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
	item.addEventListener('click', function () {
		let currentModal = this.closest('.modal');
		closeModal(currentModal);
	})
})
// Закрытие модалок по фейду
allModals.forEach(function (item) {
	item.addEventListener('click', function (e) {
		e.preventDefault();
		this.classList.remove('open-modal');
		bodyUnLock();
	});
})