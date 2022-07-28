// Переключение кнопок с превью карточки товара
const selectGroup = document.querySelectorAll('[data-select]');
selectGroup.forEach((item, i, arr) => {
   const selectGroupItem = item.querySelector('.select-group__item');
   const selectGroupChoice = item.querySelector('.select-group__choice');
   const selectGroupDropdown = item.querySelector('.dropdown-list');
   const selectDropdownItems = item.querySelectorAll('.dropdown-list .select-group__item');
   const selectGroupValue = item.querySelector('[data-select-value]');

   const inputHidden = item.querySelector('.select-group__input-hidden');

   const product = item.closest('.card-product');
   const productPrice = product.querySelector('.card-product__price');

   if (selectGroupDropdown) {
      selectGroupChoice.addEventListener('click', (e) => {
         e.stopPropagation();
         arr.forEach(arrElement => arrElement.classList.toggle('active', arrElement === item))
      });
   }

   selectGroupItem.addEventListener('click', (e) => {
      const selectGroupItemPrice = selectGroupItem.dataset.price;
      productPrice.innerText = selectGroupItemPrice + " ₽";
   })

   selectDropdownItems.forEach((dropdownItem) => {
      let selectGroupDropdownValue = dropdownItem.querySelector('[data-select-dropdown-value]');
      if (selectGroupDropdownValue.innerText == selectGroupValue.innerText) {
         selectGroupDropdownValue.closest('.select-group__item').style.display = "none";
      }
      if (selectGroupDropdownValue.innerText !== selectGroupValue.innerText) {
         selectGroupDropdownValue.closest('.select-group__item').style.display = "flex";
      }
      dropdownItem.addEventListener('click', (e) => {
         e.stopPropagation();
         const realInput = item.querySelector('.real-radio').checked = true;
         const priceValue = dropdownItem.dataset.price;
         productPrice.innerText = priceValue + " ₽";
         selectGroupValue.innerText = selectGroupDropdownValue.innerText;
         item.classList.remove('active');

         inputHidden.value = selectGroupDropdownValue.innerText.replace(/[a-zа-яё]/gi, '');

      })
   })
});

// Клик снаружи [data-select]. Закрыть [data-select]
document.addEventListener('click', function (e) {
   selectGroup.forEach((item) => {
      if (e.target != item) {
         item.classList.remove('active')
      }
   })
})
// Нажатие на Tab или Escape. Закрыть [data-select]
document.addEventListener('keydown', function (e) {
   selectGroup.forEach((item) => {
      if (e.key === 'Tab' || e.key === 'Escape') {
         item.classList.remove('active')
      }
   })
});