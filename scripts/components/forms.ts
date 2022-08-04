

// Variables
const
    ERROR_INPUT = "error",
    FORMS_INPUT_SELECTOR = ".forms__input",
    FORMS_MESSAGE_SELECTOR = ".forms__message";

const btnSend = document.querySelector(".forms__buttonSend") as HTMLElement,
    inputs = document.querySelectorAll(FORMS_INPUT_SELECTOR) as NodeListOf<HTMLElement>,
    requiredInputs = document.querySelectorAll(".forms__input.required") as NodeListOf<HTMLElement>,
    inputName = document.querySelector(".forms__input--name input") as HTMLInputElement,
    inputEmail = document.querySelector(".forms__input--email input") as HTMLInputElement,
    inputTextArea = document.querySelector(".forms__input--textArea textarea") as HTMLTextAreaElement;


// Events
inputs.forEach((input) => {
    input.querySelector('input')?.addEventListener("blur", checkFilledInput);
})

requiredInputs.forEach((input) => {
    input.addEventListener("keyup", hideError);
    input.addEventListener("click", hideError);
})

btnSend.addEventListener("click", sendEmail)

// Functions 
function checkFilledInput({ target, currentTarget }) {
    let inputValue = target.value;
    const
        inputParent = currentTarget.closest(FORMS_INPUT_SELECTOR),
        inputMessage = inputParent.querySelector(FORMS_MESSAGE_SELECTOR);

    if (inputValue && inputMessage) {
        validateInputText(inputValue, target);
    } else if (inputMessage) {
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

    if (inputValue.match(validationRegex) && inputMessage) {
        inputParent.classList.remove(ERROR_INPUT);
        inputMessage.innerHTML = ""
    }
    else {
        inputParent.classList.add(ERROR_INPUT);
        inputMessage.innerHTML = errorMessage;
    }
}


// function checkInputValue(input) {
//     return !input;
// }


// function checkCheckbox(input) {
//     return !input.checked;
// }

function error(el) {
    const message = el.querySelector(FORMS_MESSAGE_SELECTOR);
    el.classList.add("error");
    if (message) message.innerText = el.dataset.required
}

function hideError(e) {
    // if (e.currentTarget.querySelector('input')?.value == "" || e.currentTarget.querySelector('textarea')?.value == "") return;
    e.currentTarget.classList.remove("error");

}

function validateForm() {
    let isValid = true;

    requiredInputs.forEach((input) => {
        const inputField = input.querySelector('input') as HTMLInputElement,
            textAreaField = input.querySelector('textarea') as HTMLTextAreaElement,
            checkboxField = input.querySelector('#checkbox') as HTMLInputElement;

        if (inputField?.value == "" || textAreaField?.value == "" || checkboxField?.checked == false) {
            isValid = false;
            error(input);
            console.log("cenas2")
            return isValid;
        }
    })
    return isValid;
}


function sendEmail() {

    if (!validateForm()) return;
    // Change all values to your own
    let params = {
        user_id: 'P1UL7nDGfY25g6qyU',
        service_id: 'service_8ee5gmd',
        template_id: 'template_ope8bod',
        template_params: {
            'from_name': inputName.value,
            'from_email': inputEmail.value,
            'message': inputTextArea.value
        }
    };

    let headers = {
        'Content-type': 'application/json'
    };

    let options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    };

    fetch('https://api.emailjs.com/api/v1.0/email/send', options)
        .then((httpResponse) => {
            if (httpResponse.ok) {

                console.log('Success');
            } else {
                return httpResponse.text()
                    .then(text => Promise.reject(text));
            }
        })
        .catch((error) => {
            console.log('Oops... ' + error);
        });

}




