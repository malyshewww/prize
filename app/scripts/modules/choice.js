// Переключение кнопок с превью карточки товара
const selectGroup = document.querySelectorAll('[data-select]');
selectGroup.forEach((item, i, arr) => {
   const selectGroupItem = item.querySelector('.select-group__item .select-group__label');
   const selectGroupChoice = item.querySelector('.select-group__choice');
   const selectGroupDropdown = item.querySelector('.dropdown-list');
   const selectDropdownItems = item.querySelectorAll('.dropdown-list .select-group__item');
   const selectGroupValue = item.querySelector('[data-select-value]');

   const inputCurrentPrice = item.querySelector('.current-price');
   const inputHidden = item.querySelector('.select-group__input-hidden');
   const product = item.closest('.card-product');
   const productPrice = product.querySelector('.card-product__price');

   const inputResultPrice = item.querySelector('.result-card-price');
   const inputResultWeight = item.querySelector('.result-card-weight');
   if (selectGroupDropdown) {
      selectGroupChoice.addEventListener('click', (e) => {
         e.stopPropagation();
         arr.forEach(arrElement => arrElement.classList.toggle('active', arrElement === item))
      });
   }
   if (selectGroupItem) {
      selectGroupItem.addEventListener('change', (e) => {
         productPrice.innerText = inputCurrentPrice.value;
         // inputResultWeight.value = selectGroupValue.innerText;
      });
   }
   selectDropdownItems.forEach((dropdownItem) => {
      const selectGroupDropdownValue = dropdownItem.querySelector('[data-select-dropdown-value]');
      // Значение дата атрибута в выпадающем меню
      const priceValue = dropdownItem.dataset.price;
      dropdownItem.addEventListener('click', (e) => {
         e.stopPropagation();
         selectDropdownItems.forEach((el) => {
            el.classList.remove('current');
         })
         dropdownItem.classList.add('current');
         const realInput = item.querySelector('.real-radio');
         realInput.checked = true;
         const priceValueStr = priceValue + " ₽";
         // Передача в value в input цены из дата атрибута цена в первью товара
         inputCurrentPrice.value = priceValueStr;
         // Итоговая цена в превью товара
         productPrice.innerText = inputCurrentPrice.value;
         // Присваивание веса из выпадающего списка в верхний select-group__item
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