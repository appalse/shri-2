'use strict'

/* Размер кнопки блока warning должен быть на 1 шаг больше эталонного 
(например, для размера l таким значением будет xl) */

const errors = require('../errors.js');

const steps = {
    'xs': 's',
    's': 'm',
    'm': 'l',
    'l': 'xl',
    'xl': 'xxl'
};

function checkButtonSize(precedingNode, etalonSize, errorsList) {    
    const buttonSize = precedingNode.size;
    if (!buttonSize || !etalonSize
            || buttonSize !== steps[etalonSize]) {
                errorsList.push(errors.getError(errors.ER_WARN_BTN_SIZE, precedingNode.loc));
    }
}

function checkButtonsSizes(etalonSize, warningPrecedings, errorsList) {
    warningPrecedings.forEach(precedingNode => {
        if (precedingNode && precedingNode.block === 'button') {
            checkButtonSize(precedingNode, etalonSize, errorsList);
        }
    });
}

module.exports = checkButtonsSizes;