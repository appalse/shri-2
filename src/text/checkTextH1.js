'use strict';

/* Заголовок первого уровня (блок text с модификатором type h1)
на странице должен быть единственным. */

const errors = require('./../errors.js');

function checkTextH1(textType, parents, nodeLocation, errorsList) {
    if (textType === 'h1') {
        if (parents.hasH1Heading()) {
            errorsList.push(errors.getError(errors.ER_TXT_H1, nodeLocation));
        } else {
            parents.setH1Heading(textType);
        }
    }
}

module.exports = checkTextH1;
