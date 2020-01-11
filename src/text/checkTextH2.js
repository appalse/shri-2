'use strict'

/* Заголовок второго уровня (блок text с модификатором type h2) 
не может находиться перед заголовком первого уровня на том же 
или более глубоком уровне вложенности. */

const errors = require('./../errors.js');

function checkTextH2(textNode, textType, parents, errorsList) {
    if (textType === 'h1' && parents.hasH2Headings()) {
        parents.getH2Headings().forEach(headingH2 => {
            errorsList.pushIfNotExist(errors.getError(errors.ER_TXT_H2, headingH2.loc));
        });
    }
}

module.exports = checkTextH2;