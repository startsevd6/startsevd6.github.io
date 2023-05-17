// сайт в альфа версии

let sectionsIsShifted = false;

// Расширяем сайдбар при нажатии на кнопку
$(document).on('click', '.button-menu', function () {
    // объявляем локальные переменные и функции, т.к. кнопка подружается асинхронно
    const aside = $('aside');
    const sections = $('.sections');

    const aLesson = $('.a-lesson');
    const aSettings = $('.a-settings');
    const buttonMenu = $('.button-menu');
    const nameLesson = $('.name-lesson');
    const nameMenu = $('.name-menu');
    const afterImg = $('#after-img');

    function addClasses() {
        aLesson.addClass('extension');
        aSettings.addClass('extension');
        buttonMenu.addClass('extension');
        nameLesson.addClass('visible');
        nameMenu.addClass('visible');
        afterImg.addClass('visible');
    }

    function removeClasses() {
        aLesson.removeClass('extension');
        aSettings.removeClass('extension');
        buttonMenu.removeClass('extension');
        nameLesson.removeClass('visible');
        nameMenu.removeClass('visible');
        afterImg.removeClass('visible');
    }

    // если сайдбар сжат, то расширяем, если нет, то сжимаем
    if (aside.width() === 70) {
        aside.addClass('animate');
        aside.toggleClass('open');
        sections.addClass('animate');
        sections.addClass('shifted');
        sectionsIsShifted = true;
        setTimeout(function () {
            addClasses();
        }, 500);
    } else {
        aside.removeClass('open');
        sections.removeClass('shifted');
        sectionsIsShifted = false;
        removeClasses();
    }
});

$(document).ready(function () { 
    const includeAside = $('#include-aside');
    const includeFooter = $('#include-footer');

    // Подгружаем aside из отдельного файла
    includeAside.load('/learn-python/aside.html', function (response, status, xhr) {
        if (status === "error") {
            alert("Загрузка боковой панели не удалась");
        }
    });

    // Подгружаем footer из отдельного файла
    includeFooter.load('/learn-python/footer.html', function (response, status, xhr) {
        if (status === "error") {
            alert("Загрузка нижнего блока сайта не удалась");
        }
    });

    const aside = $('aside');
    const sections = $('.sections');

    const aLesson = $('.a-lesson');
    const aSettings = $('.a-settings');
    const buttonMenu = $('.button-menu');
    const nameLesson = $('.name-lesson');
    const nameMenu = $('.name-menu');
    const afterImg = $('#after-img');
    // созда1м отдельные функции addClasses() и removeClasses() чтобы не дублировать код
    function addClasses() {
        aLesson.addClass('extension');
        aSettings.addClass('extension');
        buttonMenu.addClass('extension');
        nameLesson.addClass('visible');
        nameMenu.addClass('visible');
        afterImg.addClass('visible');
    }

    function removeClasses() {
        aLesson.removeClass('extension');
        aSettings.removeClass('extension');
        buttonMenu.removeClass('extension');
        nameLesson.removeClass('visible');
        nameMenu.removeClass('visible');
        afterImg.removeClass('visible');
    }

    // Возвращам ширину сайдбару, если ширина окна стала больше
    let debounceTimeout;
    $(window).resize(function () {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(function () {
            if ($(window).width() >= 1200 || $(window).width() <= 935) {
                aside.removeClass('open');
                aside.removeClass('animate');
                sections.removeClass('shifted');
                removeClasses();
            } else {
                if (sectionsIsShifted == true) {
                    sections.addClass('shifted');aside.addClass('open');
                }
                setTimeout(function () {
                    sections.addClass('animate');aside.addClass('animate');
                }, 500);
                addClasses();
            }
        }, 100);
    });

    // Функция для копирования кода
    const copyCodeButtons = document.querySelectorAll('.copy-code-lesson');
    copyCodeButtons.forEach(function (button) {
        new ClipboardJS(button, {
            text: function (trigger) {
                try {
                    const codeElement = trigger.getAttribute('data-clipboard-target');
                    return document.querySelector(codeElement).innerText;
                } catch {
                    alert('Ошибка: не удалось найти текст для копирования');
                }
            }
        });
    });

    // Плавный переход к блоку текста
    $('a[href^="#"]').on('click', function (event) {
        let target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });
});