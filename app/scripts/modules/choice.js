// Переключение кнопок с превью карточки товара
const choiceGroup = document.querySelectorAll('[data-select]');
choiceGroup.forEach((item, i, arr) => {
   const choiceItemHeader = item.querySelector('.select-group__item');
   const choiceItem = item.querySelector('.select-group__choice');
   const choiceList = item.querySelector('.dropdown-list');
   const choiceArrow = item.querySelector('.select-group__arrow');
   const choiceDropDownItems = item.querySelectorAll('.dropdown-list .select-group__item');

   const choiceValue = item.querySelector('[data-select-value]');
   const inputHidden = item.querySelector('.select-group__input-hidden');



   const product = item.closest('.card-product');
   const productPrice = product.querySelector('.card-product__price');

   if (choiceList) {
      choiceItem.addEventListener('click', (e) => {
         e.stopPropagation();
         arr.forEach(arrElement => arrElement.classList.toggle('active', arrElement === item))
      });
      choiceArrow.classList.add('show');
   }

   choiceItemHeader.addEventListener('click', (e) => {
      const choiceItemHeaderPrice = choiceItemHeader.dataset.price;
      productPrice.innerText = choiceItemHeaderPrice + " ₽";
   })

   choiceDropDownItems.forEach((dropdownItem) => {
      const choiceDropdownValue = dropdownItem.querySelector('[data-select-dropdown-value]');
      dropdownItem.addEventListener('click', (e) => {
         e.stopPropagation();
         const realInput = item.querySelector('.real-radio').checked = true;
         const priceValue = dropdownItem.dataset.price;
         productPrice.innerText = priceValue + " ₽";

         choiceValue.innerText = choiceDropdownValue.innerText;
         inputHidden.value = choiceDropdownValue.innerText.replace(/[a-zа-яё]/gi, '');
         item.classList.remove('active');
         if (choiceDropdownValue.innerText == choiceValue.innerText) {
            dropdownItem.style.display = "none";
         }
         if (choiceDropdownValue.innerText !== choiceValue.innerText) {
            dropdownItem.style.display = "flex";
         } else {
            return;
         }
      })
   })
});


// Клик снаружи [data-select]. Закрыть [data-select]
document.addEventListener('click', function (e) {
   choiceGroup.forEach((item) => {
      if (e.target != item) {
         item.classList.remove('active')
      }
   })
})
// Нажатие на Tab или Escape. Закрыть [data-select]
document.addEventListener('keydown', function (e) {
   choiceGroup.forEach((item) => {
      if (e.key === 'Tab' || e.key === 'Escape') {
         item.classList.remove('active')
      }
   })
});