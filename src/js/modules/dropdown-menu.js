// DROP-MENU
document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
   const dropMenuBtn = document.querySelector('.dropdown__button');
   const dropMenuList = dropDownWrapper.querySelector('.dropdown-list');
   const dropMenuListItems = dropMenuList.querySelectorAll('.dropdown-list__item');
   const dropMenuInput = dropDownWrapper.querySelector('.dropdown__input-hidden');
   // Клик по кнопке. Открыть/Закрыть select
   dropMenuBtn.addEventListener('click', function (e) {
      dropMenuList.classList.toggle('show');
      dropDownWrapper.classList.toggle('active');
      this.classList.toggle('active');
   });
   // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
   dropMenuListItems.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
         e.stopPropagation();
         dropMenuBtn.innerHTML = this.innerHTML;
         dropMenuBtn.focus();
         dropMenuInput.value = this.dataset.value;
         dropMenuList.classList.remove('show');
         dropMenuBtn.classList.remove('active');
         dropDownWrapper.classList.remove('active');
      });
   });
   // Клик снаружи дропдауна. Закрыть дропдаун
   document.addEventListener('click', function (e) {
      if (e.target !== dropMenuBtn) {
         dropMenuBtn.classList.remove('active');
         dropMenuList.classList.remove('show');
         dropDownWrapper.classList.remove('active');
      }
   });
   // Нажатие на Tab или Escape. Закрыть дропдаун
   document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
         dropMenuBtn.classList.remove('active');
         dropMenuList.classList.remove('show');
         dropDownWrapper.classList.remove('active');
      }
   });
});