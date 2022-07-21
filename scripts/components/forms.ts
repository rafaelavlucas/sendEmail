
const inputs = document.querySelectorAll('.forms__input') as NodeListOf<HTMLElement>;


inputs.forEach((input) => {
    input.querySelector('input')?.addEventListener("blur", checkFilled);
})



function checkFilled({ target, currentTarget }) {

    let textVal = target.value;

    const
        parent = currentTarget.closest(".forms__input"),
        parentError = parent.querySelector(".forms__message");

    if (textVal != "") {
        // parent.classList.add("filled");
        validateText(textVal, target);
    } else {
        parent.classList.remove("error");
        parentError.innerHTML = ""
    }
}

function validateText(text, target) {
    const
        parent = target.closest(".forms__input"),
        regex = new RegExp(parent.dataset.validate),
        parentError = parent.querySelector(".forms__message"),
        errorMessage = parent.dataset.error;

    if (parent.dataset.validate == "undefined") return;
    if (text.match(regex)) {
        //if ok
        parent.classList.remove("error");
        parentError.innerHTML = ""
    }
    //if error
    else {
        parent.classList.add("error");
        parentError.innerHTML = errorMessage;
    }
}