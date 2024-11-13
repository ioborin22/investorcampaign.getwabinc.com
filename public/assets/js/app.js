document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.getElementById('burger-menu');
  const headerMobile = document.querySelector('.header_mobile');

  burgerMenu.addEventListener('click', function () {
    burgerMenu.classList.toggle('active');
    headerMobile.classList.toggle('active');

    // Добавляем или убираем класс body-without-scroll для блокировки прокрутки основного контента
    if (headerMobile.classList.contains('active')) {
      document.body.classList.add('body-without-scroll');
    } else {
      document.body.classList.remove('body-without-scroll');
    }
  });
});
