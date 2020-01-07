'use strict'

/* Заголовок второго уровня (блок text с модификатором type h2) 
не может находиться перед заголовком первого уровня на том же 
или более глубоком уровне вложенности. */

const utils = require('./../utils.js');
const errors = require('./../errors.js');

function checkTextH2(node, parents, errorsList) {
}

module.exports = checkTextH2;