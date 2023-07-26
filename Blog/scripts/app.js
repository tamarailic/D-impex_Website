document.querySelector('.hamburger').addEventListener('click', function (e) {
    document.querySelector('.hamburger').classList.toggle('open');

    e.preventDefault();
});