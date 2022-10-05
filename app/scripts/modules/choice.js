document.addEventListener('click', productActions);

function productActions(event) {
   let target = event.target;
   let parent = target.closest('[data-select]');
   if (target.closest('.select-group__choice')) {
      parent.classList.toggle('active');
   }
   // Переключение кнопок с превью карточки товара
   const products = document.querySelectorAll('.card-product');
   products.forEach((product) => {
      const selectGroup = product.querySelectorAll('[data-select]');
      const inputResultPrice = product.querySelector('.input-card-price');
      const inputResultSalePrice = product.querySelector('.input-card-sale-price');
      const inputResultWeight = product.querySelector('.input-card-weight');
      const inputResultDiscount = product.querySelector('.input-card-discount');
      const inputResultCompound = product.querySelector('.input-card-compound');
      const productPrice = product.querySelector('.card-product__price');
      const productPriceOld = product.querySelector('.card-product__price-old');
      selectGroup.forEach((item, i, arr) => {
         const selectGroupItem = item.querySelector('.select-group__item .select-group__label');
         const selectGroupItemHeader = item.querySelector('.select-group__item.select-group__header');
         let selectGroupChoice = item.querySelector('.select-group__choice');
         const selectGroupDropdown = item.querySelector('.dropdown-list');
         const selectDropdownItems = item.querySelectorAll('.dropdown-list .select-group__item');
         const selectGroupValue = item.querySelector('[data-select-value]');
         const selectGroupValueData = selectGroupValue.dataset.selectValue;
         const selectGroupCompoundText = item.querySelector('[data-text]');
         // if (selectGroupDropdown) {

         //    // selectGroupChoice.addEventListener('click', (e) => {
         //    //    e.stopPropagation();
         //    //    arr.forEach(arrElement => arrElement.classList.toggle('active', arrElement === item))
         //    // });
         // }
         selectGroupItem.addEventListener('change', (e) => {
            const currentPrice = selectGroupItemHeader.dataset.currentPriceHeader;
            const salePrice = selectGroupItemHeader.dataset.salePriceHeader;
            inputResultPrice.value = currentPrice;
            const currentPriceStr = currentPrice + " ₽";
            inputResultWeight.value = selectGroupValueData;
            productPrice.innerText = currentPriceStr;
            inputResultDiscount.value = currentPrice - salePrice;
            inputResultCompound.value = selectGroupCompoundText.innerText;
            if (productPriceOld) {
               const salePriceStr = salePrice + " ₽";
               inputResultSalePrice.value = salePrice;
               productPriceOld.innerText = salePriceStr;
            }
         });
         selectDropdownItems.forEach((dropdownItem) => {
            const selectGroupDropdownValue = dropdownItem.querySelector('[data-select-dropdown-value]');
            const selectGroupDropdownValueData = selectGroupDropdownValue.dataset.selectDropdownValue;
            // Значение дата атрибута в выпадающем меню
            const priceValue = dropdownItem.dataset.price;
            const priceSaleValue = dropdownItem.dataset.salePrice;
            dropdownItem.addEventListener('click', (e) => {
               e.stopPropagation();
               selectDropdownItems.forEach((el) => {
                  el.classList.remove('current');
               })
               dropdownItem.classList.add('current');
               const realInput = item.querySelector('.real-radio');
               realInput.checked = true;
               const priceValueStr = priceValue + " ₽";
               inputResultPrice.value = priceValue;
               if (inputResultSalePrice != null) {
                  const priceSaleValueStr = priceSaleValue + " ₽";
                  inputResultSalePrice.value = priceSaleValue;
                  productPriceOld.innerText = priceSaleValueStr;
               }
               productPrice.innerText = priceValueStr;
               inputResultWeight.value = selectGroupDropdownValueData;
               inputResultDiscount.value = priceValue - priceSaleValue;
               inputResultCompound.value = selectGroupCompoundText.innerText;
               // Присваивание веса из выпадающего списка в верхний select-group__item
               selectGroupValue.innerText = selectGroupDropdownValue.innerText;
               item.classList.remove('active');
            })
         })
      });
   })
}
// Клик снаружи [data-select]. Закрыть [data-select]
// }
// document.addEventListener('click', function (e) {
//    const selectGroup = document.querySelectorAll('[data-select]');
//    if (selectGroup) {
//       selectGroup.forEach((item) => {
//          if (e.target != item) {
//             item.classList.remove('active')
//          }
//       })
//    }
// })
// Нажатие на Tab или Escape. Закрыть [data-select]
document.addEventListener('keydown', function (e) {
   const selectGroup = document.querySelectorAll('[data-select]');
   if (selectGroup) {
      selectGroup.forEach((item) => {
         if (e.key === 'Tab' || e.key === 'Escape') {
            item.classList.remove('active')
         }
      })
   }
});
function getChoice(button) {
   button.classList.toggle('active')
}

