const SHOW_CONTACTS_BLOCK = "show";

const
    tabletWidth = 1023,
    contactsBlock = document.querySelector(".contactsBlock") as HTMLElement,
    contactsBtn = document.querySelector(".contactsBtn") as HTMLElement,
    closeContactsBtn = document.querySelector(".contactsBlock__close") as HTMLElement,
    allBlocks = document.querySelector(".blocks") as HTMLElement,
    messageBlock = document.querySelector(".messageBlock") as HTMLElement,
    messageBlockContent = document.querySelector(".messageBlock .block__content") as HTMLElement;


let messagePaddingBottom = window.getComputedStyle(messageBlockContent, null).getPropertyValue('padding-bottom').split('px')[0];



// Events
contactsBtn.addEventListener("click", showContactsBlock)
closeContactsBtn.addEventListener("click", hideContactsBlock)




// Functions

function setBlocksHeight() {
    if (window.innerWidth < tabletWidth) return
    setTimeout(() => {
        allBlocks.style.maxHeight = messageBlock.scrollHeight + Number(messagePaddingBottom) + "px";
    }, 200);
}

function showContactsBlock() {
    contactsBlock.classList.add(SHOW_CONTACTS_BLOCK)
    setBlocksHeight()
}

function hideContactsBlock() {
    contactsBlock.classList.remove(SHOW_CONTACTS_BLOCK)
}