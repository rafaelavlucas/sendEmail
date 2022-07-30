// Variables
const
    SELECTED_MESSAGE = "selected",
    SHOW_FORM_ERROR = "error";

const
    messageItem = document.querySelectorAll(".accordion__listItem") as NodeListOf<HTMLElement>,
    textArea = document.querySelector(".forms__input--textArea textarea") as HTMLInputElement;

// Events
messageItem.forEach(message => {
    message.addEventListener("click", selectMessage)
});

// Functions

function selectMessage(e) {
    const selectedMessage = e.currentTarget,
        isSelected = selectedMessage.classList.contains(SELECTED_MESSAGE),
        messageText = selectedMessage.innerText;

    messageItem.forEach((message) => {
        message.classList.remove(SELECTED_MESSAGE)
    });

    if (isSelected) {
        selectedMessage.classList.remove(SELECTED_MESSAGE)
        textArea.value = ""

    } else {
        e.currentTarget.classList.add(SELECTED_MESSAGE)
        textArea.value = messageText
        textArea.parentElement?.classList.remove(SHOW_FORM_ERROR)
    }
}


// function blabla() {
//     const request = new Request(`https://zenquotes.io/api/quotes`, {
//         method: 'GET',
//     });

//     fetch(request)

//         .then(function (response) {
//             return response.json();
//         })

//         .then(function (result) {

//             console.log(result)
//             // const item = result.Search;
//             // let movies = document.querySelector('.movies');

//             // if (item) {
//             //     item.forEach(el => {
//             //         let title = el.Title,
//             //             poster = el.Poster != "N/A" ? el.Poster : "assets/defaultimg.svg",
//             //             year = el.Year,
//             //             link = el.imdbID,
//             //             type = el.Type;

//             //         const template = `
//             //     <a class="item" data-type="${type}" href="https://imdb.com/title/${link}" target="_blank">

//             //     <article class="item__content">
//             //     <div class="item__text">
//             //     <small class="item__year">${year}</small>
//             //     <p  class="item__title">${title}</p>
//             //     </div>

//             //     <button class="item__view">view info</button>
//             //     </article>
//             //     <div class="item__image"><img src="${poster}"></div>
//             //     </a>`;

//         })
// }

// blabla()