interface ContactsInterface {
    name: string;
    email: string;
}

const contacts: ContactsInterface[] = [
    {
        name: "Rafaela Lucas",
        email: "rafaela.lucas@globalservs.com"
    },
    {
        name: "João Bairrada",
        email: "bairrada@globalservs.com"
    },
    {
        name: "cenas",
        email: "cenas@globalservs.com"
    },

];

const
    SHOW_CONTACTS_BLOCK = "show",
    HIDE_CONTACT = "hide",
    SELECTED_CONTACT = "selected",
    SHOW_NO_RESULTS = "show";

const
    contactsBlock = document.querySelector(".contactsBlock") as HTMLElement,
    contactsList = document.querySelector(".contactsBlock__list") as HTMLElement,
    contactsBtn = document.querySelector(".contactsBtn") as HTMLElement,
    closeContactsBtn = document.querySelector(".contactsBlock__close") as HTMLElement,
    emailInput = document.querySelector(".forms__input--email input") as HTMLInputElement,
    searchInput = document.querySelector(".forms__input--search input") as HTMLInputElement,
    noResults = document.querySelector(".contactsBlock__noResults") as HTMLElement;

const selectedEmails = []


// Variable after Loading the Contacts Template
getContacts();
const contactItem = document.querySelectorAll(".contactsBlock__contact") as NodeListOf<HTMLElement>;


// Events
contactsBtn.addEventListener("click", showContactsBlock)
closeContactsBtn.addEventListener("click", hideContactsBlock)

contactItem.forEach((contact) => {
    contact.addEventListener("click", selectContact);
});
emailInput.addEventListener("blur", checkEmailInputValue)

searchInput.addEventListener("input", handleSearch)


// Functions

function showContactsBlock() {
    contactsBlock.classList.add(SHOW_CONTACTS_BLOCK)
}

function hideContactsBlock() {
    contactsBlock.classList.remove(SHOW_CONTACTS_BLOCK)
    searchInput.value = ""
    contactItem.forEach((contact) => {
        contact.classList.remove(HIDE_CONTACT)
    });
    noResults.classList.remove(SHOW_NO_RESULTS)
}

function getContacts() {
    contacts.forEach((item) => {
        let templateContacts = `
        <li class="contactsBlock__listItem">
            <button class="contactsBlock__contact" data-email="${item.email}">${item.name}</button>
        </li>`;

        contactsList.insertAdjacentHTML("beforeend", templateContacts);
    });
}

function selectContact(e) {
    const isSelected = e.currentTarget.classList.contains(SELECTED_CONTACT);
    contactItem.forEach((contact) => {
        contact.classList.remove(SELECTED_CONTACT)
    });

    if (isSelected) {
        e.currentTarget.classList.remove(SELECTED_CONTACT)
        emailInput.value = ""
    } else {
        e.currentTarget.classList.add(SELECTED_CONTACT)
        emailInput.value = e.currentTarget.dataset.email
    }
}

function checkEmailInputValue() {
    if (emailInput.value == "") {
        contactItem.forEach((contact) => {
            contact.classList.remove(SELECTED_CONTACT)
        });
    }
}

function handleSearch(e) {
    const value = e.currentTarget.value.toLowerCase();

    const filteredContacts = [...contactItem].filter((contact) =>
        contact.innerText.toLowerCase().includes(value)
    );

    contactItem.forEach((contact) => {
        contact.classList.add(HIDE_CONTACT)
        noResults.classList.add(SHOW_NO_RESULTS)
    });
    filteredContacts.forEach((contact) => {
        contact.classList.remove(HIDE_CONTACT)
        noResults.classList.remove(SHOW_NO_RESULTS)
    });

}

