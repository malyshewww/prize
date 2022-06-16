/*===== FORM FOCUS =====*/
const fields = document.querySelectorAll("[data-field]")
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
/*=== To call function===*/
fields.forEach(input => {
   input.addEventListener("focus", addfocus)
   input.addEventListener("blur", remfocus)
})

import "./maskphone.js";