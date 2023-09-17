'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const commentRegex = /\/\*[\s\S]*?\*\//g;
    const spaceRegex = /\s+/g;
    const closingBraceRegex = /;\s*}/g;

    function removeComments(css) {
        return css.replace(commentRegex, '');
    }

    function removeExtraSpaces(css) {
        return css.replace(spaceRegex, ' ');
    }

    function removeSpacesBeforeClosingBrace(css) {
        return css.replace(closingBraceRegex, '}');
    }

    function compressCSS(css) {
        return css.trim();
    }

    function getOriginalCSS() {
        const textareaOriginal = document.getElementById('original-code');
        if (!textareaOriginal) {
            throw new Error('Text area for uncompressed code not found');
        }
        return textareaOriginal.value;
    }

    function displayCompressedCSS() {
        const textareaCompressed = document.getElementById('minified-code');
        const labelMinified = document.querySelector('label.minified.code');
        
        if (!textareaCompressed) {
            throw new Error('Text area for compressed code not found');
        }

        if (!labelMinified) {
            throw new Error('The label above the text area for the compressed code was not found');
        }

        const originalCSS = getOriginalCSS();
        const compressedCSS = compressCSS(
            removeSpacesBeforeClosingBrace(
                removeExtraSpaces(
                    removeComments(originalCSS)
                )
            )
        );
        let compressionSize = originalCSS.length - compressedCSS.length;
        let compressionSizeInPercentage = Math.trunc(100 - (compressedCSS.length / originalCSS.length * 100));
        labelMinified.innerHTML = `Сжатый код (Сжато на ${compressionSize} байт(ов), это ${compressionSizeInPercentage}%)`;
    }

    const button = document.querySelector('button');

    if (button) {
        button.addEventListener('click', displayCompressedCSS);
    }
});
