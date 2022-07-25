const
    tabletWidth = 1023,
    contactsBlock = document.querySelector(".contactsBlock") as HTMLElement,
    contactsBtn = document.querySelector(".contactsBtn") as HTMLElement,
    allBlocks = document.querySelector(".blocks") as HTMLElement,
    messageBlock2 = document.querySelector(".messageBlock") as HTMLElement,
    messageBlockContent = document.querySelector(".messageBlock .block__content") as HTMLElement;


let messagePaddingBottom = window.getComputedStyle(messageBlockContent, null).getPropertyValue('padding-bottom').split('px')[0];




// Events
contactsBtn.addEventListener("click", showContactsBlock)



// functions

function setBlocksHeight() {
    if (window.innerWidth < tabletWidth) return
    setTimeout(() => {
        allBlocks.style.maxHeight = messageBlock2.scrollHeight + Number(messagePaddingBottom) + "px";
    }, 200);
}

function showContactsBlock() {

    contactsBlock.classList.add("show")
    setBlocksHeight()



}