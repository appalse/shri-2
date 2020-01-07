'use strict'

/* Заголовок третьего уровня (блок text с модификатором type h3) 
не может находиться перед заголовком второго уровня 
на том же или более глубоком уровне вложенности. */

const utils = require('./../utils.js');
const errors = require('./../errors.js');

function checkTextH3(node, parents, errorsList) {
}

module.exports = checkTextH3;