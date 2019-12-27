'use strict'
const parse = require('json-to-ast');

function lint(jsonString) {
	console.log('LINTER');
	/* parse string into json object */

	/* check if input json is valid in terms of json syntax */
	/* if not valid - throw expection or return special result */

	/* start iterating through json items in deep, 
	   if block === warning => process the part of json in function */
	/* continue to iterate ... recursively */

	
	
	const settings = {
	loc: true,
	};
	
	const parsed = parse(jsonString, settings);
	console.log('PARSED', parsed);
	console.log('VALUE', parsed.children[0].value.value);

	let result = [];
	return result;
}

module.exports = lint;