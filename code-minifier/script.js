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

        if (!textareaOriginal) {
            console.error('Text area for uncompressed code not found');
            return;
        }

        if (!textareaCompressed) {
            console.error('Text area for compressed code not found');
            return;
        }

        if (!labelMinified) {
            console.error('The label above the text area for the compressed code was not found')
            return;
        }

        const originalCSS = textareaOriginal.value;
        const compressedCSS = compressCSS(removeCommentsAndWhitespace(originalCSS));
        textareaCompressed.value = compressedCSS;
        
        compressionSize = originalCSS.length - compressedCSS.length;
        compressionSizeInPercentage = Math.trunc(100 - (compressedCSS.length / originalCSS.length * 100))
        labelMinified.innerHTML = `Сжатый код (Сжато на ${compressionSize} байт(ов), это ${compressionSizeInPercentage}%)`;
    }

    const button = document.querySelector('button');

    if (button) {
        button.addEventListener('click', compressAndDisplay);
    }
});
