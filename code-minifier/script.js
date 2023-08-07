'use strict';

document.addEventListener('DOMContentLoaded', () => {
    function compressCSS(css) {
        let compressedCSS = '';
        let inComment = false;
        let inWhitespace = false;

        for (let i = 0; i < css.length; i++) {
            const currentChar = css[i];
            const nextChar = css[i + 1];

            if (inComment) {
                if (currentChar === '*' && nextChar === '/') {
                    inComment = false;
                    i++; // Skip the '/' character
                }
                continue;
            }

            if (currentChar === '/' && nextChar === '*') {
                inComment = true;
                i++; // Skip the '*' character
                continue;
            }

            if (/\s/.test(currentChar)) {
                if (!inWhitespace) {
                    compressedCSS += ' ';
                    inWhitespace = true;
                }
                continue;
            }

            if (currentChar === '{') {
                compressedCSS = compressedCSS.replace(/\s+$/, ''); // Убираем пробелы перед '{'
                compressedCSS += '{';
                continue;
            }

            if (currentChar === '}') {
                compressedCSS = compressedCSS.replace(/\s+$/, ''); // Убираем пробелы перед '}'
                compressedCSS += '}';
                if (nextChar === ' ') {
                    i++;
                }
                inWhitespace = false;
                continue;
            }

            if (currentChar === ':' && nextChar === ' ') {
                compressedCSS += ':';
                i++;
                continue;
            }

            if (currentChar === ';' && nextChar === ' ') {
                compressedCSS += ';';
                i++;
                continue;
            }

            inWhitespace = false;
            compressedCSS += currentChar;
        }

        return compressedCSS.trim();
    }



    function compressAndDisplay() {
        const textareaOriginal = document.getElementById('original-code');
        if (!textareaOriginal) {
            console.error('Textarea for original code with id "code" not found.');
            return;
        }

        const textareaCompressed = document.getElementById('minified-code');
        if (!textareaCompressed) {
            console.error('Textarea for minified code with id "code" not found.');
            return;
        }

        const originalCSS = textareaOriginal.value;
        const compressedCSS = compressCSS(originalCSS);
        textareaCompressed.value = compressedCSS;

        const labelMinified = document.querySelector('label.minified.code');
        if (!textareaCompressed) {
            console.error('Label for minified code with class "minified code" not found.');
            return;
        }

        labelMinified.innerHTML = `Сжатый код (Сжато на ${originalCSS.length - compressedCSS.length} байт(ов), это ${Math.trunc(100 - (compressedCSS.length / originalCSS.length * 100))}%)`;
    }

    const button = document.querySelector('button');

    button.addEventListener('click', () => {
        compressAndDisplay();
    });
});