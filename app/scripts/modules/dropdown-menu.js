// DROP-MENU
const filterInputSortdir = document.querySelector('.filter-input__sortdir');
// const filterInputRating = document.querySelector('.filter-input__rating');
document.querySelectorAll('.dropdown').forEach((dropDownWrapper) => {
   const dropMenuBtn = document.querySelector('.dropdown__button');
   const dropMenuList = dropDownWrapper.querySelector('.dropdown-list');
   const dropMenuListItems = dropMenuList.querySelectorAll('.dropdown-list__item');
   const dropMenuInput = dropDownWrapper.querySelector('.dropdown__input-hidden');
   // Клик по кнопке. Открыть/Закрыть select
   dropMenuBtn.addEventListener('click', (e) => {
      dropMenuList.classList.toggle('show');
      dropDownWrapper.classList.toggle('active');
      e.target.classList.toggle('active');
   });
   // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
   dropMenuListItems.forEach((listItem) => {
      listItem.addEventListener('click', (e) => {
         e.stopPropagation();
         dropMenuBtn.innerHTML = listItem.innerHTML;
         dropMenuBtn.focus();
         dropMenuInput.value = listItem.dataset.value;
         dropMenuList.classList.remove('show');
         dropMenuBtn.classList.remove('active');
         dropDownWrapper.classList.remove('active');
         const itemSortAsc = listItem.dataset.sortAsc;
         const itemSortDesc = listItem.dataset.sortDesc;
         const itemRatingUp = listItem.dataset.ratingUp;
         const itemRatingDown = listItem.dataset.ratingDown;
         const itemPricegUp = listItem.dataset.priceUp;
         const itemPriceDown = listItem.dataset.priceDown;
         if (itemSortAsc) {
            filterInputSortdir.value = itemSortAsc;
            filterInputSortdir.closest('form').submit();
         }
         if (itemSortDesc) {
            filterInputSortdir.value = itemSortDesc;
            filterInputSortdir.closest('form').submit();
         }
         if (itemRatingUp) {
            filterInputSortdir.value = itemRatingUp;
            filterInputSortdir.closest('form').submit();
         }
         if (itemRatingDown) {
            filterInputSortdir.value = itemRatingDown;
            filterInputSortdir.closest('form').submit();
         }
         if (itemPricegUp) {
            filterInputSortdir.value = itemPricegUp;
            filterInputSortdir.closest('form').submit();
         }
         if (itemPriceDown) {
            filterInputSortdir.value = itemPriceDown;
            filterInputSortdir.closest('form').submit();
         }
         if (listItem.innerHTML == dropMenuBtn.innerHTML) {
            listItem.classList.add('current');
         }
      });
   });
   // Клик снаружи дропдауна. Закрыть дропдаун
   document.addEventListener('click', (e) => {
      if (e.target !== dropMenuBtn) {
         dropMenuBtn.classList.remove('active');
         dropMenuList.classList.remove('show');
         dropDownWrapper.classList.remove('active');
      }
   });
   // Нажатие на Tab или Escape. Закрыть дропдаун
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' || e.key === 'Escape') {
         dropMenuBtn.classList.remove('active');
         dropMenuList.classList.remove('show');
         dropDownWrapper.classList.remove('active');
      }
   });
});

