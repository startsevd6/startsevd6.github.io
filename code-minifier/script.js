'use strict';

document.addEventListener('DOMContentLoaded', () => {
    function removeCommentsAndWhitespace(css) {
        // Regular expressions to remove comments and extra spaces
        css = css.replace(/\/\*[\s\S]*?\*\//g, ''); // Deleting comments
        css = css.replace(/\s+/g, ' '); // Removing extra spaces
        css = css.replace(/;\s*}/g, '}'); // Removing spaces before '}' after ';'

        return css.trim();
    }

    function compressCSS(css) {
        return css.trim();
    }

    function compressAndDisplay() {
        const textareaOriginal = document.getElementById('original-code');
        const textareaCompressed = document.getElementById('minified-code');
        const labelMinified = document.querySelector('label.minified.code');

        if (!textareaOriginal || !textareaCompressed || !labelMinified) {
            console.error('One or more elements not found.');
            return;
        }

        const originalCSS = textareaOriginal.value;
        const compressedCSS = compressCSS(removeCommentsAndWhitespace(originalCSS));
        textareaCompressed.value = compressedCSS;

        labelMinified.innerHTML = `Сжатый код (Сжато на ${originalCSS.length - compressedCSS.length} байт(ов), это ${Math.trunc(100 - (compressedCSS.length / originalCSS.length * 100))}%)`;
    }

    const button = document.querySelector('button');

    if (button) {
        button.addEventListener('click', compressAndDisplay);
    }
});
