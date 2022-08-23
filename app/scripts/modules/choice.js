// Переключение кнопок с превью карточки товара
const products = document.querySelectorAll('.card-product');
if (products) {
   products.forEach((product) => {
      const selectGroup = product.querySelectorAll('[data-select]');
      const inputResultPrice = product.querySelector('.input-card-price');
      const inputResultSalePrice = product.querySelector('.input-card-sale-price');
      const inputResultWeight = product.querySelector('.input-card-weight');
      const productPrice = product.querySelector('.card-product__price');
      const productPriceOld = product.querySelector('.card-product__price-old');
      selectGroup.forEach((item, i, arr) => {
         const selectGroupItem = item.querySelector('.select-group__item .select-group__label');
         const selectGroupItemHeader = item.querySelector('.select-group__item.select-group__header');
         const selectGroupChoice = item.querySelector('.select-group__choice');
         const selectGroupDropdown = item.querySelector('.dropdown-list');
         const selectDropdownItems = item.querySelectorAll('.dropdown-list .select-group__item');
         const selectGroupValue = item.querySelector('[data-select-value]');
         if (selectGroupDropdown) {
            selectGroupChoice.addEventListener('click', (e) => {
               e.stopPropagation();
               arr.forEach(arrElement => arrElement.classList.toggle('active', arrElement === item))
            });
         }
         if (selectGroupItem) {
            selectGroupItem.addEventListener('change', (e) => {
               const currentPrice = selectGroupItemHeader.dataset.currentPriceHeader;
               const salePrice = selectGroupItemHeader.dataset.salePriceHeader;
               inputResultPrice.value = currentPrice;
               inputResultSalePrice.value = salePrice;
               productPrice.innerText = inputResultPrice.value;
               productPriceOld.innerText = inputResultSalePrice.value;
            });
         }
         selectDropdownItems.forEach((dropdownItem) => {
            const selectGroupDropdownValue = dropdownItem.querySelector('[data-select-dropdown-value]');
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
               const priceSaleValueStr = priceSaleValue + " ₽";
               // Передача в value в input цены из дата атрибута цена в первью товара
               // inputResultPrice.value = priceValueStr;
               // inputSalePrice.value = priceSaleValueStr;
               // Итоговая цена в превью товара
               // productPrice.innerText = inputResultPrice.value;
               // productPriceOld.innerText = inputSalePrice.value;
               inputResultPrice.value = priceValue;
               inputResultSalePrice.value = priceSaleValue;
               productPrice.innerText = inputResultPrice.value;
               // Присваивание веса из выпадающего списка в верхний select-group__item
               selectGroupValue.innerText = selectGroupDropdownValue.innerText;
               item.classList.remove('active');
            })
         })
      });
   })
   // Клик снаружи [data-select]. Закрыть [data-select]
   document.addEventListener('click', function (e) {
      const selectGroup = document.querySelectorAll('[data-select]');
      selectGroup.forEach((item) => {
         if (e.target != item) {
            item.classList.remove('active')
         }
      })
   })
   // Нажатие на Tab или Escape. Закрыть [data-select]
   document.addEventListener('keydown', function (e) {
      const selectGroup = document.querySelectorAll('[data-select]');
      selectGroup.forEach((item) => {
         if (e.key === 'Tab' || e.key === 'Escape') {
            item.classList.remove('active')
         }
      })
   });
}
