'use strict'

/* Заголовок первого уровня (блок text с модификатором type h1) 
на странице должен быть единственным. */

const errors = require('./../errors.js');

function checkTextH1(textNode, textType, parents, errorsList) {
    if (textType && textType === 'h1') {
        if (parents['headingH1']) {
            errorsList.push(errors.getError(errors.ER_TXT_H1, textNode.loc));
        } else {
            parents['headingH1'] = textType;
        }
    }
}

module.exports = checkTextH1;