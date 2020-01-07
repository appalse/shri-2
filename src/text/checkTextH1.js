'use strict'

const utils = require('./../utils.js');
const errors = require('./../errors.js');

function checkTextH1(textNode, textType, parents, errorsList) {
    if (textType && textType === 'h1') {
        if (parents['headingH1']) {
            errorsList.push(errors.getError(errors.SEVERAL_H1, textNode.loc));
        } else {
            parents['headingH1'] = textType;
        }
    }
}

module.exports = checkTextH1;