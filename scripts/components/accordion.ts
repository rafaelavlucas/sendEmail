interface CategoriesInterface {
   category: string;
   messages: string[]
}

const categories: CategoriesInterface[] = [
   {
      category: "Categoria 1",
      messages: [
         "Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts. Separated",
         "Far far away, behind the world mountains, far from the countries Vokalia!",
         "Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts. Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts."
      ],
   },
   {
      category: "Categoria 2",
      messages: [

         "Far far away, behind the world mountains, far from the countries Vokalia!"
      ],
   },
   {
      category: "Categoria 3",
      messages: [
         "Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts. Separated",
         "Far far away, behind the world mountains, far from the countries Vokalia!",
         "Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts. Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts."
      ],
   },
   {
      category: "Categoria 4",
      messages: [
         "Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts. Separated",
         "Far far away, behind the world mountains, far from the countries Vokalia!",
         "Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts. Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts."
      ],
   },
];

// Variables
let accordionButton: NodeListOf<HTMLElement>;
const accordionList = document.querySelector(".accordionList") as HTMLElement;
const categoryBlock = document.querySelector(".categoryBlock") as HTMLElement;

const categoryBlockContent = document.querySelector(".categoryBlock .block__content") as HTMLElement;



getCategories();

accordionButton = document.querySelectorAll(".accordion__button");


// Events
accordionButton.forEach((button) => {
   button.addEventListener("click", openAccordion);
});

categoryBlockContent.addEventListener("scroll", addFadeOnScroll)


// Functions

function getCategories() {

   categories.forEach((item, index) => {
      let templateCategory = `
         <li class="accordion">
             <button class="accordion__button">
             ${item.category}
             </button>
             <ul class="accordion__list">
             </ul>
         </li>`;

      accordionList.insertAdjacentHTML("beforeend", templateCategory);

      item.messages.forEach((el) => {
         let templateMessages = `<li class="accordion__listItem">${el}</li>`;

         document.querySelectorAll(".accordion__list")[index].insertAdjacentHTML("beforeend", templateMessages);
      });
   });
}

function openAccordion(e,) {
   const currentAccordion = e.currentTarget.parentElement,
      currentList = currentAccordion.querySelector(".accordion__list");

   if (currentAccordion.classList.contains("open")) {
      currentAccordion.classList.remove("open");
      currentList.style.maxHeight = 0;

   } else {
      currentAccordion.classList.add("open");
      currentList.style.maxHeight = currentList.scrollHeight + "px";
   }

   addFadeOnclick(currentList)
}

function addFadeOnclick(currentList) {
   if (categoryBlockContent.scrollHeight + currentList.scrollHeight > categoryBlockContent.clientHeight) {
      categoryBlock.classList.add("fadeBottom");
   } else {
      categoryBlock.classList.remove("fadeBottom");
   }
}

function addFadeOnScroll() {
   let paddingBottom = window.getComputedStyle(categoryBlockContent, null).getPropertyValue('padding-bottom').split('px')[0];

   if (
      categoryBlockContent.scrollHeight - categoryBlockContent.clientHeight <=
      categoryBlockContent.scrollTop + Number(paddingBottom)) {
      categoryBlock.classList.remove("fadeBottom");
   } else {
      categoryBlock.classList.add("fadeBottom");
   }
}









