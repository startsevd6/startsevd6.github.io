'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Плавный переход к блоку текста
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            let windowHeightTop = 100;

            if (window.innerWidth <= 950) {
                windowHeightTop = 50;
            }

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - windowHeightTop,
                    behavior: 'smooth',
                });
            }
        });
    });
});
