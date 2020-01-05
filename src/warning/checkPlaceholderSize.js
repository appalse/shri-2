'use strict'

/* Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l */

const utils = require('./../utils.js');
const errors = require('./../errors.js');

function checkPlaceholderSize(node, parents, errorsList) {
    if (parents['warning'] && utils.isPlaceholderBlock(node)) {
        let modsSize = utils.extractModsSize(node);
        /* Должно быть равно s, m, l */
        if (modsSize !== 's' && modsSize !== 'm' && modsSize !== 'l') {
            errorsList.push(errors.getError(errors.INVALID_PLACEHOLDER_SIZE, parents['placeholder'].loc));
        }
    }
}

module.exports = checkPlaceholderSize;