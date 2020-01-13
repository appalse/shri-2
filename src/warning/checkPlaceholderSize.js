'use strict'

/* Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l */

const errors = require('./../errors.js');

function checkPlaceholderSize(modsSize, nodeLocation, errorsList) {
    if (modsSize !== 's' && modsSize !== 'm' && modsSize !== 'l') {
        errorsList.push(errors.getError(errors.ER_WARN_PLACEHOLDER_SIZE, nodeLocation));
    }
}

module.exports = checkPlaceholderSize;