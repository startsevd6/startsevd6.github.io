document.addEventListener('DOMContentLoaded', function () {
    // Плавный переход к блоку текста
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            let target = document.querySelector(this.getAttribute('href'));
            let windowHeightTop = 100;
            if (window.innerWidth <= 950) {
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