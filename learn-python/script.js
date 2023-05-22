// сайт в альфа версии

document.addEventListener('DOMContentLoaded', function () {
    // Объявляем переменные блоков, которые потом будем вставлять на страницу
    const asideContent = `
        <aside class="sidebar">
            <a href="/learn-python/0/" class="a-lesson">
                <div class="div-number-lesson">
                    <p class="number-lesson">0</p>
                </div>
                <h2 class="name-lesson">Введение в Python</h2>
            </a>
            <a href="/learn-python/1/" class="a-lesson">
                <div class="div-number-lesson">
                    <p class="number-lesson">1</p>
                </div>
                <h2 class="name-lesson">Переменные</h2>
            </a>
            <a href="/learn-python/2/" class="a-lesson">
                <div class="div-number-lesson">
                    <p class="number-lesson">2</p>
                </div>
                <h2 class="name-lesson">Вывод и ввод текста</h2>
            </a>
            <a href="/learn-python/3/" class="a-lesson">
                <div class="div-number-lesson">
                    <p class="number-lesson">3</p>
                </div>
                <h2 class="name-lesson">Условный оператор</h2>
            </a>
            <a href="/learn-python/4/" class="a-lesson">
                <div class="div-number-lesson">
                    <span class="number-lesson">4</span>
                </div>
                <span class="name-lesson">Циклы</span>
            </a>
            <a href="/learn-python/python-compiler/" class="a-python">
                <div class="div-img-settings">
                    <img src="/learn-python/img/icon-python.svg" alt="python compiler button">
                </div>
                <span class="name-settings" id="after-img">Python компилятор</span>
            </a>
            <a href="/learn-python/settings/" class="a-settings">
                <div class="div-img-settings">
                    <img src="/learn-python/img/icon-settings.svg" alt="settings button">
                </div>
                <span class="name-settings" id="after-img">Настройки</span>
            </a>
            <a class="button-menu">
                <div class="div-img-menu">
                    <img src="/learn-python/img/icon-menu.svg" alt="menu button">
                </div>
                <span class="name-menu" id="after-img">Меню</span>
            </a>
        </aside>`;
    const footerContent = `
        <footer>
            <p class="email">e-mail: 
                <a href="mailto:startsevd6@gmail.com" class="email-a">
                    startsevd6@gmail.com
                </a>
            </p>
        </footer>`;


    // Подгружаем aside после загрузки всей страницы
    const includeAside = document.getElementById('include-aside');

    try {
        includeAside.innerHTML = asideContent;

        if (!includeAside.innerHTML.trim()) {
            throw new Error('Ошибка: Загрузка боковой панели не удалась');
        }
    } catch (error) {
        alert('Ошибка: Загрузка боковой панели не удалась');
    }


    // Подгружаем footer после загрузки всей страницы
    const includeFooter = document.getElementById('include-footer');

    try {
        includeFooter.innerHTML = footerContent;

        if (!includeFooter.innerHTML.trim()) {
            throw new Error('Ошибка: Загрузка нижнего блока не удалась');
        }
    } catch (error) {
        alert('Ошибка: Загрузка нижнего блока не удалась');
    }


    // Изменение класса всем определённым блокам на странице
    function toggleClasses(elements, className, add) {
        if (Array.isArray(elements) || elements instanceof NodeList || elements instanceof HTMLCollection) {
            elements.forEach(function (element) {
                if (add) {
                    element.classList.add(className);
                } else {
                    element.classList.remove(className);
                }
            });
        } else {
            if (add) {
                elements.classList.add(className);
            } else {
                elements.classList.remove(className);
            }
        }
    }


    // Массовое изменение класса определённым блокам
    const aLesson = document.querySelectorAll('.a-lesson');
    const aPython = document.querySelectorAll('.a-python');
    const aSettings = document.querySelectorAll('.a-settings');
    const buttonMenu = document.querySelectorAll('.button-menu');
    const nameLesson = document.querySelectorAll('.name-lesson');
    const nameSettings = document.querySelectorAll('.name-settings');
    const nameMenu = document.querySelectorAll('.name-menu');
    const afterImg = document.querySelectorAll('#after-img');

    let sectionsIsShifted = false;

    function addClasses() {
        toggleClasses(aLesson, 'extension', true);
        toggleClasses(aPython, 'extension', true);
        toggleClasses(aSettings, 'extension', true);
        toggleClasses(buttonMenu, 'extension', true);
        toggleClasses(nameLesson, 'visible', true);
        toggleClasses(nameSettings, 'visible', true);
        toggleClasses(nameMenu, 'visible', true);
        toggleClasses(afterImg, 'visible', true);
    }

    function removeClasses() {
        toggleClasses(aLesson, 'extension', false);
        toggleClasses(aPython, 'extension', false);
        toggleClasses(aSettings, 'extension', false);
        toggleClasses(buttonMenu, 'extension', false);
        toggleClasses(nameLesson, 'visible', false);
        toggleClasses(nameSettings, 'visible', false);
        toggleClasses(nameMenu, 'visible', false);
        toggleClasses(afterImg, 'visible', false);
    }


    // если сайдбар сжат, то расширяем, если нет, то сжимаем
    const aside = document.querySelector('aside');
    const sections = document.querySelector('.sections');

    document.addEventListener('click', function (event) {
        let target = event.target.closest('a.button-menu');

        if (target) {
            if (aside.offsetWidth === 80) {
                aside.classList.add('animate');
                aside.classList.add('open');
                toggleClasses(sections, 'animate', true);
                toggleClasses(sections, 'shifted', true);
                sectionsIsShifted = true;
                setTimeout(function () {
                    addClasses();
                }, 500);
            } else {
                aside.classList.remove('open');
                toggleClasses(sections, 'animate', true);
                toggleClasses(sections, 'shifted', false);
                sectionsIsShifted = false;
                removeClasses();
            }
        }
    });


    // Вставка блоков кода на страницу
    const includeId = 'include-copy-code-button-';
    const numberOfBlocks = document.querySelectorAll(`[id^="${includeId}"]`).length;

    for (let i = 1; i <= numberOfBlocks; i++) {
        let buttonId = includeId + i;
        let includeButtonCopyCode = document.getElementById(buttonId);
        let codeBlock = `
        <button class="copy-code-lesson" id="button-copy-code-${i}" data-clipboard-target="#code-${i}">
            <img class="copy-code-img visible" id="code-${i}-img" src="/learn-python/img/icon-copy.svg" alt="copy code">
            <img class="copy-code-img-success" id="code-${i}-success" src="/learn-python/img/icon-success.svg" alt="copy code">
        </button>
        `;

        if (includeButtonCopyCode) {
            includeButtonCopyCode.innerHTML = codeBlock;
        } else {
            alert(`Ошибка: Кнопка с идентификатором #${buttonId} не найдена.`);
        }
    }


    // Копирование кода из блока
    const copyCodeButtons = document.querySelectorAll('.copy-code-lesson');

    copyCodeButtons.forEach(function (button) {
        new ClipboardJS(button, {
            text: function (trigger) {
                try {
                    const codeElement = trigger.getAttribute('data-clipboard-target');
                    const copyCodeImg = document.querySelector(`${codeElement}-img`);
                    const copyCodeImgSuccess = document.querySelector(`${codeElement}-success`);

                    copyCodeImg.classList.remove('visible');
                    copyCodeImgSuccess.classList.add('visible');
                    setTimeout(function () {
                        copyCodeImgSuccess.classList.remove('visible');
                        copyCodeImg.classList.add('visible');
                    }, 2750);
                    return document.querySelector(codeElement).innerText;
                } catch {
                    alert('Ошибка: не удалось найти текст для копирования');
                }
            }
        });
    });


    // Плавный переход к блоку текста
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            let target = document.querySelector(this.getAttribute('href'));
            let windowHeightTop;

            if (window.innerWidth > 950) {
                windowHeightTop = 100;
            } else {
                windowHeightTop = 50;
            }

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - windowHeightTop,
                    behavior: 'smooth'
                });
            }
        });
    });


    // Расширяем aside обратно, если разрешение экрана подходит
    function resizeHandler() {
        if (window.innerWidth >= 935 || window.innerWidth <= 1200) {
            aside.classList.remove('open');
            aside.classList.remove('animate');
            toggleClasses(sections, 'shifted', false);
            removeClasses();
        } else {
            if (sectionsIsShifted) {
                toggleClasses(sections, 'shifted', true);
                aside.classList.add('open');
            }

            setTimeout(function () {
                sections.classList.add('animate');
                aside.classList.add('animate');
            }, 500);
            addClasses();
        }
    }

    let debounceTimeout;

    window.addEventListener('resize', function () {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(resizeHandler, 100);
    });

    resizeHandler();
});


// код с использованием jquery
/*let sectionsIsShifted = false;

// расширяем сайдбар при нажатии на кнопку
$(document).on('click', '.button-menu', function () {
    // объявляем локальные переменные и функции, т.к. кнопка подружается асинхронно
    const aside = $('aside');
    const sections = $('.sections');

    const aLesson = $('.a-lesson');
    const aPython = $('.a-python');
    const aSettings = $('.a-settings');
    const buttonMenu = $('.button-menu');
    const nameLesson = $('.name-lesson');
    const nameSettings = $('.name-settings');
    const nameMenu = $('.name-menu');
    const afterImg = $('#after-img');

    function addClasses() {
        aLesson.addClass('extension');
        aPython.addClass('extension');
        aSettings.addClass('extension');
        buttonMenu.addClass('extension');
        nameLesson.addClass('visible');
        nameSettings.addClass('visible');
        nameMenu.addClass('visible');
        afterImg.addClass('visible');
    }

    function removeClasses() {
        aLesson.removeClass('extension');
        aPython.addClass('extension');
        aSettings.removeClass('extension');
        buttonMenu.removeClass('extension');
        nameLesson.removeClass('visible');
        nameSettings.removeClass('visible');
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
    // подгружаем aside из отдельного файла
    const includeAside = $('#include-aside');
    includeAside.load('/learn-python/aside.html', function (response, status, xhr) {
        if (status === "error") {
            alert("Загрузка боковой панели не удалась");
        }
    });

    // подгружаем footer из отдельного файла
    const includeFooter = $('#include-footer');
    includeFooter.load('/learn-python/footer.html', function (response, status, xhr) {
        if (status === "error") {
            alert("Загрузка нижнего блока сайта не удалась");
        }
    });

    // вставка блоков кода на страницу
    let includeId = 'include-copy-code-button-';
    const numberOfBlocks = document.querySelectorAll(`[id^="${includeId}"]`).length;

    for (let i = 1; i <= numberOfBlocks; i++) {
        
        let buttonId = `${includeId}${i}`;
        let includeButtonCopyCode = document.getElementById(buttonId);
        let codeBlock = `
        <button class="copy-code-lesson" id="button-copy-code-${i}" data-clipboard-target="#code-${i}">
            <img class="copy-code-img visible" id="code-${i}-img" src="/learn-python/img/icon-copy.svg" alt="copy code">
            <img class="copy-code-img-success" id="code-${i}-success" src="/learn-python/img/icon-success.svg" alt="copy code">
        </button>
        `;

        if (includeButtonCopyCode) {
            includeButtonCopyCode.innerHTML = codeBlock;
        } else {
            console.error(`Элемент с идентификатором ${buttonId} не найден.`);
        }
    }

    const aside = $('aside');
    const sections = $('.sections');

    const aLesson = $('.a-lesson');
    const aPython = $('.a-python');
    const aSettings = $('.a-settings');
    const buttonMenu = $('.button-menu');
    const nameLesson = $('.name-lesson');
    const nameSettings = $('.name-settings');
    const nameMenu = $('.name-menu');
    const afterImg = $('#after-img');

    function addClasses() {
        aLesson.addClass('extension');
        aPython.addClass('extension');
        aSettings.addClass('extension');
        buttonMenu.addClass('extension');
        nameLesson.addClass('visible');
        nameSettings.addClass('visible');
        nameMenu.addClass('visible');
        afterImg.addClass('visible');
    }

    function removeClasses() {
        aLesson.removeClass('extension');
        aPython.addClass('extension');
        aSettings.removeClass('extension');
        buttonMenu.removeClass('extension');
        nameLesson.removeClass('visible');
        nameSettings.removeClass('visible');
        nameMenu.removeClass('visible');
        afterImg.removeClass('visible');
    }


    // возвращам ширину сайдбару, если ширина окна стала больше
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
                    sections.addClass('shifted');
                    aside.addClass('open');
                }

                setTimeout(function () {
                    sections.addClass('animate');
                    aside.addClass('animate');
                }, 500);
                addClasses();
            }
        }, 100);
    });


    // функция для копирования кода
    const copyCodeButtons = document.querySelectorAll('.copy-code-lesson');

    copyCodeButtons.forEach(function (button) {
        new ClipboardJS(button, {
            text: function (trigger) {
                try {
                    const codeElement = trigger.getAttribute('data-clipboard-target');
                    const copyCodeImg = $(`${codeElement}-img`);
                    const copyCodeImgSuccess = $(`${codeElement}-success`);

                    copyCodeImg.removeClass('visible');
                    copyCodeImgSuccess.addClass('visible');
                    setTimeout(function () {
                        copyCodeImgSuccess.removeClass('visible');
                        copyCodeImg.addClass('visible');
                    }, 2750);
                    return document.querySelector(codeElement).innerText;
                } catch {
                    alert('Ошибка: не удалось найти текст для копирования');
                }
            }
        });
    });


    // плавный переход к блоку текста
    $('a[href^="#"]').on('click', function (event) {
        let target = $(this.getAttribute('href'));
        let windowHeightTop;

        if ($(window).width() > 950) {
            windowHeightTop = 1500;
        } else {
            windowHeightTop = 50;
        }

        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - windowHeightTop
            }, 1000);
        }
    });
});*/