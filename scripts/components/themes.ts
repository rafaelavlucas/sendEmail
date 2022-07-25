// Variables
const
    COLOR_THEME_OPTIONS = ["gra-01", "gra-02", "gra-03", "gra-04", "gra-05", "gra-06"],
    SELECTED_BUTTON = "selected",
    DARK_MODE = "dark",
    RANDOM_THEME = "random",
    TURN_ON_DARK_MODE = "on",
    STORAGE_DARK_MODE = "themeModeDark",
    STORAGE_COLOR_THEME = "themeModeDark";

const html = document.querySelector("html") as HTMLElement;
const body = document.querySelector("body") as HTMLElement;
const randomColor = COLOR_THEME_OPTIONS[Math.floor(Math.random() * COLOR_THEME_OPTIONS.length)];
const toggleButton = document.querySelector(".mainNav__toggle") as HTMLElement;
const randomButton = document.querySelector("button[data-theme-color='random']") as HTMLElement;
const colorButtons = document.querySelectorAll(".mainNav__color") as NodeListOf<HTMLElement>;
const fontButtons = document.querySelectorAll(".mainNav__font") as NodeListOf<HTMLElement>;

let getThemeColor = body.getAttribute('data-theme-color');
let getThemeRandom = body.getAttribute('data-theme-random');
let getFontSize = html.getAttribute('data-font-size');


let getStorageMode = localStorage.getItem(STORAGE_DARK_MODE)!;
let getStorageColor = localStorage.getItem(STORAGE_COLOR_THEME)!;






// Events
colorButtons.forEach((color) => {
    color.addEventListener("click", selectColorTheme);
});

fontButtons.forEach((font) => {
    font.addEventListener("click", selectFontSize);
});

toggleButton.addEventListener("click", setDarkMode);

// Functions
function selectColorTheme(e) {
    let selectedColor = e.currentTarget.dataset.themeColor;

    colorButtons.forEach((color) => {
        color.classList.remove(SELECTED_BUTTON)
    });

    e.currentTarget.classList.add(SELECTED_BUTTON)

    changeColorTheme(e, selectedColor)
}

function changeColorTheme(e, selectedColor) {
    if (e.currentTarget.dataset.themeColor !== RANDOM_THEME) {
        body.dataset.themeColor = selectedColor
        body.dataset.themeRandom = "false"
    }
    else {
        body.dataset.themeRandom = "true"
    }
}

function setRandomThemeOnLoad() {
    if (getThemeRandom === "true") {
        getThemeColor === randomColor
        body.dataset.themeColor = randomColor
        randomButton.classList.add(SELECTED_BUTTON)
    }
}

function darkModeStorage() {
    if (getStorageMode != "false") {
        body.dataset.themeMode = DARK_MODE;
        toggleButton.classList.add(TURN_ON_DARK_MODE);
        localStorage.setItem(STORAGE_DARK_MODE, "true");
    };
}


function setDarkMode() {
    getStorageMode = localStorage.getItem(STORAGE_DARK_MODE)!;

    if (getStorageMode == "false") {
        body.dataset.themeMode = DARK_MODE
        toggleButton.classList.add(TURN_ON_DARK_MODE);

        getStorageMode = localStorage.setItem(STORAGE_DARK_MODE, "true")!;
    } else {
        body.dataset.themeMode = ""
        toggleButton.classList.remove(TURN_ON_DARK_MODE);
        getStorageMode = localStorage.setItem(STORAGE_DARK_MODE, "false")!;
    }
}

function selectFontSize(e) {
    let selectedFont = e.currentTarget.dataset.fontSize;

    fontButtons.forEach((font) => {
        font.classList.remove(SELECTED_BUTTON)
    });
    e.currentTarget.classList.add(SELECTED_BUTTON)

    changeFontSize(e, selectedFont)

}

function changeFontSize(e, selectedFont) {
    if (e.currentTarget.dataset.fontSize !== "normal") {
        html.dataset.fontSize = selectedFont
    } else {
        html.dataset.fontSize = "normal"
    }
}



setRandomThemeOnLoad();
darkModeStorage();


