'use strict'

/* Блок button в блоке warning не может находиться перед блоком placeholder 
на том же или более глубоком уровне вложенности */

const utils = require('./../utils.js');
const errors = require('./../errors.js');
const blocks = require('./../blocks.js');

function checkButtonPosition(node, parents, errorsList) {
    if (parents['warning'] 
        && parents.warning['preceding'].length > 0
        && blocks.isPlaceholderBlock(node)) {
            parents.warning['preceding'].forEach((precedingNode) => {
                if (precedingNode.block === 'button') {
                    errorsList.pushIfNotExist(
                        errors.getError(errors.ER_WARN_BTN_POS, precedingNode.loc), 
                        utils.errorComparer);
                }
            });
    }
}

module.exports = checkButtonPosition;