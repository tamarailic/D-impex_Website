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

// FAQ

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
    const itemToggle = this.getAttribute('aria-expanded');

    for (i = 0; i < items.length; i++) {
        items[i].setAttribute('aria-expanded', 'false');
    }

    if (itemToggle == 'false') {
        this.setAttribute('aria-expanded', 'true');
    }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));