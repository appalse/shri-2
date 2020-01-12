'use strict'

/* Заголовок третьего уровня (блок text с модификатором type h3) 
не может находиться перед заголовком второго уровня 
на том же или более глубоком уровне вложенности. */

const errors = require('./../errors.js');

function checkTextH3(textType, parents, headingSiblings, errorsList) {
    if (textType === 'h2' && parents.hasH3Headings()) {
        parents.getH3Headings().forEach(headingH3 => {
            errorsList.pushIfNotExist(errors.getError(errors.ER_TXT_H3, headingH3.loc));
        });
    }
    if (textType === 'h2' && headingSiblings['h3'] && headingSiblings['h3'].length > 0) {
        headingSiblings['h3'].forEach(headingH3 => {
            errorsList.pushIfNotExist(errors.getError(errors.ER_TXT_H3, headingH3.loc));
        });
    }
}

module.exports = checkTextH3;