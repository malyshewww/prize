// STEPPER QUANTITY
const stepper = document.querySelector('.quantity-card__box');
if (stepper) {
   const stepperInput = stepper.querySelector('.quantity-card__input');
   const stepperBtnUp = stepper.querySelector('.quantity-card__button--plus');
   const stepperBtnDown = stepper.querySelector('.quantity-card__button--minus');
   if (stepper) {
      let count = stepperInput.value;
      stepperInput.addEventListener('keyup', (e) => {
         let self = e.currentTarget;
         if (self.value == '0') {
            self.value = 1;
         }
         count = stepperInput.value;
         if (count == 1) {
            stepperBtnDown.classList.add('quantity-card__button--disabled');
         } else {
            stepperBtnDown.classList.remove('quantity-card__button--disabled');
         }
      });
      stepperInput.addEventListener('change', (e) => {
         let self = e.currentTarget;
         if (!self.value) {
            self.value = 1;
         }
         count = stepperInput.value;
         if (count == 1) {
            stepperBtnDown.classList.add('quantity-card__button--disabled');
         } else {
            stepperBtnDown.classList.remove('quantity-card__button--disabled');
         }
      });
      stepperBtnUp.addEventListener('click', (e) => {
         e.preventDefault();
         count++;
         if (count == 1) {
            stepperBtnDown.classList.add('quantity-card__button--disabled');
         } else {
            stepperBtnDown.classList.remove('quantity-card__button--disabled');
         }
         stepperInput.value = count;
      });
      stepperBtnDown.addEventListener('click', (e) => {
         e.preventDefault();
         count--;
         if (count == 1) {
            stepperBtnDown.classList.add('quantity-card__button--disabled');
         } else {
            stepperBtnDown.classList.remove('quantity-card__button--disabled');
         }
         stepperInput.value = count;
      });
   }
}