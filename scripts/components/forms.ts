// Variables
const
    ERROR_INPUT = "error",
    FORMS_INPUT_SELECTOR = ".forms__input",
    FORMS_MESSAGE_SELECTOR = ".forms__message";

const inputs = document.querySelectorAll(FORMS_INPUT_SELECTOR) as NodeListOf<HTMLElement>;


// Events
inputs.forEach((input) => {
    input.querySelector('input')?.addEventListener("blur", checkFilledInput);
})

// Functions 
function checkFilledInput({ target, currentTarget }) {
    let inputValue = target.value;
    const
        inputParent = currentTarget.closest(FORMS_INPUT_SELECTOR),
        inputMessage = inputParent.querySelector(FORMS_MESSAGE_SELECTOR);

    if (inputValue) {
        validateInputText(inputValue, target);
    } else {
        inputParent.classList.remove(ERROR_INPUT);
        inputMessage.innerHTML = ""
    }
}

function validateInputText(inputValue, target) {
    const
        inputParent = target.closest(FORMS_INPUT_SELECTOR),
        validationRegex = new RegExp(inputParent.dataset.validate),
        inputMessage = inputParent.querySelector(FORMS_MESSAGE_SELECTOR),
        errorMessage = inputParent.dataset.error;

    if (inputParent.dataset.validate == "undefined") return;

    if (inputValue.match(validationRegex)) {
        inputParent.classList.remove(ERROR_INPUT);
        inputMessage.innerHTML = ""
    }
    else {
        inputParent.classList.add(ERROR_INPUT);
        inputMessage.innerHTML = errorMessage;
    }
}