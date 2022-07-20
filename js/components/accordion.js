function getCategories() {
   const categories = [
      {
         category: "Categoria 1",
         messages: ["cenas", "cenas2", "cenas3"],
      },
      {
         category: "Categoria 2",
         messages: ["cenascenascenas", "cenas2", "cenas3"],
      },
   ];

   categories.forEach((item, index) => {
      let templateCategory = `
         <li class="accordion">
             <button class="accordion__button">
             ${item.category}
             </button>
             <ul class="accordion__list">
             </ul>
         </li>`;
      document
         .querySelector(".accordionList")
         .insertAdjacentHTML("beforeend", templateCategory);

      console.log(item.messages);
      item.messages.forEach((el) => {
         console.log(el);
         let templateMessages = `<li class="accordion__listItem">${el}</li>`;

         document
            .querySelectorAll(".accordion__list")
            [index].insertAdjacentHTML("beforeend", templateMessages);
      });
   });
}

getCategories();
