'use strict'

/* Размер кнопки блока warning должен быть на 1 шаг больше эталонного 
(например, для размера l таким значением будет xl) */

const utils = require('../utils.js');
const errors = require('../errors.js');

const steps = {
    'xs': 's',
    's': 'm',
    'm': 'l',
    'l': 'xl',
    'xl': 'xxl'
};

function checkButtonSize(precedingNode, parents, errorsList) {    
    const etalonSize = parents.warning['etalonTextSize'];
    const buttonSize = precedingNode.size;
    if (!buttonSize || !etalonSize
            || buttonSize !== steps[etalonSize]) {
                /* Пополняем errorsList */
                errorsList.push(errors.getError(errors.INVALID_BUTTON_SIZE, precedingNode.loc));
    }
}

function checkButtonsSizes(node, parents, errorsList) {
    if (utils.isWarningBlock(node) && parents.warning && parents.warning.preceding) {
		parents.warning['preceding'].forEach(precedingNode => {
			if (precedingNode.block === 'button') {
				checkButtonSize(precedingNode, parents, errorsList);
			}
		});
	}
}

module.exports = checkButtonsSizes;