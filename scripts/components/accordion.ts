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
const tablet = 1023;
let accordionButton: NodeListOf<HTMLElement>;
const categoryBlock = document.querySelector(".categoryBlock") as HTMLElement;
const categoryList = document.querySelector(".categoryBlock__list") as HTMLElement;
const categoryBlockContent = document.querySelector(".categoryBlock .block__content") as HTMLElement;
const expandButton = document.querySelector(".categoryBlock__expandBtn") as HTMLElement;

// Variable after Loading the Accordion Templates
getCategories();
const categoryListHeight = categoryList.scrollHeight;
accordionButton = document.querySelectorAll(".accordion__button");
const accordions = document.querySelectorAll(".accordion") as NodeListOf<HTMLElement>;
const accordionLists = document.querySelectorAll(".accordion__list") as NodeListOf<HTMLElement>;



// Events
accordionButton.forEach((button) => {
   button.addEventListener("click", openAccordion);
});

categoryBlockContent.addEventListener("scroll", addFadeOnScroll)

expandButton.addEventListener("click", expandListOnMobile)


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

      categoryList.insertAdjacentHTML("beforeend", templateCategory);

      item.messages.forEach((el) => {
         let templateMessages = `<li class="accordion__listItem">${el}</li>`;

         document.querySelectorAll(".accordion__list")[index].insertAdjacentHTML("beforeend", templateMessages);
      });
   });
}

function openAccordion(e) {

   const currentAccordion = e.currentTarget.parentElement,
      currentList = currentAccordion.querySelector(".accordion__list");


   if (currentAccordion.classList.contains("open")) {
      currentAccordion.classList.remove("open");
      currentList.style.maxHeight = "0";
      categoryBlock.style.height = "auto";
      categoryList.style.height = categoryListHeight + "px"
   } else {
      currentAccordion.classList.add("open");
      currentList.style.maxHeight = currentList.scrollHeight + "px";
      categoryList.style.height = categoryList.scrollHeight + currentList.scrollHeight + "px";
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

function expandListOnMobile() {

   if (window.innerWidth > tablet) return;

   if (categoryBlock.classList.contains("show")) {
      categoryBlock.classList.remove("show");
      categoryList.style.height = "0";

      // When Collapse the list, remove all open accordions and reset heights
      accordions.forEach((accordion) => {
         accordion.classList.remove("open");
      });
      accordionLists.forEach((list) => {
         list.style.maxHeight = "0";
      });

   } else {
      categoryBlock.classList.add("show");
      categoryList.style.height = categoryList.scrollHeight + "px"
   }

}











