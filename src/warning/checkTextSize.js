'use strict'

/* Все тексты (блоки text) в блоке warning должны быть одного размера, 
то есть c одинаковым значением модификатора size, 
и этот размер должен быть определен. 
Размер первого из таких элементов в форме будем считать эталонным */

const utils = require('./../utils.js');
const errors = require('./../errors.js');
const blocks = require('./../blocks.js');

function checkTextSize(node, parents, errorsList) {
    if (blocks.isTextBlock(node)) {
            let modsSize = utils.extractModsSize(node);
            if (!modsSize 
                || modsSize !== parents.warning.etalonTextSize) {
                    /* Должно быть равно эталонному и быть задано */
                    const newError = errors.getError(errors.ER_WARN_TXT_NOT_EQ, parents.warning.loc);
                    errorsList.pushIfNotExist(newError, utils.errorComparer);
            }                 
    }
}

module.exports = checkTextSize;