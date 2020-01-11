'use strict'

/* Блок button в блоке warning не может находиться перед блоком placeholder 
на том же или более глубоком уровне вложенности */

const errors = require('./../errors.js');
const blocks = require('./../blocks.js');

function checkButtonPosition(node, parents, errorsList) {
    if (parents.hasWarningPreceding()
        && blocks.isPlaceholderBlock(node)) {
            parents.getWarningPreceding().forEach((precedingNode) => {
                if (precedingNode.block === 'button') {
                    errorsList.pushIfNotExist(
                        errors.getError(errors.ER_WARN_BTN_POS, precedingNode.loc));
                }
            });
    }
}

module.exports = checkButtonPosition;