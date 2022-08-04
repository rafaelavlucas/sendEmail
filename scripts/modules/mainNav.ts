// Variables
const
    OPEN_SETTINGS = "open",
    STICKY_NAV = "sticky";


const openSettingsBtn = document.querySelector('.mainNav__settingsBtn') as HTMLElement;
const closeSettingsBtn = document.querySelector('.mainNav__settingsBtn--close') as HTMLElement;
const settingsMobile = document.querySelector('.mainNav__settings') as HTMLElement;
const mainNav = document.querySelector('.mainNav') as HTMLElement;
let mainNavTop = mainNav.offsetTop;


// Events
openSettingsBtn.addEventListener("click", openSettingsMobile)
closeSettingsBtn.addEventListener("click", closeSettingsMobile)

window.onscroll = () => { stickyNav() }


// Functions
function openSettingsMobile() {
    settingsMobile.classList.add(OPEN_SETTINGS)
}
function closeSettingsMobile() {
    settingsMobile.classList.remove(OPEN_SETTINGS)
}


function stickyNav() {
    if (window.pageYOffset >= mainNavTop + 2) {
        mainNav.classList.add(STICKY_NAV)
    } else {
        mainNav.classList.remove(STICKY_NAV);
    }
}