

const blocks = document.querySelector(".blocks") as HTMLElement;
const messageBlock = document.querySelector(".messageBlock") as HTMLElement;


if (window.innerWidth > 1023) {
    blocks.style.maxHeight = messageBlock.scrollHeight + "px";
}