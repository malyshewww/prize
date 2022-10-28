import { matches } from './matches.js';
/**
   Создаем intersection observer
   callback - callback-функция
   options - объект опций, если они необходимы (необязательный параметр)
*/
// Указываем элемент для «наблюдения»
// let mediaQuery = window.matchMedia('(min-width: 991.98px)');
// if (mediaQuery.matches) {
//    observer();
// }

// Orientation portrait / horizontal
let mql = window.matchMedia("(orientation: portrait)");
// Прослушка события изменения ориентации
mql.addEventListener('resize', matches);

function observer() {
   const collect = document.getElementById('collect-footer');
   if (collect) {
      matches(mql);
      const callback = ([entry]) => {
         const targetInfo = entry.boundingClientRect;
         const rootBoundsInfo = entry.rootBounds;
         if (targetInfo.bottom < rootBoundsInfo.bottom || targetInfo.isIntersecting) {
            collect.classList.add('show');
         } else {
            collect.classList.remove('show');
         }
      };
      // Задаем опции для «наблюдателя»
      const options = {
         rootMargin: '65px 0px -1px 0px',
         // Когда будет срабатывать callback функция
         threshold: [1]
      }
      // Создаем новый «наблюдатель»
      const observer = new IntersectionObserver(callback, options);
      // Прикрепляем «наблюдателя» к элементу
      observer.observe(collect);
   }
}
observer();

const collectShowBtn = document.querySelector('.show-btn');
if (collectShowBtn) {
   collectShowBtn.addEventListener('click', (event) => {
      const parent = event.target.closest('#collect-footer');
      event.target.classList.toggle('active');
      parent.classList.toggle('active');
   })
}

