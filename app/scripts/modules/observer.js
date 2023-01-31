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

function compareSlider() {
   let options = {
      root: null,
      threshold: 0,
      // rootMargin: '0px 0px 0px 0px',
   }
   let box = document.querySelector('.compare-cards');
   let observer = new IntersectionObserver(([entry]) => {
      const targetInfo = entry.boundingClientRect;
      const rootBoundsInfo = entry.rootBounds;
      if (targetInfo.bottom < rootBoundsInfo.top || targetInfo.isIntersecting) {
         box.classList.add('fixed');
      } else {
         box.classList.remove('fixed');
      }
   }, options)
   observer.observe(box)
   // функция построения шкалы пересечения
   // шкала представляет собой массив из 20 элементов, определяющих цвет контейнера
   function buildThresholdList() {
      let thresholds = []
      let steps = 20

      for (let i = 1.0; i <= steps; i++) {
         let ratio = i / steps
         thresholds.push(ratio)
      }
      return thresholds
   }
}
compareSlider();