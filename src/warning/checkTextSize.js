'use strict'

/* Все тексты (блоки text) в блоке warning должны быть одного размера, 
то есть c одинаковым значением модификатора size, 
и этот размер должен быть определен. 
Размер первого из таких элементов в форме будем считать эталонным */

const errors = require('./../errors.js');

function checkTextSize(modsSize, etalonSize, loc, errorsList) {
    if (!modsSize 
        || modsSize !== etalonSize) {
            const newError = errors.getError(errors.ER_WARN_TXT_NOT_EQ, loc);
            errorsList.pushIfNotExist(newError);
    }                 
}

module.exports = checkTextSize;