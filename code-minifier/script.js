'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const commentRegex = /\/\*[\s\S]*?\*\//g;
    const spaceRegex = /\s+/g;
    const closingBraceRegex = /;\s*}/g;

    function removeCommentsAndWhitespace(css) {
        // Regular expressions to remove comments and extra spaces
        css = css.replace(commentRegex, ''); // Deleting comments
        css = css.replace(spaceRegex, ' '); // Removing extra spaces
        css = css.replace(closingBraceRegex, '}'); // Removing spaces before '}' after ';'

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
            throw new Error('Text area for uncompressed code not found');
        }

        if (!textareaCompressed) {
            throw new Error('Text area for compressed code not found');
        }

        if (!labelMinified) {
            throw new Error('The label above the text area for the compressed code was not found');
        }

        const originalCSS = textareaOriginal.value;
        const compressedCSS = compressCSS(removeCommentsAndWhitespace(originalCSS));
        let compressionSize = originalCSS.length - compressedCSS.length;
        let compressionSizeInPercentage = Math.trunc(100 - (compressedCSS.length / originalCSS.length * 100));
        labelMinified.innerHTML = `Сжатый код (Сжато на ${compressionSize} байт(ов), это ${compressionSizeInPercentage}%)`;
    }

    const button = document.querySelector('button');

    if (button) {
        button.addEventListener('click', compressAndDisplay);
    }
});
