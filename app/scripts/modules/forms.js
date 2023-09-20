/*===== FORM FOCUS =====*/
const fields = document.querySelectorAll("[data-field]");
/*=== Add focus ===*/
function addfocus() {
   let parent = this.parentNode;
   parent.classList.add("focus")
}
/*=== Remove focus ===*/
function remfocus() {
   let parent = this.parentNode;
   if (this.value == "") {
      parent.classList.remove("focus");
   }
}
const shopOrderForm = document.getElementById('shopOrderForm');
if (shopOrderForm) {
   shopOrderForm.addEventListener('submit', (event) => {
      fields.forEach((item) => {
         if (item.value != "") {
            let parent = item.parentNode;
            parent.classList.add("focus");
         }
      })
   })
}
/*=== To call function===*/
fields.forEach(input => {
   const errorBlock = input.nextElementSibling;
   if (errorBlock || input.value != "") {
      let parent = input.parentNode;
      parent.classList.add('focus');
   }
   input.addEventListener("focus", addfocus)
   input.addEventListener("blur", remfocus)
})

// скрытый input
const workemailList = document.querySelectorAll('.workemail');
workemailList.forEach((item) => {
   item.value = '';
   item.removeAttribute('required');
});
// Маска для телефона
(function () {
   function mask(phone) {
      var code = '+7',
         find = /\+7/;
      code = '+';
      find = /\+/;
      phone.addEventListener('focus', function () {
         phone.value = code + " " + phone.value.replace(code + ' ', '');
      });
      phone.addEventListener('input', function () {
         var val = phone.value.replace(find, ''),
            res = code + " ";
         val = val.replace(/[^0-9]/g, '');

         for (var i = 0; i < val.length; i++) {
            //res+= i===0?' ':'';
            res += i === 1 ? ' (' : '';
            res += i == 4 ? ') ' : '';
            res += i == 7 || i == 9 ? ' ' : '';
            if (i == 11) break;
            res += val[i];
         }

         phone.value = res;
      });
      phone.addEventListener('blur', function () {
         var val = phone.value.replace(find, '');
         val = val.trim();
         if (!val) phone.value = null;
      });
   }
   var phone = document.querySelectorAll('input[name="phone"]');
   if (phone) {
      var i = phone.length;
      while (i--) {
         mask(phone[i]);
      }
   }
   return true;
})();

// Подключение библиотеки для модальных окон
// import "./graph-modal.min.js";
// const modals = new GraphModal();

// Отправка формы
const modalForm = document.querySelectorAll('.form');
const closeModalBtn = document.querySelector('.js-modal-close');
const formAllInputs = document.querySelectorAll('.form__input, .form__textarea, .form-modal__input, .form-modal__textarea, input[name="agreement"], [data-field]');
const formAllInputsRating = document.querySelectorAll('input[name="rating"]');


function resultYandexMetrika(formId, selector, result) {
   if (formId == selector) {
      if (result.ym) {
         if (typeof ym != "undefined") {
            ym(49095607, 'reachGoal', result.ym);
            console.log("ym(49095607,'reachGoal',".concat(result.ym, ");"));
         }
         if ((typeof yaCounter49095607 === "undefined" ? "undefined" : typeof yaCounter49095607) == "object") {
            yaCounter49095607.reachGoal(result.ym);
            console.log("yaCounter49095607.reachGoal(".concat(result.ym, ");"));
         }
      }
   }
}
function successModal(formId, selector, modalId) {
   if (formId == selector) {
      const modal = document.getElementById(modalId);
      modal.classList.add('open-modal')
      setTimeout(() => {
         modal.classList.remove("open-modal");
      }, 5000)
   }
}
function errorModal(modalId) {
   const modal = document.getElementById(modalId);
   modal.classList.add('open-modal')
   setTimeout(() => {
      modal.classList.remove("open-modal");
   }, 5000)
}
function formHandler(formId, path) {
   const formElement = document.getElementById(formId);
   if (formElement) {
      formElement.addEventListener('submit', (event) => {
         event.preventDefault();
         const thisForm = event.target;
         const formData = new FormData(thisForm);
         // кнопка "Отправить"
         const buttonSubmit = thisForm.querySelector('.form__button');

         const buttonSubmitText = buttonSubmit.textContent;
         buttonSubmit.setAttribute('disabled', 'true');
         buttonSubmit.classList.add('disabled')
         buttonSubmit.textContent = 'идет отправка...';
         fetch(path, {
            method: 'POST',
            body: formData,
         })
            // "status" в MODX
            .then((response) => response.json())
            .then((result) => {
               const inputName = thisForm.querySelector('input[name="name"]');
               const inputFullName = thisForm.querySelector('input[name="fullname"]');
               const inputPhone = thisForm.querySelector('input[name="phone"]');
               const inputEmail = thisForm.querySelector('input[name="email"]');
               const inputMessage = thisForm.querySelector('textarea[name="message"]');
               const inputAddress = thisForm.querySelector('input[name="address"]');
               const inputAgreement = thisForm.querySelector('input[name="agreement"]');
               try {
                  if (result.status == "success") {
                     // Форма "Остались вопросы"
                     resultYandexMetrika.call(this, formId, 'form', result);
                     successModal.call(this, formId, 'form', 'notice');
                     // Вызывыаем модальку об успехе
                     // if (formId == 'shopOrderForm') {
                     //    window.location.href = "http://test3.komplex-info.ru/spasibo-za-zakaz.html";
                     // }
                     if (inputName) {
                        inputName.value = '';
                     }
                     if (inputFullName) {
                        inputFullName.value = '';
                     }
                     if (inputPhone) {
                        inputPhone.value = '';
                     }
                     if (inputEmail) {
                        inputEmail.value = '';
                     }
                     if (inputMessage) {
                        inputMessage.value = '';
                     }
                     if (inputAddress) {
                        inputAddress.value = '';
                     }
                     // if (inputAgreement) {
                     //    inputAgreement.value = '';
                     // }
                     const fields = document.querySelectorAll("[data-field]");
                     fields.forEach(input => {
                        const parent = input.parentNode;
                        parent.classList.remove('focus');
                     })
                  } else {
                     if (result.name) {
                        inputName.classList.add('error');
                        // inputName.setAttribute('title', result.name.trim());
                     }
                     if (result.fullname) {
                        inputFullName.classList.add('error');
                        // inputName.setAttribute('title', result.name.trim());
                     }
                     if (result.phone) {
                        inputPhone.classList.add('error');
                        // inputPhone.setAttribute('title', result.phone.trim());
                     }
                     if (result.email) {
                        inputEmail.classList.add('error');
                        // inputEmail.setAttribute('title', result.email.trim());
                     }
                     if (result.message) {
                        // inputMessage.setAttribute('title', result.message.trim());
                     }
                     if (result.address) {
                        // inputMessage.setAttribute('title', result.message.trim());
                     }
                     if (result.agreement) {
                        inputAgreement.classList.add('error');
                        // inputMessage.setAttribute('title', result.message.trim());
                     }
                  }
                  buttonSubmit.removeAttribute('disabled');
                  buttonSubmit.classList.remove('disabled');
                  buttonSubmit.textContent = buttonSubmitText;
               } catch (e) {
                  console.error(e);
               }
            }).catch((error) => {
               errorModal('notice-error');
               buttonSubmit.removeAttribute('disabled');
               buttonSubmit.classList.remove('disabled');
               buttonSubmit.textContent = buttonSubmitText;
            });
      })
   }
}
function formHandlerModal(formId, path) {
   const formElement = document.getElementById(formId);
   if (formElement) {
      formElement.addEventListener('submit', (event) => {
         event.preventDefault();
         const thisForm = event.target;
         const formData = new FormData(thisForm);
         // кнопка "Отправить"
         const buttonSubmit = thisForm.querySelector('.form-modal__button');

         const buttonSubmitText = buttonSubmit.textContent;
         buttonSubmit.setAttribute('disabled', 'true');
         buttonSubmit.classList.add('disabled')
         buttonSubmit.textContent = 'идет отправка...';
         fetch(path, {
            method: 'POST',
            body: formData,
         })
            // "status" в MODX
            .then((response) => response.json())
            .then((result) => {
               const inputName = thisForm.querySelector('input[name="name"]');
               const inputPhone = thisForm.querySelector('input[name="phone"]');
               const inputEmail = thisForm.querySelector('input[name="email"]');
               const inputMessage = thisForm.querySelector('textarea[name="message"]');
               const inputComment = thisForm.querySelector('textarea[name="comment"]');
               const inputProductTitle = thisForm.querySelector('input[name="product-title"]');
               const inputAgreement = thisForm.querySelector('input[name="agreement"]');
               const inputRating = thisForm.querySelectorAll('input[name="rating"]');
               try {
                  if (result.status == "success") {
                     // Вызывыаем модальку об успехе
                     const modals = document.querySelectorAll('[data-modal]');
                     modals.forEach((item) => {
                        item.classList.remove('open-modal');
                     })
                     document.body.classList.remove('lock');
                     // Форма "Заказать звонок"
                     successModal(formId, 'form-call', 'notice');
                     resultYandexMetrika(formId, 'form-call', result);
                     // Форма "Заказать демонстрацию"
                     successModal(formId, 'form-demonstration', 'success-demonstration');
                     resultYandexMetrika(formId, 'form-demonstration', result);
                     // Форма "Купить в 1 клик"
                     successModal(formId, 'form-buy', 'success-order');
                     resultYandexMetrika(formId, 'form-buy', result);
                     // Форма "в конструкторе Собери сам"
                     successModal(formId, 'form-order', 'success-order');
                     resultYandexMetrika(formId, 'form-order', result);
                     // Форма "Оставить заявку"
                     successModal(formId, 'form-request', 'notice');
                     // Форма "Оставить отзыв"
                     successModal(formId, 'form-reviews', 'success-reviews');
                     if (inputName) {
                        inputName.value = '';
                     }
                     if (inputPhone) {
                        inputPhone.value = '';
                     }
                     if (inputEmail) {
                        inputEmail.value = '';
                     }
                     if (inputMessage) {
                        inputMessage.value = '';
                     }
                     if (inputComment) {
                        inputComment.value = '';
                     }
                     if (inputProductTitle) {
                        inputProductTitle.value = '';
                     }
                     // if (inputAgreement) {
                     //    inputAgreement.value = '';
                     // }
                     if (inputRating) {
                     }
                  } else {
                     if (result.name) {
                        inputName.classList.add('error');
                        // inputName.setAttribute('title', result.name.trim());
                     }
                     if (result.phone) {
                        inputPhone.classList.add('error');
                        // inputPhone.setAttribute('title', result.phone.trim());
                     }
                     if (result.email) {
                        inputEmail.classList.add('error');
                        // inputEmail.setAttribute('title', result.email.trim());
                     }
                     if (result.message) {
                        // inputMessage.setAttribute('title', result.message.trim());
                     }
                     if (result.comment) {
                        // inputComment.setAttribute('title', result.message.trim());
                     }
                     if (result.agreement) {
                        inputAgreement.classList.add('error');
                        // inputAgreement.setAttribute('title', result.message.trim());
                     }
                  }
                  buttonSubmit.removeAttribute('disabled');
                  buttonSubmit.classList.remove('disabled');
                  buttonSubmit.textContent = buttonSubmitText;
               } catch (e) {
                  console.error(e);
               }
            }).catch((error) => {
               errorModal('notice-error');
               buttonSubmit.removeAttribute('disabled');
               buttonSubmit.classList.remove('disabled');
               buttonSubmit.textContent = buttonSubmitText;
            });
      })
   }
}
formHandler("form", "api/form/handler");
// formHandler("shopOrderForm", "/formhandlerorder");
formHandlerModal("form-call", "api/form/handler");
formHandlerModal("form-demonstration", "api/form/handler");
formHandlerModal("form-buy", "api/form/handler");
formHandlerModal("form-request", "api/form/handler");
formHandlerModal("form-order", "api/form/handlercalcorder");
formHandlerModal("form-reviews", "api/form/handlerreviews");

formAllInputsRating.forEach((item) => {
   const removeErrorClass = (event) => {
      const estimateWrapper = item.closest('.estimate-modal');
      if (item.checked && estimateWrapper.classList.contains('error')) {
         estimateWrapper.classList.remove('error');
      }
   }
   item.addEventListener('input', removeErrorClass);
   item.addEventListener('change', removeErrorClass);
});
formAllInputs.forEach((item) => {
   const removeErrorClass = (event) => {
      if (!event.target.classList.contains('error')) {
         return false;
      }
      event.target.classList.remove('error');
   };
   item.addEventListener('input', removeErrorClass);
   item.addEventListener('change', removeErrorClass);
});


// Order page
const radioBtnTransport = document.getElementById('transport');
const radioBtnPickup = document.getElementById('pickup');
const radioBtnCourier = document.getElementById('courier');
const companyList = document.getElementById('company-order');
if (radioBtnTransport) {
   radioBtnTransport.addEventListener('change', (event) => {
      companyList.classList.remove('hidden');
   })
}
if (radioBtnPickup) {
   radioBtnPickup.addEventListener('change', (event) => {
      companyList.classList.add('hidden');
   })
}
if (radioBtnCourier) {
   radioBtnCourier.addEventListener('change', (event) => {
      companyList.classList.add('hidden');
   })
}

const companyItems = document.querySelectorAll('.company-order__item')
const companyNameInput = document.querySelector('input[name="namecompany"]');
if (companyItems) {
   companyItems.forEach((item) => {
      const companyInput = item.querySelector('input[name="company"]');
      companyInput.addEventListener('change', (event) => {
         radioBtnTransport.value = companyInput.value;
         companyNameInput.value = companyInput.value;
      })
   })
}