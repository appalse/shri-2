'use strict'

/* Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l */

const utils = require('./../utils.js');
const errors = require('./../errors.js');
const blocks = require('./../blocks.js');

function checkPlaceholderSize(node, parents, errorsList) {
    if (blocks.isPlaceholderBlock(node)) {
        let modsSize = utils.extractModsSize(node);
        /* Должно быть равно s, m, l */
        if (modsSize !== 's' && modsSize !== 'm' && modsSize !== 'l') {
            errorsList.push(errors.getError(errors.ER_WARN_PLACEHOLDER_SIZE, node.loc));
        }
    }
}

module.exports = checkPlaceholderSize;