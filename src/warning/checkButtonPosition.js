'use strict';

/* Блок button в блоке warning не может находиться перед блоком placeholder
на том же или более глубоком уровне вложенности */

const errors = require('./../errors.js');

function checkButtonPosition(warningPrecedings, errorsList) {
    warningPrecedings.forEach((precedingNode) => {
        if (precedingNode && precedingNode.block === 'button') {
            errorsList.pushIfNotExist(
                errors.getError(errors.ER_WARN_BTN_POS, precedingNode.loc));
        }
    });
}

module.exports = checkButtonPosition;
