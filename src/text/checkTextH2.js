'use strict'

/* Заголовок второго уровня (блок text с модификатором type h2) 
не может находиться перед заголовком первого уровня на том же 
или более глубоком уровне вложенности. */

const errors = require('./../errors.js');

function checkTextH2(textType, parents, headingSiblingsH2, errorsList) {
    if (textType === 'h1') {
        if (parents.hasH2Headings()) {
            parents.getH2Headings().forEach(headingH2 => {
                errorsList.pushIfNotExist(errors.getError(errors.ER_TXT_H2, headingH2.loc));
            });
        }
        if(headingSiblingsH2.length > 0) {
            headingSiblingsH2.forEach(headingH2 => {
                errorsList.pushIfNotExist(errors.getError(errors.ER_TXT_H2, headingH2.loc));
            });
        }
    }
}

module.exports = checkTextH2;