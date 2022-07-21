const colors = ["gra-01", "gra-02", "gra-03", "gra-04", "gra-05", "gra-06"];
const color = colors[Math.floor(Math.random() * colors.length)]
const body = document.querySelector("body") as HTMLElement;
const colorButtons = document.querySelectorAll(".mainNav__color") as NodeListOf<HTMLElement>;
const randomButton = document.querySelector("[data-color='random']") as HTMLElement;
let dataColor = body.getAttribute('data-color');
let dataRandomAttr = body.getAttribute('data-random');
let dataRandomBoolean = Boolean(dataRandomAttr);



// Events
colorButtons.forEach((color) => {
    color.addEventListener("click", changeTheme);
});


function changeTheme(e) {
    let selectedColor = e.currentTarget.dataset.color;

    colorButtons.forEach((color) => {
        color.classList.remove("selected")
    });

    e.currentTarget.classList.add("selected")

    if (e.currentTarget.dataset.color !== "random") {
        body.dataset.color = selectedColor
        body.dataset.random = "false"
    }
    else {
        body.dataset.random = "true"
    }


}

function setRandomTheme() {
    if (dataRandomAttr === "true") {
        dataColor === color
        body.dataset.color = color
        randomButton.classList.add("selected")
    }
}

setRandomTheme();


