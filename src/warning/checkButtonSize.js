'use strict'

/* Размер кнопки блока warning должен быть на 1 шаг больше эталонного 
(например, для размера l таким значением будет xl) */

const utils = require('./../utils.js');
const errors = require('./../errors.js');

function checkButtonSize(node, parents, errorsList) {
    const steps = {
        'xxs': 'xs',
        'xs': 's',
        's': 'm',
        'm': 'l',
        'l': 'xl',
        'xl': 'xxl',
        'xxl': 'xxxl',
        'xxxl': 'xxxxl',
        'xxxxl': 'xxxxxl',
        'xxxxxl': 'xxxxxxl'
    };
    if (parents['warning']
        && utils.isButtonBlock(node)) {
            const etalonSize = parents.warning['etalonTextSize']
            const buttonSize = utils.getButtonSize(node);
            if (!buttonSize ||
                    etalonSize && buttonSize
                    && buttonSize !== steps[etalonSize]) {
                        /* Пополняем errorsList */
                        errorsList.push(errors.getError(errors.INVALID_BUTTON_SIZE, node.loc));
            }    
    }
}

module.exports = checkButtonSize;