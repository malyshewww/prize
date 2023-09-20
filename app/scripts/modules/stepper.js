// STEPPER QUANTITY
const stepper = document.querySelectorAll('.quantity-card');
if (stepper) {
   stepper.forEach(el => {
      const stepperInput = el.querySelector('.quantity-card__input');
      const stepperBtnUp = el.querySelector('.quantity-card__button--plus');
      const stepperBtnDown = el.querySelector('.quantity-card__button--minus');
      if (stepperBtnUp !== null && stepperBtnDown !== null) {
         let count = stepperInput.value;
         stepperInput.addEventListener('input', stepperInputAction);
         // stepperInput.addEventListener('change', stepperInputAction);
         function stepperInputAction(e) {
            let self = e.currentTarget;
            if (!el.classList.contains('collect-quantity')) {
               if (self.value == "0" || self.value == "") {
                  self.value = 1;
               }
            }
            count = stepperInput.value;
            conditionClasses();
         }
         // Кнопка "+"
         stepperBtnUp.addEventListener('click', (e) => {
            count++;
            // value = value >= 0 ? value : 0;
            conditionClasses();
            stepperInput.value = count;
         });
         // Кнопка "-"
         stepperBtnDown.addEventListener('click', (e) => {
            count--;
            // value = value >= 0 ? value : 0;
            conditionClasses();
            stepperInput.value = count;
         });
         // Добавление/удаление класса у stepperBtnDown и отдельная функция для страницы "Соберите подарок"
         function conditionClasses(e) {
            if (!el.classList.contains('collect-quantity')) {
               if (count == 1 || count == "" || count == 0) {
                  stepperBtnDown.classList.add('quantity-card__button--disabled');
               } else {
                  stepperBtnDown.classList.remove('quantity-card__button--disabled');
               }
            }
            collectQuantity();
         }
         function collectQuantity(e) {
            if (el.classList.contains('collect-quantity')) {
               if (count == 0) {
                  stepperBtnDown.classList.add('quantity-card__button--disabled');
               } else {
                  stepperBtnDown.classList.remove('quantity-card__button--disabled');
               }
            }
         }
      }
   })

}