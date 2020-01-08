'use strict'

/* Заголовок третьего уровня (блок text с модификатором type h3) 
не может находиться перед заголовком второго уровня 
на том же или более глубоком уровне вложенности. */

const utils = require('./../utils.js');
const errors = require('./../errors.js');

function checkTextH3(textNode, textType, parents, errorsList) {
    if (textType === 'h2' && parents.headingH3List && parents.headingH3List.length > 0) {
        parents.headingH3List.forEach(headingH3 => {
            errorsList.pushIfNotExist(errors.getError(errors.ER_TXT_H3, headingH3.loc), utils.errorComparer);
        });
    }
}

module.exports = checkTextH3;