'use strict'

/* Заголовок второго уровня (блок text с модификатором type h2) 
не может находиться перед заголовком первого уровня на том же 
или более глубоком уровне вложенности. */

const utils = require('./../utils.js');
const errors = require('./../errors.js');

function checkTextH2(textNode, textType, parents, errorsList) {
    if (textType === 'h1' && parents.headingH2List && parents.headingH2List.length > 0) {
        parents.headingH2List.forEach(headingH2 => {
            errorsList.pushIfNotExist(errors.getError(errors.ER_TXT_H2, headingH2.loc), utils.errorComparer);
        });
    }
}

module.exports = checkTextH2;