(function () {
    let burger = document.querySelector('.burger-container');
    let header = document.querySelector('.header');
    let menu = document.querySelector('.menu')

    burger.onclick = function () {
        header.classList.toggle('menu-opened');
        menu.classList.toggle('hide');
    }
}());

function changeLanguage() {
    let currentUrl = window.location.href;
    let languageSelected = document.getElementById("language-select").value;
    let newUrl = '';
    if (languageSelected == 'RS') {
        newUrl = `https://d-impex${currentUrl.split('d-impex')[1]}`
    } else {
        newUrl = `https://${languageSelected.toLowerCase()}.d-impex${currentUrl.split('d-impex')[1]}`;
    }

    window.location.href = newUrl;
}

function changeLanguageMobile() {
    let currentUrl = window.location.href;
    let languageSelected = document.getElementById("language-select").value;
    let newUrl = '';
    if (languageSelected == 'RS') {
        newUrl = `https://d-impex${currentUrl.split('d-impex')[1]}`
    } else {
        newUrl = `https://${languageSelected.toLowerCase()}.d-impex${currentUrl.split('d-impex')[1]}`;
    }

    window.location.href = newUrl;
}