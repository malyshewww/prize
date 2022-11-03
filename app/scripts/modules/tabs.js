// HashChange Event for Tabs
let galleryHash = window.location.hash.substring(1) + 'gallery';
window.addEventListener('hashchange', getHash);
function getHash(event) {
   let hash = window.location.hash;
   let target = event.target;
   const hashLink = document.querySelector(`.tabs__link[href$="${hash}"]`);
   const hashElement = document.querySelector(hash);
   document.querySelectorAll('.tabs__link').forEach((child) => {
      child.classList.remove('active');
   })
   setTimeout(() => {
      document.querySelectorAll('.tabs__content').forEach((child) => {
         child.classList.remove('show');
      })
      hashLink.classList.add('active');
      hashElement.classList.add('show');
      const hashElementParent = hashElement.closest('.tabs__body');
      if (hashElementParent) {
         const hashElementParentPosition = hashElementParent.getBoundingClientRect().top;
         const viewportHeight = window.innerHeight;
         if (hashElementParentPosition > (viewportHeight / 2)) {
            window.scrollTo({ top: hashElementParent.offsetTop, behavior: "smooth" });
         }
      }
   }, 100)
}
if (window.location.hash) {
   window.dispatchEvent(new Event("hashchange"))
}
