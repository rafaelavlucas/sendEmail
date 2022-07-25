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
const
   OPEN_ACCORDION = "open",
   SHOW_CATEGORIES = "show",
   CONTAINER_FADE_BOTTOM = "fadeBottom";


const tablet = 1023;
let accordionButton: NodeListOf<HTMLElement>;

const categoryBlock = document.querySelector(".categoryBlock") as HTMLElement;
const categoryList = document.querySelector(".categoryBlock__list") as HTMLElement;
const categoryBlockContent = document.querySelector(".categoryBlock .block__content") as HTMLElement;
let paddingBottom = window.getComputedStyle(categoryBlockContent, null).getPropertyValue('padding-bottom').split('px')[0];
const expandButton = document.querySelector(".categoryBlock__expandBtn") as HTMLElement;
const changeFontBtn = document.querySelectorAll(".mainNav__font") as NodeListOf<HTMLElement>;


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

changeFontBtn.forEach((font) => {
   font.addEventListener("click", cenas);
});


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

   if (currentAccordion.classList.contains(OPEN_ACCORDION)) {
      currentAccordion.classList.remove(OPEN_ACCORDION);
      currentList.style.maxHeight = "0";
      categoryBlock.style.height = "auto";

      scrollToItem(currentAccordion)

      if (window.innerWidth < tablet) {
         categoryList.style.height = categoryList.scrollHeight - currentAccordion.scrollHeight + 40 + "px"
      }

   } else {
      currentAccordion.classList.add(OPEN_ACCORDION);
      currentList.style.maxHeight = currentList.scrollHeight + "px";
      categoryList.style.height = categoryList.scrollHeight + currentList.scrollHeight + "px";

      scrollToItem(currentAccordion)
   }


   addFadeOnclick(currentList)
}

function addFadeOnclick(currentList) {
   if (categoryBlockContent.scrollHeight + currentList.scrollHeight > categoryBlockContent.clientHeight) {
      categoryBlock.classList.add(CONTAINER_FADE_BOTTOM);
   } else {
      categoryBlock.classList.remove(CONTAINER_FADE_BOTTOM);
   }
}

function addFadeOnScroll() {

   if (
      categoryBlockContent.scrollHeight - categoryBlockContent.clientHeight <=
      categoryBlockContent.scrollTop + Number(paddingBottom)) {
      categoryBlock.classList.remove(CONTAINER_FADE_BOTTOM);
   } else {
      categoryBlock.classList.add(CONTAINER_FADE_BOTTOM);
   }
}

function expandListOnMobile() {

   if (window.innerWidth > tablet) return;

   if (categoryBlock.classList.contains(SHOW_CATEGORIES)) {
      categoryBlock.classList.remove(SHOW_CATEGORIES);
      categoryList.style.height = "0";

      // When Collapse the list, remove all open accordions and reset heights
      accordions.forEach((accordion) => {
         accordion.classList.remove(OPEN_ACCORDION);
      });
      accordionLists.forEach((list) => {
         list.style.maxHeight = "0";
      });

   } else {
      categoryBlock.classList.add(SHOW_CATEGORIES);
      categoryList.style.height = categoryList.scrollHeight + "px"
   }

}

function scrollToItem(currentAccordion) {
   if (window.innerWidth < tablet) return

   setTimeout(() => {
      currentAccordion.scrollIntoView({ block: "end", behavior: "smooth", inline: 'end' });
   }, 200);
}

function cenas() {
   let sumHeight = 0;

   accordions.forEach((item, index) => {
      item.addEventListener("transitionend", () => {

         const accordionList = item.querySelector('.accordion__list') as HTMLElement;

         if (item.classList.contains("open")) {
            accordionList.style.maxHeight = accordionList.scrollHeight + "px"
         }


      })

      console.log(index)
      sumHeight += item.scrollHeight;
      categoryList.style.height = sumHeight + "px"




      // setTimeout(() => {
      //    sumHeight += item.scrollHeight;

      // }, 500);

      // if (item.classList.contains("open")) {
      //    if (window.innerWidth > tablet) {

      //       setTimeout(() => {
      //          list.style.maxHeight = list.scrollHeight + "px"
      //       }, 450);

      //    } else {
      //       console.log(sumHeight)
      //       setTimeout(() => {
      //          console.log(sumHeight)
      //          list.style.maxHeight = list.scrollHeight + "px"


      //       }, 450);


      //       setTimeout(() => {
      //          categoryList.style.height = sumHeight + "px"
      //       }, 600);

      //    }
      // };
   })

   // setTimeout(() => {
   //    console.log(sumHeight)
   //    categoryList.style.height = sumHeight + "px"

   // }, 450);



}










