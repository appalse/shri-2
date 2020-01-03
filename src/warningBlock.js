'use strict'

const utils = require('./utils.js');
const errors = require('./errors.js');

// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(element, comparer) { 
    for (let i = 0; i < this.length; i++) { 
        if (comparer(element, this[i])) {
            return true; 
        }
    }
    return false; 
}; 

// adds an element to the array if it does not already exist using a comparer function
Array.prototype.pushIfNotExist = function(element, comparer) { 
    if (!this.inArray(element, comparer)) {
        this.push(element);
    }
};

function errorComparer(newError, error) {
    return error.code === newError.code 
            && error.error === newError.error
            && error.location.start.column === newError.location.start.column
            && error.location.start.line === newError.location.start.line
            && error.location.end.column === newError.location.end.column
            && error.location.end.line === newError.location.end.line;
}

function checkTextSize(node, parents, errorsList) {
    if (parents['warning'] 
        && parents.warning['etalonTextSize'] 
        && utils.isTextBlock(node)) {
            let modsSize = utils.extractModsSize(node);
            if (modsSize) {
                /* Должно быть равно эталонному */
                if (modsSize !== parents.warning['etalonTextSize']) {
                    const newError = errors.getError(errors.WARNING_EQUAL_TEXT_SIZE, parents['warning'].loc);
                    errorsList.pushIfNotExist(newError, errorComparer)
                }
            }
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
    checkTextSize,
    checkButtonSize,
    checkButtonPosition,
    checkPlaceholderSize
}