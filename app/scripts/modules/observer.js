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
      const collectItem = collect.querySelector('.footer-collect__item');
      const collectShowBtn = document.querySelector('.show-btn');
      collectShowBtn.addEventListener('click', (event) => {
         event.target.classList.toggle('active');
         collect.classList.toggle('active');
      })
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
         rootMargin: '0px 0px -1px 0px',
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