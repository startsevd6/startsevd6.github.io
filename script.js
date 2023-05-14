<<<<<<< HEAD
//alert("Сайт в разработке");
$('document').ready(function() {
    const aside = $('aside');
    const sections = $('.sections');
    const nameLesson = $('.name-lesson');
    const nameMenu = $('.name-menu');
    const afterImg = $('#after-img');
    const aLesson = $('.a-lesson');
    const aSettings = $('.a-settings');
    const buttonMenu = $('.button-menu');
    
    // Расширяем сайдбар при нажатии на кнопку
    $(".button-menu").on("click", function() {
        // если сайдбар сжат, то расширяем, если нет, то сжимаем
        if (aside.width() === 70) {
            aside.toggleClass('animate');
            aside.toggleClass('open');
            sections.toggleClass('shifted');
            setTimeout(function() {
                aLesson.addClass('extension');
                aSettings.addClass('extension');
                buttonMenu.addClass('extension');
                nameLesson.addClass('visible');
                nameMenu.addClass('visible');
                afterImg.addClass('visible');
            }, 500);
        } else {
            aside.removeClass('open');
            sections.removeClass('shifted');
            aLesson.removeClass('extension');
            aSettings.removeClass('extension');
            buttonMenu.removeClass('extension');
            nameLesson.removeClass('visible');
            nameMenu.removeClass('visible');
            afterImg.removeClass('visible');    
        }

        // текст кнопок появляется после анимации
        /*nameLesson.one('transitionend', function() {
            nameLesson.toggleClass('visible');
        });
    
        afterImg.one('transitionend', function() {
            afterImg.toggleClass('visible');
        });*/
    });
    
    // Возвращам ширину сайдбару, если ширина окна стала больше
    $(window).resize(function() {
        if ($(window).width() >= 1200 || $(window).width() <= 950) {
            aside.removeAttr('style');
            aside.removeClass('open');
            aside.removeClass('animate');
            sections.removeClass('')
            aLesson.removeClass('extension');
            aSettings.removeClass('extension');
            buttonMenu.removeClass('extension');
            nameLesson.removeClass('visible');
            nameMenu.removeClass('visible');
            afterImg.removeClass('visible');
        }
    });

    // Функция для копирования кода
    new ClipboardJS('.copy-code-lesson-1', {
        text: function() {
            try {
                const codeElement = document.querySelector('#code-1');
                return codeElement.innerText;
            } catch {
                alert('Ошибка: не удалось найти текст для копирования');
            }
        }
    }).on('error', function(e) {
        alert('Ошибка: не удалось скопировать текст');
    })

    // Плавный переход к блоку текста
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });
=======
//alert("Сайт в разработке");
$('document').ready(function() {
    const aside = $('aside');
    const sections = $('.sections');
    const nameLesson = $('.name-lesson');
    const nameMenu = $('.name-menu');
    const afterImg = $('#after-img');
    const aLesson = $('.a-lesson');
    const aSettings = $('.a-settings');
    const buttonMenu = $('.button-menu');
    
    // Расширяем сайдбар при нажатии на кнопку
    $(".button-menu").on("click", function() {
        // если сайдбар сжат, то расширяем, если нет, то сжимаем
        if (aside.width() === 70) {
            aside.toggleClass('animate');
            aside.toggleClass('open');
            sections.toggleClass('shifted');
            setTimeout(function() {
                aLesson.addClass('extension');
                aSettings.addClass('extension');
                buttonMenu.addClass('extension');
                nameLesson.addClass('visible');
                nameMenu.addClass('visible');
                afterImg.addClass('visible');
            }, 500);
        } else {
            aside.removeClass('open');
            sections.removeClass('shifted');
            aLesson.removeClass('extension');
            aSettings.removeClass('extension');
            buttonMenu.removeClass('extension');
            nameLesson.removeClass('visible');
            nameMenu.removeClass('visible');
            afterImg.removeClass('visible');    
        }

        // текст кнопок появляется после анимации
        /*nameLesson.one('transitionend', function() {
            nameLesson.toggleClass('visible');
        });
    
        afterImg.one('transitionend', function() {
            afterImg.toggleClass('visible');
        });*/
    });
    
    // Возвращам ширину сайдбару, если ширина окна стала больше
    $(window).resize(function() {
        if ($(window).width() >= 1200 || $(window).width() <= 950) {
            aside.removeAttr('style');
            aside.removeClass('open');
            aside.removeClass('animate');
            sections.removeClass('')
            aLesson.removeClass('extension');
            aSettings.removeClass('extension');
            buttonMenu.removeClass('extension');
            nameLesson.removeClass('visible');
            nameMenu.removeClass('visible');
            afterImg.removeClass('visible');
        }
    });

    // Функция для копирования кода
    new ClipboardJS('.copy-code-lesson-1', {
        text: function() {
            try {
                const codeElement = document.querySelector('#code-1');
                return codeElement.innerText;
            } catch {
                alert('Ошибка: не удалось найти текст для копирования');
            }
        }
    }).on('error', function(e) {
        alert('Ошибка: не удалось скопировать текст');
    })

    // Плавный переход к блоку текста
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });
>>>>>>> 4cf779b4182d8a1ba9edec93a15f7eabd8810e32
})