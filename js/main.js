const awsUrl = 'https://6qfzo165ib.execute-api.eu-central-1.amazonaws.com/Prod';

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

// Enterprise

// Carousel Case
document.addEventListener("DOMContentLoaded", function () {
    const logos = document.querySelectorAll('.logo');
    const cases = document.querySelectorAll('.case');
    let currentIndex = 0;
    let interval;
    const maxIndex = cases.length - 1;

    function showInfo(index) {
        cases.forEach((c, i) => {
            if (i === index) {
                c.classList.add('active');
            } else {
                c.classList.remove('active');
            }
        });

        logos.forEach((logo, i) => {
            logo.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    function nextInfo() {
        const nextIndex = (currentIndex + 1) % (maxIndex + 1);
        showInfo(nextIndex);
    }

    logos.forEach((logo, index) => {
        logo.addEventListener('click', () => {
            clearInterval(interval);
            showInfo(index);
            startAutoChange();
        });
    });

    function startAutoChange() {
        interval = setInterval(nextInfo, 8000);
    }

    showInfo(currentIndex);
    startAutoChange();
});

// Carousel Steps
// Carousel
document.addEventListener("DOMContentLoaded", function () {
    const texts = document.querySelectorAll('.step_text');
    const steps = document.querySelectorAll('.step');
    let currentIndex = 0;
    let interval;
    const maxIndex = steps.length - 1;

    function showInfo(index) {
        steps.forEach((s, i) => {
            if (i === index) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });

        texts.forEach((text, i) => {
            text.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    function nextInfo() {
        const nextIndex = (currentIndex + 1) % (maxIndex + 1);
        showInfo(nextIndex);
    }

    texts.forEach((text, index) => {
        text.addEventListener('click', () => {
            clearInterval(interval);
            showInfo(index);
            startAutoChange();
        });
    });

    function startAutoChange() {
        interval = setInterval(nextInfo, 8000);
    }

    showInfo(currentIndex);
    startAutoChange();
});

document.getElementById("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = document.getElementById("form");
    const formSubmitted = document.querySelector('.form_thank_you');
    const nameField = document.querySelector('.form_name');
    const companyField = document.querySelector('.form_company');
    const emailField = document.querySelector('.form_email');
    const messageField = document.querySelector('.form_message');

    const nameError = document.querySelector('.name_error');
    if (nameField.value.trim().length == 0) {
        nameError.classList.toggle('form_active', true);
        nameField.classList.toggle('form_field_error', true);
    } else {
        nameError.classList.toggle('form_active', false);
        nameField.classList.toggle('form_field_error', false);
    }

    const emailError = document.querySelector('.email_error');
    if (emailField.value.trim().length == 0 || !emailField.value.includes('@')) {
        emailError.classList.toggle('form_active', true);
        emailField.classList.toggle('form_field_error', true);
    } else {
        emailError.classList.toggle('form_active', false);
        emailField.classList.toggle('form_field_error', false);
    }

    const messageError = document.querySelector('.message_error');
    if (messageField.value.trim().length == 0) {
        messageError.classList.toggle('form_active', true);
        messageField.classList.toggle('form_field_error', true);
    } else {
        messageError.classList.toggle('form_active', false);
        messageField.classList.toggle('form_field_error', false);
    }

    if (nameField.value.trim().length == 0 || emailField.value.trim().length == 0 || messageField.value.trim().length == 0) {
        return;
    }

    try {
        await sendEmail(nameField.value, emailField.value, companyField.value, messageField.value);
        form.classList.toggle('form_submitted', true);
        formSubmitted.classList.toggle('form_active', true);
    } catch (error) {
        // Empty
    }
});

async function sendEmail(user_name, user_email, user_company, user_message) {
    try {
        const response = await fetch(`${awsUrl}/api/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': user_email,
                'name': user_name,
                'company': user_company,
                'message': user_message
            })
        });

        if (response.ok) {
            console.log('Response:', 'OK');
        } else {
            console.error('Error:', response.status, response.statusText);
            throw new Error(`Server error: ${response.status}`);
        }
    } catch (error) {
        console.error('Network error:', error);
        throw error;
    }
}
