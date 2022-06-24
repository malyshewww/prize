// Переключение кнопок с превью карточки товара
const choiceGroup = document.querySelectorAll('[data-select]');
choiceGroup.forEach((item, i, arr) => {
   const choiceList = item.querySelector('.dropdown-list');
   const choiceArrow = item.querySelector('.select-group__arrow');
   const choiceGroupLabels = item.querySelectorAll('.dropdown-list .select-group');

   const choiceValue = item.querySelector('[data-select-value]');
   const inputHidden = item.querySelector('.select-group__input-hidden');
   if (choiceList) {
      item.addEventListener('click', (e) => {
         e.stopPropagation();
         arr.forEach(arrElement => arrElement.classList.toggle('active', arrElement === item))
      });
      choiceArrow.classList.add('show');
   }
   choiceGroupLabels.forEach((label) => {
      label.addEventListener('click', (e) => {
         const choiceDropdownValue = label.querySelector('[data-select-dropdown-value]');
         e.stopPropagation();
         choiceValue.innerText = choiceDropdownValue.innerText;
         inputHidden.value = choiceDropdownValue.innerText.replace(/[a-zа-яё]/gi, '');
         item.classList.remove('active');
      })
   })
   // Клик снаружи [data-choice-wrap]. Закрыть [data-select]
   document.addEventListener('click', function (e) {
      if (e.target != item) {
         item.classList.remove('active')
      }
   })
   // Нажатие на Tab или Escape. Закрыть [data-select]
   document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
         item.classList.remove('active')
      }
   });
});