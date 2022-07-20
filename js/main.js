window.onload = function (e) {
   // Variables

   const accordionButton = document.querySelectorAll(".accordion__button");

   // Events

   accordionButton.forEach((button) => {
      button.addEventListener("click", openAccordion);
   });

   // Functions
   function openAccordion(e) {
      const currentAccordion = e.currentTarget.parentElement,
         currentList = currentAccordion.querySelector(".accordion__list");
      console.log(currentAccordion);

      if (currentAccordion.classList.contains("open")) {
         currentAccordion.classList.remove("open");
         currentList.style.height = 0;
      } else {
         currentAccordion.classList.add("open");
         currentList.style.height = currentList.scrollHeight + "px";
      }
   }
};
