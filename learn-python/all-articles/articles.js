'use strict';
document.addEventListener('DOMContentLoaded', function () {
    const articleThemes = [
        'Введение в Python',
        'Переменные',
        'Вывод и ввод текста',
        'Условный оператор',
        'Циклы',
        'Списки',
        'Кортежи',
        'Множества'
    ];
    const articleTags = [
        {theme: articleThemes[0], tag1: 'Установка Python', tag2: 'print()'},
        {theme: articleThemes[1], tag1: 'Типы переменных', tag2: 'Действия'},
        {theme: articleThemes[2], tag1: 'Вывод', tag2: 'Ввод'},
        {theme: articleThemes[3], tag1: 'Синтаксис', tag2: 'Операторы'},
        {theme: articleThemes[4], tag1: 'while', tag2: 'for'},
        {theme: articleThemes[5], tag1: 'Создание', tag2: 'Взаимодействия'},
        {theme: articleThemes[6], tag1: 'Создание', tag2: 'Взаимодействия'},
        {theme: articleThemes[7], tag1: 'Создание', tag2: 'Взаимодействия'},
    ];

    let articleBlockContent = '';
    const includeArticles = document.getElementById('include-articles');
    for (let i = 0; i < articleTags.length; i++) {
        const article = articleTags[i];
        articleBlockContent += `
            <a class="a-article" href="/learn-python/${i}/">
                <div class="div-title-article">
                    <span class="number-article">${i}</span>
                    <span class="title-article">${article.theme}</span>
                </div>
                <div class="div-tags-article">
                    <span class="tag-article">${article.tag1}</span>
                    <span class="tag-article">${article.tag2}</span>
                </div>
            </a>
        `;
    }
    includeArticles.innerHTML = articleBlockContent;
});