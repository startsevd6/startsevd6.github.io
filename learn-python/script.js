document.addEventListener('DOMContentLoaded', function () {
    // Темы всех статей
    const articleThemes = [
        'Введение в Python',
        'Переменные',
        'Вывод и ввод текста',
        'Условный оператор'//,
        //'Циклы'
    ];
    // Переменная aside, которая будет заполняться
    let asideContent = `
    <aside class="sidebar">
        <div class="lessons">
    `;

    activeClass = '';
    for (let i = 0; i < articleThemes.length; i++) {
        if (i == currentArticleNumber) {
            activeClass = ' active-lesson';
        }
        asideContent += `
            <a href="/learn-python/${i}/" class="a-lesson${activeClass}">
                <div class="div-number-lesson">
                    <span class="number-lesson">${i}</span>
                </div>
                <span class="name-lesson">${articleThemes[i]}</span>
            </a>`;
        activeClass = '';
    }

    asideContent += `
        </div>
        <div class="buttons">
            <a href="/learn-python/python-compiler/" class="a-python">
                <div class="div-img-settings">
                    <img class="img-python" src="/learn-python/img/icon-python.svg" alt="python compiler button">
                    <img class="img-python dark" src="/learn-python/img/icon-python-dark.svg" alt="python compiler button">
                    <img class="img-python-hover" src="/learn-python/img/icon-python-hover.svg" alt="python compiler button">
                </div>
                <span class="name-settings after-img">Python компилятор</span>
            </a>
            <button class="button-settings">
                <div class="div-img-settings">
                    <img class="img-settings" src="/learn-python/img/icon-settings.svg" alt="settings button">
                    <img class="img-settings dark" src="/learn-python/img/icon-settings-dark.svg" alt="settings button">
                    <img class="img-settings-hover" src="/learn-python/img/icon-settings-hover.svg" alt="settings button">
                </div>
                <span class="name-settings after-img">Настройки</span>
            </button>
            <button class="button-menu">
                <div class="div-img-menu">
                    <img class="img-menu" src="/learn-python/img/icon-menu.svg" alt="menu button">
                    <img class="img-menu dark" src="/learn-python/img/icon-menu-dark.svg" alt="menu button">
                    <img class="img-menu-hover" src="/learn-python/img/icon-menu-hover.svg" alt="menu button">
                </div>
                <span class="name-menu after-img">Меню</span>
            </button>
        </div>
    </aside>`;
    // Объявляем переменные блоков, которые потом будем вставлять на страницу
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
            if (currentArticleNumber === -1) {
                return;
            }
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
    let messageSent = false;

    function loadNav() {
        try {
            let navBlock = `
            <div class="nav-footer">`;
            if (currentArticleNumber - 1 >= 0) {
                const previousArticleTitle = articleThemes[currentArticleNumber - 1];
                navBlock += `
                <a href="/learn-python/${currentArticleNumber - 1}/" class="nav-a-left">
                    <div class="nav-div-img-left">
                        <img class="nav-img-left" src="/learn-python/img/icon-arrow.svg" alt="arrow left">
                        <img class="nav-img-left dark" src="/learn-python/img/icon-arrow-dark.svg" alt="arrow left">
                    </div>
                    <span class="nav-theme-left">${currentArticleNumber - 1}: ${previousArticleTitle}</span>
                </a>
            `;
            }
            if (currentArticleNumber + 1 <= articleThemes.length && articleThemes[currentArticleNumber + 1] != undefined) {
                const nextArticleTitle = articleThemes[currentArticleNumber + 1];
                navBlock += `
                <a href="/learn-python/${currentArticleNumber + 1}/" class="nav-a-right">
                    <span class="nav-theme-right">${currentArticleNumber + 1}: ${nextArticleTitle}</span>
                    <div class="nav-div-img-right">
                        <img class="nav-img-right" src="/learn-python/img/icon-arrow.svg" alt="arrow right">
                        <img class="nav-img-right dark" src="/learn-python/img/icon-arrow-dark.svg" alt="arrow right">
                    </div>
                </a>
            </div>
            `;
            }
            try {
                if (!isNavLoaded) {
                    loadContent('nav', navBlock); // Загружаем nav
                    isNavLoaded = true;
                }
            } catch (error) {
                if (!messageSent) {
                    console.log('Ошибка: Подгрузить nav не удалось');
                    messageSent = true;
                }
            }
        } catch (error) {
            if (!messageSent) {
                console.log('Ошибка: Подгрузить nav не удалось');
                messageSent = true;
            }
        }
    };

    loadNav(); // Добавляем блок с навигацией в конце урока


    // если сайдбар сжат, то расширяем, если нет, то сжимаем
    const aside = document.querySelector('aside');
    const sections = document.querySelector('.sections');
    let asideIsOpen = false;

    document.addEventListener('click', function (event) {
        let target = event.target.closest('button.button-menu');

        if (target) {
            if (!asideIsOpen) {
                aside.classList.add('animate');
                aside.classList.add('open');
                sections.classList.add('animate');
                sections.classList.add('aside-open');
                asideIsOpen = true;
            } else {
                aside.classList.remove('open');
                sections.classList.remove('aside-open');
                asideIsOpen = false;
            }
        }
    });
    // Та же функция, но для мобильных устройств
    if (isOpenMenuLoaded && window.innerWidth <= 950) {
        const elementOpenMenu = document.querySelector('button.open-menu');
        if (elementOpenMenu != null) {
            // Функция открытия меню для мобильных устройств
            elementOpenMenu.addEventListener('click', function () {
                if (!asideIsOpen) {
                    aside.classList.add('animate');
                    aside.classList.add('open');
                    sections.classList.add('animate');
                    sections.classList.add('aside-open');
                    asideIsOpen = true;
                } else {
                    const elementOpenMenuInnerHTML = elementOpenMenu.innerHTML;
                    elementOpenMenu.innerHTML = '';
                    aside.classList.add('animate');
                    aside.classList.remove('open');
                    aside.classList.remove('visible');
                    sections.classList.add('animate');
                    sections.classList.remove('aside-open');
                    setTimeout(function () {
                        elementOpenMenu.innerHTML = elementOpenMenuInnerHTML;
                    }, 500);
                    asideIsOpen = false;
                }
            });
        }
    }


    // Расширяем aside обратно, если разрешение экрана подходит
    let debounceTimeout;

    function resizeHandler() {
        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(function () {
            // При ширине экрана более 1200px aside всегда развёрнут
            setFontSize(getFontSize());
            if (window.innerWidth >= 1200) {
                aside.classList.remove('animate');
                sections.classList.remove('animate');
            } else if (window.innerWidth >= 950 && window.innerWidth <= 1200) {
                if (asideIsOpen) {
                    aside.classList.remove('animate');
                    aside.classList.add('open');
                    setTimeout(function () {
                        aside.classList.add('animate');
                    }, 500);
                    asideIsOpen = false;
                } else {
                    aside.classList.remove('animate');
                    aside.classList.remove('open');
                    setTimeout(function () {
                        aside.classList.add('animate');
                    }, 500);
                    asideIsOpen = true;
                }
            } else if (window.innerWidth <= 950) {
                if (!isOpenMenuLoaded) {
                    loadContent('open-menu', openMenuContent); // Загружаем кнопку открытия меню, если ширина экрана изменилась
                    isOpenMenuLoaded = true;
                    if (isOpenMenuLoaded && window.innerWidth <= 950) {
                        const elementOpenMenu = document.querySelector('button.open-menu');
                        if (elementOpenMenu != null) {
                            // Функция открытия меню для мобильных устройств
                            elementOpenMenu.addEventListener('click', function () {
                                if (asideIsOpen) {
                                    aside.classList.add('animate');
                                    aside.classList.remove('visible');
                                    sections.classList.add('animate');
                                    sections.classList.remove('shifted');
                                    asideIsOpen = false;
                                } else {
                                    aside.classList.add('visible');
                                    aside.classList.add('animate');
                                    aside.classList.add('open');
                                    sections.classList.add('animate');
                                    sections.classList.add('shifted');
                                    asideIsOpen = true;
                                }
                            });
                        }
                    }
                }
                if (!asideIsOpen) {
                    aside.classList.remove('animate');
                    aside.classList.add('open');
                    sections.classList.remove('shifted');
                    setTimeout(function () {
                        aside.classList.add('animate');
                    }, 500);
                }
            }
        }, 100);
    }

    window.addEventListener('resize', resizeHandler); // Выполняем функцию resizeHandler при изменении размера экрана


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
            <img class="copy-code-img dark" id="code-${i}-img" src="/learn-python/img/icon-copy-dark.svg" alt="copy code">
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
    let lastCopyCodeImg;
    let lastCopyCodeImgSuccess;

    function showResultBlock(codeElement, copyCodeImg, message) {
        const copyCodeResultBlock = document.createElement('div');
        copyCodeResultBlock.className = 'popup-copy-code';
        copyCodeResultBlock.innerHTML = `<span class="p-lesson">${message}</span>`;

        let buttonRect = copyCodeImg.getBoundingClientRect();

        let offsetY = 52; // изменяем переменную offsetY в зависимости от ширины экрана и размера текста самого блока
        if (window.innerWidth <= 950) {
            offsetY -= 12;
        }
        // Если текст выйдет за пределы экрана, то увеличиваем переменную offsetY в зависимости от длины текста
        if (buttonRect.left + window.screenX - offsetY + 128 > window.innerWidth) {
            offsetY += 47;
        }
        // Если в блоке нет кода, то выравниваем переменную offsetY по левому краю кнопки
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
                if (!asideIsOpen) {
                    let selectedSiteTheme = getSiteTheme();
                    let copyCodeImg;
                    try {
                        const codeElement = trigger.getAttribute('data-clipboard-target');
                        if (selectedSiteTheme == 'light') {
                            copyCodeImg = document.querySelector(`${codeElement}-img`);
                        } else if (selectedSiteTheme === 'dark') {
                            copyCodeImg = document.querySelector(`${codeElement}-img.dark`);
                        }
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
                            console.log(getSiteTheme(), selectedSiteTheme)
                            if (getSiteTheme() === selectedSiteTheme) {
                                copyCodeImgSuccess.classList.remove('visible');
                                copyCodeImg.classList.add('visible');
                            }
                        }, 2750);
                        return document.querySelector(codeElement).innerText;
                    } catch {
                        const codeButton = '#' + button.getAttribute('id').substring(12);
                        if (selectedSiteTheme === 'light') {
                            copyCodeImg = document.querySelector(`${codeButton}-img`);
                        } else if (selectedSiteTheme === 'dark') {
                            copyCodeImg = document.querySelector(`${codeButton}-img.dark`);
                        }
                        const copyCodeImgSuccess = document.querySelector(`${codeButton}-success`);
                        const copyCodeImgUnsuccess = document.querySelector(`${codeButton}-unsuccess`);
                        showResultBlock(false, copyCodeImg, 'Не удалось найти текст для копирования');

                        copyCodeImg.classList.remove('visible');
                        copyCodeImgSuccess.classList.remove('visible');
                        copyCodeImgUnsuccess.classList.add('visible');
                        setTimeout(function () {
                            console.log(getSiteTheme(), selectedSiteTheme)
                            if (getSiteTheme() === selectedSiteTheme) {
                                copyCodeImgUnsuccess.classList.remove('visible');
                                copyCodeImg.classList.add('visible');
                            }
                        }, 2750);
                        setTimeout(function () {
                            console.log('Ошибка: не удалось найти текст для копирования');
                        }, 10);
                        return 'text copy error';
                    }
                }
            }
        });
    });


    // Настройки
    const settingsButton = document.querySelector('.button-settings');

    // Функция получения значения из cookie
    function getCookie(selectedSiteTheme) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + selectedSiteTheme + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : null;
    }

    // Функция установки темы на сайте
    function setSiteTheme(selectedSiteTheme) {
        const imgPython = document.querySelector('.img-python');
        const imgSettings = document.querySelector('.img-settings');
        const imgMenu = document.querySelector('.img-menu');
        if (selectedSiteTheme === 'light') {
            const lightThemeColors = [
                { key: '--body-color', value: '#edf0f1' },
                { key: '--block-color', value: '#ffffff' },
                { key: '--button-copy-color', value: '#f5f6f7' },
                { key: '--name-font-color', value: '#1a1a1a' },
                { key: '--header-font-color', value: '#ffffff' },
                { key: '--h1-font-color', value: '#000000' },
                { key: '--h2-font-color', value: '#0d0d0d' },
                { key: '--p-font-color', value: '#1a1a1a' },
                { key: '--code-block-color', value: '#ebecee' },
                { key: '--code-button-hover-color', value: '#eff1f3' },
                { key: '--shadow-block-color', value: 'linear-gradient(0deg, rgba(0, 0, 0, 0), #ecf0f1 50px)' },
            ];

            function toggleClasses(elements, className, add) {
                if (add) {
                    elements.forEach(element => {
                        element.classList.add(className);
                    });
                } else {
                    elements.forEach(element => {
                        element.classList.remove(className);
                    });
                }
            }

            for (let i = 0; i < lightThemeColors.length; i++) {
                const key = lightThemeColors[i].key;
                const value = lightThemeColors[i].value;
                document.documentElement.style.setProperty(key, value);
            }
            //начало-----------------------------------------------------------------
            imgPython.classList.remove('not-visible');
            imgSettings.classList.remove('not-visible');
            imgMenu.classList.remove('not-visible');
            arrows = [
                document.querySelector('.nav-img-left'),
                document.querySelector('.nav-img-right')
            ];
            arrows.forEach(element => {
                element.style.display = 'block';
            });
            iconCopyCode = document.querySelectorAll('.copy-code-img');
            iconCopyCodeSuccess = document.querySelectorAll('.copy-code-img-success');
            iconCopyCodeUnsuccess = document.querySelectorAll('.copy-code-img-unsuccess');
            darkElements = document.querySelectorAll('.dark');
            toggleClasses(iconCopyCode, 'visible', false);
            toggleClasses(iconCopyCodeSuccess, 'visible', false);
            toggleClasses(iconCopyCodeUnsuccess, 'visible', false);
            toggleClasses(darkElements, 'visible', false);
            //конец-----------------------------------------------------------------
        } else if (selectedSiteTheme === 'dark') {
            const darkThemeColors = [
                { key: '--body-color', value: '#000000' },
                { key: '--block-color', value: '#241e20' },
                { key: '--button-copy-color', value: '#0a0908' },
                { key: '--name-font-color', value: '#efefef' },
                { key: '--header-font-color', value: '#000000' },
                { key: '--h1-font-color', value: '#ffffff' },
                { key: '--h2-font-color', value: '#e5e5e5' },
                { key: '--p-font-color', value: '#f2f2f2' },
                { key: '--code-block-color', value: '#141311' },
                { key: '--code-button-hover-color', value: '#0f0d0b' },
                { key: '--shadow-block-color', value: 'linear-gradient(0deg, rgba(0, 0, 0, 0), #000000 50px)' },
            ];
            for (let i = 0; i < darkThemeColors.length; i++) {
                const key = darkThemeColors[i].key;
                const value = darkThemeColors[i].value;
                document.documentElement.style.setProperty(key, value);
            }
            //начало-----------------------------------------------------------------
            imgPython.classList.add('not-visible');
            imgSettings.classList.add('not-visible');
            imgMenu.classList.add('not-visible');
            arrows = [
                document.querySelector('.nav-img-left'),
                document.querySelector('.nav-img-right')
            ];
            arrows.forEach(element => {
                element.style.display = 'none';
            });
            iconCopyCode = document.querySelectorAll('.copy-code-img');
            iconCopyCode.forEach(element => {
                element.classList.remove('visible');
            });
            iconCopyCodeSuccess = document.querySelectorAll('.copy-code-img-success');
            iconCopyCodeSuccess.forEach(element => {
                element.classList.remove('visible');
            });
            iconCopyCodeUnsuccess = document.querySelectorAll('.copy-code-img-unsuccess');
            iconCopyCodeSuccess.forEach(element => {
                element.classList.remove('visible');
            });
            darkElements = document.querySelectorAll('.dark');
            darkElements.forEach(element => {
                element.classList.add('visible');
            });
            //конец-----------------------------------------------------------------
        }
    }

    // Функция получения темы сайта из cookie
    function getSiteTheme() {
        const themeCookie = getCookie('theme');
        if (themeCookie !== null) {
            setSiteTheme(themeCookie);
            return themeCookie;
        }
        setSiteTheme('light');
        return 'light';
    }
    getSiteTheme(); // Переопределяем значения темы сайта сразу после загрузки страницы

    // Функция установки размера текста на сайте
    function setFontSize(fontSize) {
        if (1200 < window.innerWidth && window.innerWidth <= 1700 && fontSize >= 60) {
            fontSize = 60;
        } else if (400 < window.innerWidth && window.innerWidth <= 1200 && fontSize >= 48) {
            fontSize = 48;
        } else if (320 < window.innerWidth && window.innerWidth <= 400 && fontSize >= 32) {
            fontSize = 32;
        } else if (window.innerWidth <= 320 && fontSize >= 24) {
            fontSize = 24;
        }
        if (fontSize < 8) {
            fontSize = 8;
        }
        fontSize = fontSize / 16;
        document.documentElement.style.setProperty('--h1-font-size', 1.875 * fontSize + 'rem');
        document.documentElement.style.setProperty('--h2-font-size', 1.625 * fontSize + 'rem');
        document.documentElement.style.setProperty('--nav-theme-font-size', 1.125 * fontSize + 'rem');
        document.documentElement.style.setProperty('--p-font-size', fontSize + 'rem');
        document.documentElement.style.setProperty('--figcaption-font-size', 0.875 * fontSize + 'rem');
        document.documentElement.style.setProperty('--code-font-size', 0.875 * fontSize + 'rem');
    }

    // Функция получения размера текста из cookie
    function getFontSize() {
        const fontSizeCookie = getCookie('font-size');
        if (fontSizeCookie !== null && fontSizeCookie !== undefined) {
            setFontSize(fontSizeCookie);
            return fontSizeCookie;
        }
        setFontSize(16);
        return 16;
    }
    getFontSize(); // Переопределяем значения размера текста сразу после загрузки страницы

    // Функция установки значения в cookie
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
    }

    const popupSettings = document.createElement('div');
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    let settingsLoaded = false;
    let settingsOpened = false;
    settingsButton.addEventListener('click', function () {
        if (!settingsLoaded) {
            selectedSiteTheme = getSiteTheme();
            let settingsContent = `
            <span class="settings-title">Настройки</span>
            <button class="close-settings">
                <img src="/learn-python/img/icon-unsuccess.svg" alt="close settings">
            </button>
            <div class="settings-content">
                <div class="settings-site-theme">
                    <fieldset>
                        <legend>Выберите тему:</legend>`;
            if (selectedSiteTheme === 'light') {
                settingsContent += `
                <input type="radio" name="theme" id="light-theme" checked>
                <label for="light-theme">Светлая тема</label>
                <input type="radio" name="theme" id="dark-theme">
                <label for="dark-theme">Тёмная тема</label>`;
            } else if (selectedSiteTheme === 'dark') {
                settingsContent += `
                <input type="radio" name="theme" id="light-theme">
                <label for="light-theme">Светлая тема</label>
                <input type="radio" name="theme" id="dark-theme" checked>
                <label for="dark-theme">Тёмная тема</label>`;
            }
            settingsContent += `
            </fieldset>
                </div>
                <div class="settings-font-size">
                    <span class="settings-text">Введите размер текста:</span>
                    <input type="text" id="font-size" minlength="1" maxlength="2" size="4" required>
                </div>
            </div>`;
            popupSettings.classList.add('popup-settings');
            html.appendChild(popupSettings);
            popupSettings.innerHTML = settingsContent;
            settingsLoaded = true;
        }
        if (!settingsOpened) {
            settingsButton.classList.add('active-lesson');
            body.classList.add('not-visible');
            popupSettings.classList.add('visible');
            const closeSettings = document.querySelector('.close-settings');
            closeSettings.addEventListener('click', function () {
                if (settingsLoaded && settingsOpened) {
                    settingsButton.classList.remove('active-lesson');
                    body.classList.remove('not-visible');
                    popupSettings.classList.remove('visible');
                    settingsOpened = false;
                }
            });
            const lightThemeButton = document.querySelector('#light-theme');
            const darkThemeButton = document.querySelector('#dark-theme');
            const fontSizeInput = document.querySelector('#font-size');
            fontSizeInput.value = getFontSize();
            lightThemeButton.addEventListener('click', function () {
                selectedSiteTheme = 'light';
                setSiteTheme(selectedSiteTheme);
                setCookie('theme', selectedSiteTheme, 365);
            });
            darkThemeButton.addEventListener('click', function () {
                selectedSiteTheme = 'dark';
                setSiteTheme(selectedSiteTheme);
                setCookie('theme', selectedSiteTheme, 365);
            });
            fontSizeInput.addEventListener('input', function () {
                let fontSize = fontSizeInput.value;
                if (fontSize !== '') {
                    setFontSize(fontSize);
                    setCookie('font-size', fontSize, 365);
                }
            });
            settingsOpened = true;
        } else {
            getFontSize();
            settingsButton.classList.remove('active-lesson');
            body.classList.remove('not-visible');
            popupSettings.classList.remove('visible');
            settingsOpened = false;
        }
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
