(function () {
    let burger = document.querySelector('.burger-container');
    let header = document.querySelector('.header');
    let menu = document.querySelector('.menu')

    burger.onclick = function () {
        header.classList.toggle('menu-opened');
        menu.classList.toggle('hide');
    }
}());