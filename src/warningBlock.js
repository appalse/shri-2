'use strict'

const utils = require('./utils.js');
const errors = require('./errors.js');

function checkEqualTextSizes(contentArray, parents, errorsList) {
    /* Заполняем структуры */
	let textBlocks = {
		count: 0,
		sizes: new Set(),
	};
	contentArray.forEach((node, index) => {
        const textBlockSize = utils.getTextBlockSize(node);
        if (textBlockSize) {
            textBlocks.count += 1;
            textBlocks.sizes.add(textBlockSize);
        }
	});

	/* Проверяем структуры и дополняем errorsList */
	/* set.size должен быть = 1 или 0 */
	if (parents['warning'] && textBlocks.count > 1 && textBlocks.sizes.size > 1) {
		errorsList.push(errors.getError(errors.WARNING_EQUAL_TEXT_SIZE, parents['warning'].loc));
	}
}

function checkButtonSize(contentArray, parents, errorsList) {
    let invalidButtonSizes = {
		etalonSize: undefined,
		ids: [],
    };
    const steps = {
        'xs': 's',
        's': 'm',
        'm': 'l',
        'l': 'xl',
        'xl': 'xxl',
        'xxl': 'xxxl',
        'xxxl': 'xxxxl',
        'xxxxl': 'xxxxxl'
    };
    contentArray.forEach((node, index) => {
        /* Эталонный размер кнопки может измениться внутри массива */
        /* если встретится очередной text-блок с другим size, поэтому проверяем */
        /* на каждой итерации, надо ли обновить значение */
        const etalonSize = utils.getTextBlockSize(node);
        if (etalonSize) {
            invalidButtonSizes.etalonSize = etalonSize;
        }
        const buttonSize = utils.getButtonSize(node);
        if (parents['warning'] && buttonSize 
            && invalidButtonSizes.etalonSize 
            && buttonSize !== steps[invalidButtonSizes.etalonSize] ) {
                invalidButtonSizes.ids.push(index);
        }
    });
	
    /* Пополняем errorsList */
    invalidButtonSizes.ids.forEach(id => {
        errorsList.push(errors.getError(errors.INVALID_BUTTON_SIZE, contentArray[id].loc));
    });
}

function checkButtonPosition(node, parents, errorsList) {
    if (parents['warning'] 
        && parents.warning['preceding'].length > 0
        && utils.isPlaceholderBlock(node)) {
            parents.warning['preceding'].forEach((precedingNode) => {
                if (precedingNode.block === 'button') {
                    errorsList.push(errors.getError(errors.INVALID_BUTTON_POSITION, precedingNode.loc));
                }
            });
    }
}

function checkPlaceholderSize(node, parents, errorsList) {
    if (parents['warning'] && utils.isPlaceholderBlock(node)) {
        let modsSize = utils.extractModsSize(node);
        if (modsSize) {
            /* Должно быть равно s, m, l */
            if (modsSize !== 's' && modsSize !== 'm' && modsSize !== 'l') {
                errorsList.push(errors.getError(errors.INVALID_PLACEHOLDER_SIZE, parents['placeholder'].loc));
            }
        }
    }
}


module.exports = {
    checkEqualTextSizes,
    checkButtonSize,
    checkButtonPosition,
    checkPlaceholderSize
}