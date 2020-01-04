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
        && utils.isTextBlock(node)) {
            let modsSize = utils.extractModsSize(node);
            const newError = errors.getError(errors.WARNING_EQUAL_TEXT_SIZE, parents['warning'].loc);
            if (!modsSize
                || modsSize 
                    && parents.warning['etalonTextSize'] 
                    && modsSize !== parents.warning['etalonTextSize']) {
                        /* Должно быть равно эталонному и быть задано */
                        errorsList.pushIfNotExist(newError, errorComparer);
            } 
                
    }
}

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
            if (etalonSize
                    && buttonSize
                    && buttonSize !== steps[etalonSize]) {
                        /* Пополняем errorsList */
                        errorsList.push(errors.getError(errors.INVALID_BUTTON_SIZE, node.loc));
            }    
    }
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