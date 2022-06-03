// Переключение кнопок с превью карточки товара
const choiceGroup = document.querySelectorAll('[data-choice-wrap]');
choiceGroup.forEach((item, i, arr) => {
   const choiceList = item.querySelector('.dropdown-list');
   const choiceArrow = item.querySelector('.choice-group__arrow');
   const choiceGroupLabels = item.querySelectorAll('.dropdown-list .choice-group__label');

   const choiceValue = item.querySelector('[data-value]');
   const choiceDropdownValue = item.querySelector('[data-dropdown-value]');
   if (choiceList) {
      item.addEventListener('click', (e) => {
         e.stopPropagation();
         arr.forEach(arrElement => arrElement.classList.toggle('active', arrElement === item))
      });
      choiceArrow.classList.add('show');
   }
   choiceGroupLabels.forEach((label) => {
      label.addEventListener('click', (e) => {
         e.stopPropagation();
         choiceValue.innerText = choiceDropdownValue.innerText;
         item.classList.remove('active')
      })
   })
   // Клик снаружи [data-choice-wrap]. Закрыть [data-choice-wrap]
   document.addEventListener('click', function (e) {
      if (e.target != item) {
         item.classList.remove('active')
      }
   })
   // Нажатие на Tab или Escape. Закрыть [data-choice-wrap]
   document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
         item.classList.remove('active')
      }
   });
});