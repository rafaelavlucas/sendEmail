

const
    tabletWidth = 1023,
    blocks = document.querySelector(".blocks") as HTMLElement,
    messageBlockContent = document.querySelector(".messageBlock .block__content") as HTMLElement,
    contactsButton = document.querySelector(".contactsBtn") as HTMLElement,
    fontButtons = document.querySelectorAll(".mainNav__font") as NodeListOf<HTMLElement>,
    closeContactsButton = document.querySelector(".contactsBlock__close") as HTMLElement;

let messagePaddingBottom = window.getComputedStyle(messageBlockContent, null).getPropertyValue('padding-bottom').split('px')[0];


// Events
contactsButton.addEventListener("click", setBlocksHeight)
closeContactsButton.addEventListener("click", setBlocksHeight)
fontButtons.forEach((font) => {
    font.addEventListener("click", setBlocksHeight);
});



// Functions

if (window.innerWidth > 1023) {
    blocks.style.height = messageBlockContent.scrollHeight + "px";
}

function setBlocksHeight() {
    if (window.innerWidth < tabletWidth) return
    setTimeout(() => {
        blocks.style.height = messageBlockContent.scrollHeight + "px";
    }, 300);
}

function refreshOnResize() {
    if ("ontouchstart" in document.documentElement) return;
    window.onresize = () => {
        setTimeout(() => {
            location.reload()
        }, 800);
    }
}

refreshOnResize()