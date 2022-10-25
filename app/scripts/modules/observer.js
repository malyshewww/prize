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
function observer() {
   const collect = document.getElementById('collect-footer');
   if (collect) {
      const windowHeight = window.innerHeight;
      if (windowHeight < 600) {
         collect.classList.add('limit-height');
      } else {
         collect.classList.remove('limit-height');
      }
      const collectItem = collect.querySelector('.footer-collect__item');
      let collectShowBtn = collect.querySelector('.show-btn');
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

let collectShowBtn = document.querySelector('.show-btn');
if (collectShowBtn) {
   collectShowBtn.addEventListener('click', (event) => {
      const parent = event.target.closest('#collect-footer');
      const parentHeight = parent.offsetHeight;
      // if (parentHeight > 200 && collect.classList.contains('active')) {
      //    collectItem.style.height = '250px';
      //    collectItem.style.overflowY = 'auto';
      // }
      event.target.classList.toggle('active');
      parent.classList.toggle('active');
   })
}
function limitClass() {
   collect.classList.toggle('limit-height');
}
