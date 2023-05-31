document.addEventListener('DOMContentLoaded', function () {
    // Объявляем переменные блоков, которые потом будем вставлять на страницу
    const asideContent = `
        <aside class="sidebar">
            <a href="/learn-python/0/" class="a-lesson">
                <div class="div-number-lesson">
                    <p class="number-lesson">0</p>
                </div>
                <span class="name-lesson">Введение в Python</span>
            </a>
            <a href="/learn-python/1/" class="a-lesson">
                <div class="div-number-lesson">
                    <p class="number-lesson">1</p>
                </div>
                <span class="name-lesson">Переменные</span>
            </a>
            <a href="/learn-python/2/" class="a-lesson">
                <div class="div-number-lesson">
                    <p class="number-lesson">2</p>
                </div>
                <span class="name-lesson">Вывод и ввод текста</span>
            </a>
            <a href="/learn-python/3/" class="a-lesson">
                <div class="div-number-lesson">
                    <p class="number-lesson">3</p>
                </div>
                <span class="name-lesson">Условный оператор</span>
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
            <button class="button-menu">
                <div class="div-img-menu">
                    <img src="/learn-python/img/icon-menu.svg" alt="menu button">
                </div>
                <span class="name-menu" id="after-img">Меню</span>
            </button>
        </aside>`;
    const footerContent = `
        <footer>
            <p class="email">e-mail: 
                <a href="mailto:startsevd6@gmail.com" class="email-a">
                    startsevd6@gmail.com
                </a>
            </p>
        </footer>`;
    const openMenuContent = `
        <button class="open-menu">
            <img class="open-menu-img" src="/learn-python/img/icon-menu.svg" alt="button open menu">
        </button>`;


    // Функция подгрузки блока после загрузки всей страницы
    function loadContent(includeBlock, content) {
        const includeContent = document.getElementById('include-' + includeBlock);
        try {
            includeContent.innerHTML = content;

            if (!includeContent.innerHTML.trim()) {
                throw new Error(`Ошибка: Загрузка ${includeBlock} не удалась`);
            }
        } catch (error) {
            alert('Ошибка: Загрузка блока', includeBlock, 'не удалась');
        }
    };

    loadContent('aside', asideContent); // Загружаем aside
    loadContent('footer', footerContent); // Загружаем footer
    let isOpenMenuLoaded = false;
    if (!isOpenMenuLoaded && window.innerWidth <= 950) {
        loadContent('open-menu', openMenuContent); // Загружаем кнопку открытия меню
        isOpenMenuLoaded = true;
    }


    // Функция подгрузки блока с навигацией в конце урока
    let isNavLoaded = false;

    function loadNav() {
        let navBlock = `
        <div class="nav-footer">`;
        if (currentArticleNumber - 1 >= 0) {
            const previousArticleTitle = document.getElementsByClassName('name-lesson')[currentArticleNumber - 1].outerText;
            navBlock += `
                <a href="/learn-python/${currentArticleNumber - 1}/" class="nav-a-left">
                    <div class="nav-div-img-left">
                        <img class="nav-img-left" src="/learn-python/img/icon-arrow.svg" alt="arrow left">
                    </div>
                    <span class="nav-theme-left">${currentArticleNumber - 1}: ${previousArticleTitle}</span>
                </a>
            `;
        }
        let xhr = new XMLHttpRequest();
        xhr.open('HEAD', `/learn-python/${currentArticleNumber + 1}/`, true);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200) {
                const nextArticleTitle = document.getElementsByClassName('name-lesson')[currentArticleNumber + 1].outerText;
                navBlock += `
                    <a href="/learn-python/${currentArticleNumber + 1}/" class="nav-a-right">
                        <span class="nav-theme-right">${currentArticleNumber + 1}: ${nextArticleTitle}</span>
                        <div class="nav-div-img-right">
                            <img class="nav-img-right" src="/learn-python/img/icon-arrow.svg" alt="arrow right">
                        </div>
                    </a>
                </div>
                `;
                try {
                    if (!isNavLoaded) {
                        loadContent('nav', navBlock); // Загружаем nav
                        isNavLoaded = true;
                        return;
                    }
                } catch (error) {
                    console.log('Ошибка: Подгрузить nav не удалось');
                }
            } else if (xhr.status === 404) {
                console.log('Следующей страницы (№' + (currentArticleNumber + 1) + ') нет');
            } else {
                console.log('Произошла ошибка при выполнении запроса на сервер, готовность:', xhr.readyState, 'статус:', xhr.status);
            }
        };
        xhr.send();
        loadContent('nav', navBlock); // Загружаем nav
    };

    loadNav(); // Добавляем блок с навигацией в конце урока


    // Функция изменения класса всем определённым блокам на странице
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


    // Функция массового изменения класса определённым блокам
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
        let target = event.target.closest('button.button-menu');

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
    if (isOpenMenuLoaded && window.innerWidth <= 950) {
        const elementOpenMenu = document.querySelector('button.open-menu');
        if (elementOpenMenu != null) {
            // Функция открытия меню для мобильных устройств
            elementOpenMenu.addEventListener('click', function () {
                if (!sectionsIsShifted) {
                    aside.classList.add('visible');
                    aside.classList.add('animate');
                    aside.classList.add('open');
                    toggleClasses(sections, 'animate', true);
                    toggleClasses(sections, 'shifted', true);
                    sectionsIsShifted = true;
                } else {
                    aside.classList.add('animate');
                    aside.classList.remove('visible');
                    toggleClasses(sections, 'animate', true);
                    toggleClasses(sections, 'shifted', false);
                    sectionsIsShifted = false;
                }
            });
        }
    }


    // Расширяем aside обратно, если разрешение экрана подходит
    let debounceTimeout;

    function resizeHandler() {
        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(function () {
            if (window.innerWidth >= 950 && window.innerWidth <= 1200) {
                if (sectionsIsShifted) {
                    sections.classList.remove('animate');
                    sections.classList.add('shifted');
                    aside.classList.remove('animate');
                    aside.classList.add('open');
                    setTimeout(function () {
                        sections.classList.add('animate');
                        aside.classList.add('animate');
                    }, 500);
                }
                removeClasses();
            } else if (window.innerWidth <= 950) {
                if (!isOpenMenuLoaded) {
                    loadContent('open-menu', openMenuContent); // Загружаем кнопку открытия меню, если ширина экрана изменилась
                    isOpenMenuLoaded = true;
                }
                addClasses();
                aside.classList.remove('animate');
                aside.classList.remove('open');
                sections.classList.remove('shifted');
                setTimeout(function () {
                    aside.classList.add('animate');
                }, 500);
            } else if (window.innerWidth >= 1200) {
                aside.classList.remove('animate');
                aside.classList.remove('open');
                sections.classList.remove('shifted');
                removeClasses();
            }
        }, 10);
    }

    window.addEventListener('resize', resizeHandler); // Выполняем функцию resizeHandler при изменении размера экрана
    resizeHandler(); // Возвращаем aside в исходное состояние сразу после загрузки страницы 


    // Вставка кнопок копирования кода на страницу
    const includeId = 'include-copy-code-button-';
    const numberOfBlocks = document.querySelectorAll(`[id^="${includeId}"]`).length;

    for (let i = 1; i <= numberOfBlocks; i++) {
        let buttonId = includeId + i;
        let includeButtonCopyCode = document.getElementById(buttonId);
        let codeBlock = `
        <button class="copy-code-lesson" id="button-copy-code-${i}" data-clipboard-target="#code-${i}">
            <img class="copy-code-img visible" id="code-${i}-img" src="/learn-python/img/icon-copy.svg" alt="copy code">
            <img class="copy-code-img-success" id="code-${i}-success" src="/learn-python/img/icon-success.svg" alt="successful copy code">
            <img class="copy-code-img-unsuccess" id="code-${i}-unsuccess" src="/learn-python/img/icon-unsuccess.svg" alt="unseccessful copy code">
        </button>
        `;

        if (includeButtonCopyCode) {
            includeButtonCopyCode.innerHTML = codeBlock;
        } else {
            alert(`Ошибка: Кнопка копирования кода с идентификатором #${buttonId} не найдена.`);
        }
    }


    // Копирование кода из блока
    const copyCodeButtons = document.querySelectorAll('.copy-code-lesson');
    let lastCopyTime = 0;
    let lastCopiedBlockNumber = 0;
    let lastCopyCodeImg = null;
    let lastCopyCodeImgSuccess = null;

    function showResultBlock(codeElement, copyCodeImg, message) {
        const copyCodeResultBlock = document.createElement('div');
        copyCodeResultBlock.className = 'popup-copy-code';
        copyCodeResultBlock.innerHTML = `<span class="p-lesson">${message}</span>`;

        let buttonRect = copyCodeImg.getBoundingClientRect();

        let offsetY = 52; // изменяем переменную offsetY в зависимости от ширины экрана и размера текста самого блока
        if (window.innerWidth > 950 && window.innerWidth <= 1200) {
            offsetY += 108;
        } else if (window.innerWidth <= 950) {
            offsetY -= 12;
        }

        if (buttonRect.left + window.screenX - offsetY + 128 > window.innerWidth) {
            offsetY += 47;
        }

        if (offsetY < 60 && !codeElement) {
            offsetY = 0;
        }

        let resultBlockTop = buttonRect.top + window.scrollY - 52;
        let resultBlockLeft = buttonRect.left + window.screenX - offsetY;
        copyCodeResultBlock.style.top = `${resultBlockTop}px`;
        copyCodeResultBlock.style.left = `${resultBlockLeft}px`;
        copyCodeResultBlock.classList.add('visible');
        if (codeElement) {
            const parentElement = document.querySelector(codeElement).parentNode;
            parentElement.insertAdjacentElement('beforebegin', copyCodeResultBlock);
        } else {
            document.body.insertAdjacentElement('beforebegin', copyCodeResultBlock);
        }
        setTimeout(function () {
            copyCodeResultBlock.classList.remove('visible');
        }, 2750);
        setTimeout(function () {
            copyCodeResultBlock.remove();
        }, 3050);
    };

    copyCodeButtons.forEach(function (button) {
        new ClipboardJS(button, {
            text: function (trigger) {
                try {
                    const codeElement = trigger.getAttribute('data-clipboard-target');
                    const copyCodeImg = document.querySelector(`${codeElement}-img`);
                    const copyCodeImgSuccess = document.querySelector(`${codeElement}-success`);
                    if (Date.now() - lastCopyTime < 2750 && lastCopiedBlockNumber === codeElement.substring(codeElement.length - 1)) {
                        const copyCodeResultBlock = document.querySelector('span.p-lesson');
                        copyCodeResultBlock.innerText = 'Уже скопировано!';
                        lastCopyTime = Date.now();
                        return;
                    } else if (Date.now() - lastCopyTime < 2750 && lastCopiedBlockNumber != codeElement.substring(codeElement.length - 1)) {
                        const copyCodeResultBlock = document.querySelector('.popup-copy-code');
                        copyCodeResultBlock.remove();
                        lastCopyCodeImgSuccess.classList.remove('visible');
                        lastCopyCodeImg.classList.add('visible');
                        lastCopyTime = Date.now();
                    }
                    lastCopyTime = Date.now();
                    lastCopiedBlockNumber = codeElement.substring(codeElement.length - 1);
                    lastCopyCodeImg = copyCodeImg;
                    lastCopyCodeImgSuccess = copyCodeImgSuccess;
                    showResultBlock(codeElement, copyCodeImg, 'Скопировано!');

                    copyCodeImg.classList.remove('visible');
                    copyCodeImgSuccess.classList.add('visible');
                    setTimeout(function () {
                        copyCodeImgSuccess.classList.remove('visible');
                        copyCodeImg.classList.add('visible');
                    }, 2750);
                    return document.querySelector(codeElement).innerText;
                } catch {
                    const codeButton = '#' + button.getAttribute('id').substring(12);
                    const copyCodeImg = document.querySelector(`${codeButton}-img`);
                    const copyCodeImgSuccess = document.querySelector(`${codeButton}-success`);
                    const copyCodeImgUnsuccess = document.querySelector(`${codeButton}-unsuccess`);
                    showResultBlock(false, copyCodeImg, 'Не удалось найти текст для копирования');

                    copyCodeImg.classList.remove('visible');
                    copyCodeImgSuccess.classList.remove('visible');
                    copyCodeImgUnsuccess.classList.add('visible');
                    setTimeout(function () {
                        copyCodeImgUnsuccess.classList.remove('visible');
                        copyCodeImg.classList.add('visible');
                    }, 2750);
                    setTimeout(function () {
                        console.log('Ошибка: не удалось найти текст для копирования');
                    }, 10);
                    return 'text copy error';
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
});
