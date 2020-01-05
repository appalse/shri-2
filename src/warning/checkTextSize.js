'use strict'

/* Все тексты (блоки text) в блоке warning должны быть одного размера, 
то есть c одинаковым значением модификатора size, 
и этот размер должен быть определен. 
Размер первого из таких элементов в форме будем считать эталонным */

const utils = require('./../utils.js');
const errors = require('./../errors.js');

Array.prototype.inArray = function(element, comparer) { 
    for (let i = 0; i < this.length; i++) { 
        if (comparer(element, this[i])) {
            return true; 
        }
    }
    return false; 
}; 

Array.prototype.pushIfNotExist = function(element, comparer) { 
    if (!this.inArray(element, comparer)) {
        this.push(element);
    }
};

function errorComparer(newError, error) {
    return error.code === newError.code 
            && error.error === newError.error
            && error.location.start.column === newError.location.start.column
            && error.location.start.line === newError.location.start.line
            && error.location.end.column === newError.location.end.column
            && error.location.end.line === newError.location.end.line;
}

function checkTextSize(node, parents, errorsList) {
    if (parents['warning'] 
        && utils.isTextBlock(node)) {
            let modsSize = utils.extractModsSize(node);
            if (!modsSize
                || modsSize 
                    && parents.warning['etalonTextSize'] 
                    && modsSize !== parents.warning['etalonTextSize']) {
                        /* Должно быть равно эталонному и быть задано */
                        const newError = errors.getError(errors.WARNING_EQUAL_TEXT_SIZE, parents['warning'].loc);
                        errorsList.pushIfNotExist(newError, errorComparer);
            }                 
    }
}

module.exports = checkTextSize;